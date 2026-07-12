import Link from "next/link";
import { Section } from "@/components/ui/section";
import { site, siteStatus, legalDisplayName } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects information submitted through this website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Section tone="paper">
      <div className="mx-auto max-w-3xl">
        <span className="spec-label">Legal</span>
        <h1 className="mt-3 text-display-md text-ink">Privacy Policy</h1>
        {/* TEMPLATE — have this reviewed for your jurisdiction before launch. */}
        <p className="mt-3 rounded border border-dashed border-line bg-concrete px-4 py-3 font-mono text-xs uppercase tracking-wide text-steel">
          Template — review with a professional and tailor to your business &amp; region before publishing.
        </p>

        <div className="mt-8 space-y-6 text-[0.95rem] leading-relaxed text-steel">
          <p>
            This Privacy Policy explains how {legalDisplayName} (&quot;we&quot;) handles information collected
            through this website. By using the site, you agree to the practices described here.
          </p>

          <div>
            <h2 className="text-lg font-bold text-ink">Information we collect</h2>
            <p className="mt-2">
              When you submit our quote or contact form, we collect the details you provide — such as your
              name, business name, email, phone number, and any message. We may also collect basic,
              non-identifying analytics about how the site is used if analytics is enabled.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink">How we use it</h2>
            <p className="mt-2">
              We use your information only to respond to your inquiry and provide the services you request. We
              do not sell your personal information.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink">Service providers</h2>
            <p className="mt-2">
              We use trusted third-party services (for example, form/email delivery and hosting) to operate
              this site. These providers process data on our behalf and only as needed to deliver their
              services.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink">Your choices</h2>
            <p className="mt-2">
              You may request that we update or delete the information you&apos;ve submitted by contacting us
              {siteStatus.hasEmail ? (
                <>
                  {" "}at{" "}
                  <a href={`mailto:${site.contact.email}`} className="font-medium text-ink underline">
                    {site.contact.email}
                  </a>
                  .
                </>
              ) : (
                <>
                  {" "}through our{" "}
                  <Link href="/contact" className="font-medium text-ink underline">
                    contact form
                  </Link>
                  .
                </>
              )}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-ink">Contact</h2>
            <p className="mt-2">
              Questions about this policy? Reach us
              {siteStatus.hasEmail ? (
                <>
                  {" "}at{" "}
                  <a href={`mailto:${site.contact.email}`} className="font-medium text-ink underline">
                    {site.contact.email}
                  </a>
                </>
              ) : (
                <>
                  {" "}through our{" "}
                  <Link href="/contact" className="font-medium text-ink underline">
                    contact form
                  </Link>
                </>
              )}
              {siteStatus.hasPhone ? (
                <>
                  {" "}or call{" "}
                  <a href={`tel:${site.contact.phoneHref}`} className="font-medium text-ink underline">
                    {site.contact.phoneDisplay}
                  </a>
                </>
              ) : null}
              .
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
