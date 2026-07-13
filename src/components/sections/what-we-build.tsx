import { Section } from "@/components/ui/section";

/**
 * WHAT GROUNDWORK BUILDS — capability, not a price list.
 *
 * Layout is deliberately uneven: three "core" items get a wider editorial
 * treatment, the rest run as a two-column list under a rule. Every item is
 * described by what it does for the business, not by the technology behind it.
 * Nothing here is a bordered card in a 3×N grid.
 */
const core: [string, string][] = [
  [
    "A focused first website",
    "For a business that's been getting by on a Facebook page and word of mouth. Small, professional, and enough to be taken seriously — without paying for things you don't need yet.",
  ],
  [
    "A complete redesign",
    "When the site you have is costing you work: slow, awkward on a phone, or clearly a few years out of date. We rebuild it around the jobs you actually want.",
  ],
  [
    "Service and service-area pages",
    "A page for each thing you do, and honest pages for the places you actually cover. So you turn up for the searches that matter instead of one vague catch-all page.",
  ],
];

const rest: [string, string][] = [
  [
    "Project galleries and before/after",
    "Your work, laid out so people can see it properly. For most trades this does more selling than any paragraph of copy.",
  ],
  [
    "Quote and enquiry forms",
    "Short, works on a phone, asks for the details you actually need — and gets through to you rather than a spam folder.",
  ],
  [
    "Booking systems",
    "Let people pick a slot themselves, so you're not playing phone tag to arrange a visit.",
  ],
  [
    "Payment and invoice flows",
    "Where it suits the business — deposits, invoices, and clear payment paths, so getting paid isn't a separate chase.",
  ],
  [
    "Customer or employee portals",
    "A private, logged-in area for clients or staff — job status, documents, history, whatever it needs to hold.",
  ],
  [
    "Admin dashboards",
    "One place to see what's coming in and what needs doing, instead of a spreadsheet and a memory.",
  ],
  [
    "Integrations and follow-up automation",
    "Connect the tools you already use, and make sure nobody waits three days for a reply because you were on a roof.",
  ],
  [
    "Optional ongoing care",
    "Someone to call when prices change or a new service gets added — completely optional, and never a condition of owning your site.",
  ],
];

export function WhatWeBuild() {
  return (
    <Section tone="ink" id="what-we-build">
      <div className="max-w-prose">
        <span className="eyebrow eyebrow--dark">What we build</span>
        <h2 className="mt-4 text-display-md text-paper">
          Most businesses need a good website. Some need more than that.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-paper/70">
          Here&apos;s the range of what we can build. We&apos;ll recommend the simplest thing that does the
          job — and tell you plainly when you don&apos;t need the bigger version.
        </p>
      </div>

      {/* Core work — wider, given room to breathe. */}
      <div className="mt-14 grid gap-10 border-t border-line-dark pt-10 md:grid-cols-3 md:gap-12">
        {core.map(([title, body]) => (
          <div key={title}>
            <span className="notch mb-4 block h-2.5 w-2.5 bg-sand" aria-hidden="true" />
            <h3 className="font-display text-xl font-bold text-paper">{title}</h3>
            <p className="mt-2.5 leading-relaxed text-paper/65">{body}</p>
          </div>
        ))}
      </div>

      {/* Everything else — a plain list, no cards. */}
      <dl className="mt-12 grid gap-x-12 gap-y-7 border-t border-line-dark pt-10 sm:grid-cols-2">
        {rest.map(([title, body]) => (
          <div key={title}>
            <dt className="font-display font-bold text-paper">{title}</dt>
            <dd className="mt-1.5 leading-relaxed text-paper/60">{body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
