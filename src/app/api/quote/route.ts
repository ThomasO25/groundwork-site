import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validation";

// This route must run per-request (no static caching of a POST handler).
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Very small in-memory rate limiter: N requests per IP per window.
 * NOTE: state is per serverless instance and resets on cold start. For strong
 * production limits use a durable store (e.g. Upstash Redis / Vercel KV).
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Authoritative server-side validation (also enforces the empty honeypot).
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation failed." }, { status: 400 });
  }
  const data = parsed.data;

  // Silently accept honeypot hits so bots don't learn they were caught.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;

  // No email provider configured → "log mode" so local dev works without keys.
  // NOTE: configure Formspree (NEXT_PUBLIC_FORMSPREE_ENDPOINT) or Resend
  // (RESEND_API_KEY + QUOTE_TO_EMAIL + QUOTE_FROM_EMAIL) before launch, or
  // real leads will only be logged here and never delivered. See .env.example.
  if (!apiKey || !to || !from) {
    console.warn("[quote] Email delivery NOT configured — logging lead only, not sending:", {
      name: data.name,
      business: data.business,
      email: data.email || "—",
      phone: data.phone || "—",
      website: data.website || "—",
      interest: data.interest || "—",
      help: data.help,
      industry: data.industry || "—",
      budget: data.budget || "—",
      timeline: data.timeline || "—",
      source: data.source || "—",
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  // Deliver via Resend's REST API (no SDK dependency needed).
  const row = (k: string, v?: string) =>
    `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v || "—")}</td></tr>`;

  const html = `
    <h2>New website-plan request</h2>
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
      ${row("Name", data.name)}
      ${row("Business", data.business)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Current website", data.website)}
      ${row("What brings them here", data.interest)}
      ${row("Needs help with", data.help)}
      ${row("Industry", data.industry)}
      ${row("Budget", data.budget)}
      ${row("Timeline", data.timeline)}
      ${row("Source", data.source)}
    </table>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        // Only set reply-to when they left an email; phone-only leads are valid.
        ...(data.email ? { reply_to: data.email } : {}),
        subject: `New website-plan request — ${data.name} (${data.business})`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[quote] Resend error:", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "Could not send right now." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[quote] Delivery exception:", err);
    return NextResponse.json({ ok: false, error: "Could not send right now." }, { status: 502 });
  }
}
