"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { quoteSchema } from "@/lib/validation";
import { trackConversion } from "@/lib/analytics";
import { services } from "@/content/services";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, Label, FieldError } from "@/components/ui/field";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<string, string>>;

const budgets = ["Not sure yet", "$1,500–$2,500", "$2,500–$4,000", "$4,000–$7,500", "$7,500+"];

// Client-visible delivery target. Resend keys are server-only, so the browser
// can only see whether a Formspree endpoint is set. When it isn't, submissions
// fall back to /api/quote (which emails via Resend if configured, else logs).
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";
// Dev-only nudge so an unconfigured form is obvious while building locally.
// Never renders in a production/preview build (NODE_ENV === "production").
const SHOW_DELIVERY_WARNING = process.env.NODE_ENV === "development" && !FORMSPREE_ENDPOINT;

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [source, setSource] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Capture lead source (UTM params, chosen plan, referrer) once on mount.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const parts: string[] = [];
    ["utm_source", "utm_medium", "utm_campaign", "plan", "ref"].forEach((k) => {
      const v = params.get(k);
      if (v) parts.push(`${k}=${v}`);
    });
    if (document.referrer) parts.push(`referrer=${document.referrer}`);
    setSource(parts.join("; ").slice(0, 200));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const parsed = quoteSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      // Move focus to the first invalid control for accessibility.
      const firstKey = Object.keys(fieldErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const endpoint = FORMSPREE_ENDPOINT || "/api/quote";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
      trackConversion("quote_request", { plan: (parsed.data as { source?: string }).source ?? "" });
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded border border-line bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-hivis-deep" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold text-ink">Request received</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-steel">
          Thanks — we&apos;ll review your details and get back to you, usually within one business day.
          If it&apos;s urgent, give us a call and we&apos;ll pick right up.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded border border-line bg-white p-6 sm:p-8">
      {/* Honeypot: hidden from humans, catches bots. Do not remove. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="source" value={source} readOnly />

      {SHOW_DELIVERY_WARNING ? (
        <div className="mb-5 flex items-start gap-2.5 rounded border border-amber-300 bg-amber-50 p-3.5 text-sm text-amber-900" role="status">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            <strong>Dev notice — form delivery not configured.</strong> No Formspree endpoint is set, so
            submissions POST to <code>/api/quote</code>, which emails via Resend only if its keys are set
            (otherwise it logs to the server console). Set one delivery path in <code>.env.local</code>{" "}
            before launch. See <code>.env.example</code>. (This notice only appears in development.)
          </span>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Your name</Label>
          <Input id="name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby="err-name" />
          <FieldError id="err-name">{errors.name}</FieldError>
        </div>
        <div>
          <Label htmlFor="business">Business name</Label>
          <Input id="business" name="business" autoComplete="organization" placeholder="Optional" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" inputMode="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby="err-email" />
          <FieldError id="err-email">{errors.email}</FieldError>
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={!!errors.phone} aria-describedby="err-phone" />
          <FieldError id="err-phone">{errors.phone}</FieldError>
        </div>
        <div>
          <Label htmlFor="industry">Type of business</Label>
          <Select id="industry" name="industry" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {["Contractor / Home service", "Window tinting", "Forklift / Industrial", "Marine / Boat / Jetski", "Gym / Trainer", "Restaurant / Hospitality", "Salon / Professional", "Other"].map(
              (o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              )
            )}
          </Select>
        </div>
        <div>
          <Label htmlFor="budget">Budget range</Label>
          <Select id="budget" name="budget" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="message">What do you need?</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="A few words about your business, your current site (if any), and your goals."
        />
      </div>

      {status === "error" ? (
        <div className="mt-5 flex items-start gap-2.5 rounded border border-red-200 bg-red-50 p-3.5 text-sm text-red-700" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            Something went wrong sending your request. Please try again, or call us directly — we don&apos;t want to
            miss you.
          </span>
        </div>
      ) : null}

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Send my free quote request"
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-steel">
        No spam, ever. We&apos;ll only use your details to respond about your project.
      </p>
    </form>
  );
}
