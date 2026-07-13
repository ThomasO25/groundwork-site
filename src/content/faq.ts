export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
  {
    q: "What's included in the free website plan?",
    a: "The free website plan is a practical recommendation rather than a finished mockup or full audit. You get a recommended objective for the website, the pages and features we think matter, the service level that fits, a starting or estimated project price, and the next steps we'd suggest. It doesn't include a completed visual design, a coded homepage, a full SEO audit, or a complete business strategy document — those are the project itself. The plan is yours to keep either way.",
  },
  {
    q: "How long does a project normally take?",
    a: "A Starter Site is usually quick once your content and photos are ready. A Business Website typically takes a few weeks. Growth sites and custom builds take longer, depending on scope. You get a timeline in writing before anything starts, so you can plan around it.",
  },
  {
    q: "What do you need from me?",
    a: "Your logo and brand colours if you have them, photos of your work, a list of your services and the areas you cover, and any reviews or credentials you'd like featured. For a Starter Site you supply the final written content and usable photos — that's part of what keeps it affordable. On larger projects we'll draft the copy from the details you give us. If something's missing, we'll tell you plainly.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. You own your domain, your content, and the finished site. Website care is optional — it's a service, not a licence, so you don't have to keep paying us to keep your website.",
  },
  {
    q: "What does ongoing website care include?",
    a: "Hosting and deployment oversight, software and dependency monitoring, routine backups where applicable, uptime monitoring, form-delivery monitoring so enquiries don't quietly fail, and minor content edits within an agreed monthly allowance. It starts at $75/month, it's entirely optional, and edits aren't unlimited — larger changes are quoted separately, always in writing first.",
  },
  {
    q: "How do payments work?",
    a: "After the project scope is approved, you'll receive a written agreement and a secure invoice. Projects normally begin with a deposit, and the remaining payment schedule is listed clearly in the proposal. There's no financing, no credit check, and no third-party lender — and there's nothing to pay before you've agreed to a project.",
  },
  {
    q: "How much does a website cost?",
    a: "Starter Sites start at $750, Business Websites at $1,500, and Growth Websites at $2,500. Lead systems and custom builds are quoted individually. Every price is a starting point — you get the real number in writing, based on your actual scope, before you commit to anything.",
  },
  {
    q: "Can you get me to the top of Google?",
    a: "Nobody can honestly promise that, and it's worth being wary of anyone who does. What we can do is set up the technical foundations that help search engines discover and understand your site: sitemaps, robots configuration, on-page SEO, structured data, Search Console setup, and Google Business Profile assistance if your business is eligible. Rankings and lead volume are never guaranteed.",
  },
  {
    q: "Will my site work on phones?",
    a: "Every site is designed for phones first, because that's where most local customers will find you. Tap-to-call, fast loading, and a layout that works on any screen are built in from the start.",
  },
  {
    q: "What if I need more than a website?",
    a: "Then we'll tell you. Some businesses need booking, payment flows, a customer portal, an admin dashboard, or follow-up automation — those are custom builds, quoted individually. We'll always recommend the simplest option that does the job, not the biggest one.",
  },
];

/**
 * The six strongest questions, for the homepage. The homepage isn't the place to
 * dump every answer — it links out to the full FAQ instead.
 */
export const homepageFaqSlugs = [
  "What's included in the free website plan?",
  "How long does a project normally take?",
  "What do you need from me?",
  "Do I own the website?",
  "What does ongoing website care include?",
  "How do payments work?",
];

export const homepageFaqs: FaqItem[] = homepageFaqSlugs
  .map((q) => faqs.find((f) => f.q === q))
  .filter((f): f is FaqItem => Boolean(f));
