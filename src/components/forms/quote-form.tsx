"use client";

import { useRef, useState } from "react";
import { useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle, CalendarCheck, Plus, Minus } from "lucide-react";
import { quoteSchema } from "@/lib/validation";
import { track, EVENTS } from "@/lib/analytics";
import { site, siteStatus } from "@/config/site";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input, Textarea, Select, Label, FieldError } from "@/components/ui/field";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<string, string>>;

// "Not sure yet" first — nobody is asked to commit to a spend before we've talked.
const budgets = ["Not sure yet", "$1,500–$2,500", "$2,500–$5,000", "$5,000+", "Prefer not to say"];
const timelines = ["Not sure yet", "As soon as possible", "In the next 1–3 months", "Just researching"];
const industries = [
  "Contractor / Home service",
  "Window tinting",
  "Forklift / Industrial",
  "Marine / Boat / Jetski",
  "Gym / Trainer",
  "Restaurant / Hospitality",
  "Salon / Professional",
  "Other",
];

// Resend keys are server-only, so the browser can only see whether a Formspree
// endpoint exists. With neither configured, we POST to /api/quote, which emails
// via Resend if its keys are set and otherwise logs the lead server-side.
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";
const SHOW_DELIVERY_WARNING = process.env.NODE_ENV === "development" && !FORMSPREE_ENDPOINT;

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [source, setSource] = useState("");
  const [showMore, setShowMore] = useState(false);
  const startedRef = useRef(false);
  const lastPayloadRef = useRef<string>("");

  // Capture lead source (UTM params, chosen plan, referrer) once on mount.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const parts: string[] = [];
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "plan", "ref"].forEach((k) => {
      const v = params.get(k);
      if (v) parts.push(`${k}=${v}`);
    });
    if (document.referrer) parts.push(`referrer=${document.referrer}`);
    setSource(parts.join("; ").slice(0, 300));
  }, []);

  /** Fires once, the first time someone actually engages with the form. */
  function handleFirstInput() {
    if (startedRef.current) return;
    startedRef.current = true;
    track(EVENTS.formStart);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return; // guard against double-clicks
    setErrors({});

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const parsed = quoteSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      // Move focus to the first invalid control (contactMethod maps to email).
      const firstKey = Object.keys(fieldErrors)[0];
      const focusName = firstKey === "contactMethod" ? "email" : firstKey;
      form.querySelector<HTMLElement>(`[name="${focusName}"]`)?.focus();
      return;
    }

    // Duplicate-submission protection: identical payload already accepted.
    const payload = JSON.stringify(parsed.data);
    if (payload === lastPayloadRef.current) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const endpoint = FORMSPREE_ENDPOINT || "/api/quote";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: payload,
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      lastPayloadRef.current = payload;
      setStatus("success");
      track(EVENTS.formSubmit, { source: parsed.data.source || "" });
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded border border-line bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-hivis-deep" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold text-ink">Got it — thank you</h2>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-steel">
          We&apos;ll read through what you sent and get back to you with your free website plan, usually
          within one business day. No pressure, and no obligation to go ahead.
        </p>

        {/* Booking is offered only when a scheduling link is configured. */}
        {siteStatus.hasBooking ? (
          <div className="mx-auto mt-7 max-w-md rounded border border-line bg-concrete p-5">
            <p className="text-[0.95rem] font-semibold text-ink">Want to talk sooner?</p>
            <p className="mt-1 text-sm leading-relaxed text-steel">
              Grab a short introductory call at a time that suits you — 15 minutes, no sales pitch.
            </p>
            <ButtonLink
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full"
              data-analytics="booking_after_submit"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book a short call
            </ButtonLink>
          </div>
        ) : null}

        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setStatus("idle");
            setShowMore(false);
          }}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onInput={handleFirstInput}
      noValidate
      className="rounded border border-line bg-white p-6 sm:p-8"
    >
      {/* Honeypot: hidden from humans, catches bots. Do not remove. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="source" value={source} readOnly />

      {SHOW_DELIVERY_WARNING ? (
        <div
          className="mb-5 flex items-start gap-2.5 rounded border border-amber-300 bg-amber-50 p-3.5 text-sm text-amber-900"
          role="status"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            <strong>Dev notice — form delivery not configured.</strong> Submissions POST to{" "}
            <code>/api/quote</code>, which emails via Resend only if its keys are set (otherwise it logs to
            the server console). Set <code>NEXT_PUBLIC_FORMSPREE_ENDPOINT</code> in <code>.env.local</code>{" "}
            before launch. (Development only — never shown to visitors.)
          </span>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Your name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby="err-name"
          />
          <FieldError id="err-name">{errors.name}</FieldError>
        </div>
        <div>
          <Label htmlFor="business">Business name</Label>
          <Input
            id="business"
            name="business"
            autoComplete="organization"
            aria-invalid={!!errors.business}
            aria-describedby="err-business"
          />
          <FieldError id="err-business">{errors.business}</FieldError>
        </div>
      </div>

      {/* Email OR phone — we ask for one, not both. */}
      <fieldset className="mt-5" aria-describedby="err-contactMethod">
        <legend className="text-sm font-medium text-ink">
          How should we get back to you?{" "}
          <span className="font-normal text-steel">— email or phone, whichever you prefer</span>
        </legend>
        <div className="mt-3 grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              aria-invalid={!!errors.email || !!errors.contactMethod}
              aria-describedby="err-email"
            />
            <FieldError id="err-email">{errors.email}</FieldError>
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={!!errors.phone || !!errors.contactMethod}
              aria-describedby="err-phone"
            />
            <FieldError id="err-phone">{errors.phone}</FieldError>
          </div>
        </div>
        <FieldError id="err-contactMethod">{errors.contactMethod}</FieldError>
      </fieldset>

      <div className="mt-5">
        <Label htmlFor="website">
          Your current website <span className="font-normal text-steel">(optional)</span>
        </Label>
        <Input
          id="website"
          name="website"
          inputMode="url"
          placeholder="If you have one — or a Facebook page"
        />
      </div>

      <div className="mt-5">
        <Label htmlFor="help">What would you like help with?</Label>
        <Textarea
          id="help"
          name="help"
          rows={4}
          placeholder="A few words is plenty — what you do, and what you'd like the website to do for you."
          aria-invalid={!!errors.help}
          aria-describedby="err-help"
        />
        <FieldError id="err-help">{errors.help}</FieldError>
      </div>

      {/* Progressive step 2 — entirely optional, collapsed by default. */}
      <div className="mt-6 rounded border border-line bg-concrete/60">
        <button
          type="button"
          onClick={() => setShowMore((v) => !v)}
          aria-expanded={showMore}
          aria-controls="more-details"
          className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium text-ink"
        >
          <span>
            Add a few more details{" "}
            <span className="font-normal text-steel">(optional — helps us prepare)</span>
          </span>
          {showMore ? (
            <Minus className="h-4 w-4 shrink-0" aria-hidden="true" />
          ) : (
            <Plus className="h-4 w-4 shrink-0" aria-hidden="true" />
          )}
        </button>

        <div id="more-details" hidden={!showMore} className="grid gap-5 border-t border-line p-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="industry">Type of business</Label>
            <Select id="industry" name="industry" defaultValue="">
              <option value="">No preference</option>
              {industries.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="budget">Budget</Label>
            <Select id="budget" name="budget" defaultValue="Not sure yet">
              {budgets.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="timeline">Timeline</Label>
            <Select id="timeline" name="timeline" defaultValue="Not sure yet">
              {timelines.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {status === "error" ? (
        <div
          className="mt-5 flex items-start gap-2.5 rounded border border-red-200 bg-red-50 p-3.5 text-sm text-red-700"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            Something went wrong sending that. Please try again
            {siteStatus.hasPhone ? " — or call us directly, we don't want to miss you." : "."}
          </span>
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full"
        disabled={status === "submitting"}
        data-analytics="quote_form_submit"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Get my free website plan"
        )}
      </Button>
      <p className="mt-3 text-center text-xs leading-relaxed text-steel">
        Free and no obligation. We&apos;ll only use your details to reply about your project — no spam, and
        we never sell your information.
      </p>
    </form>
  );
}
