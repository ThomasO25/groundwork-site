"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GA_ID, CLARITY_ID, EVENTS, track } from "@/lib/analytics";

/**
 * Loads analytics ONLY when an ID is configured, and auto-captures conversion
 * clicks via event delegation — so server components stay server components and
 * only need a `data-analytics="..."` attribute (no client wrappers, no extra JS
 * per button).
 *
 * Automatically tracked:
 *   - any element with data-analytics="<label>"  → cta_click
 *   - any <a href="tel:...">                     → phone_click
 *   - any <a href="mailto:...">                  → email_click
 *   - any element with data-analytics-portfolio  → portfolio_click
 *
 * Form start/submit events are fired directly from the quote form.
 */
export function Analytics() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest("a");
      const href = link?.getAttribute("href") || "";

      if (href.startsWith("tel:")) {
        track(EVENTS.phoneClick, { location: window.location.pathname });
        return;
      }
      if (href.startsWith("mailto:")) {
        track(EVENTS.emailClick, { location: window.location.pathname });
        return;
      }

      const portfolio = target.closest<HTMLElement>("[data-analytics-portfolio]");
      if (portfolio) {
        track(EVENTS.portfolioClick, {
          project: portfolio.dataset.analyticsPortfolio || "",
          location: window.location.pathname,
        });
        return;
      }

      const cta = target.closest<HTMLElement>("[data-analytics]");
      if (cta) {
        track(EVENTS.ctaClick, {
          cta: cta.dataset.analytics || "",
          location: window.location.pathname,
        });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      ) : null}

      {CLARITY_ID ? (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_ID}");`}
        </Script>
      ) : null}
    </>
  );
}
