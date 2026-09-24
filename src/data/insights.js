// Insights / blog articles. Kept as data for now; can move to a headless CMS
// or Firestore `posts` collection later without changing the page components.

export const insights = [
  {
    slug: 'mvp-scope-that-actually-ships',
    title: 'How to scope a SaaS MVP that actually ships',
    excerpt: 'Most MVPs fail from too much scope, not too little. A practical framework for cutting to the core.',
    category: 'Product Strategy',
    date: '2026-09-10',
    readingTime: 5,
    body: [
      { type: 'p', text: 'The most common reason an MVP never launches is not technical. It is scope. Every stakeholder adds “just one more” feature until the minimum viable product becomes a maximum viable delay.' },
      { type: 'h2', text: 'Start from one job-to-be-done' },
      { type: 'p', text: 'Write down the single job your first customers hire the product for. Every feature must directly serve that job or be moved to the “later” column. Authentication, one core workflow and a way to pay are usually enough.' },
      { type: 'h2', text: 'Buy, do not build, the commodity' },
      { type: 'p', text: 'Auth, payments, email and analytics are solved problems. Firebase Auth, Stripe and a transactional email service get you weeks ahead. Save your custom engineering for what makes you different.' },
      { type: 'h2', text: 'Design the second version on paper' },
      { type: 'p', text: 'Sketch what version two looks like so the architecture does not paint you into a corner, but do not build it. A clean data model and modular front-end cost almost nothing extra and make scaling painless.' },
      { type: 'p', text: 'A good MVP is embarrassing in scope but never in quality. Ship the smallest thing that delivers real value, measure, and iterate.' },
    ],
  },
  {
    slug: 'liquid-glass-on-the-web',
    title: 'Liquid Glass on the web: bringing Apple’s design language to browsers',
    excerpt: 'Translucency, depth and fluid motion. What works in CSS today, and where to hold back.',
    category: 'Design',
    date: '2026-08-21',
    readingTime: 6,
    body: [
      { type: 'p', text: 'Apple’s Liquid Glass material redefined interfaces across iOS, iPadOS and macOS 26. Its translucent, light-refracting surfaces create hierarchy without heavy borders. Naturally, clients now ask for the same feeling on the web.' },
      { type: 'h2', text: 'The building blocks' },
      { type: 'p', text: 'Modern CSS gets you surprisingly far: backdrop-filter for blur and saturation, layered gradients for specular highlights, and inset shadows for the glass edge. In Chromium, an SVG displacement filter adds real refraction.' },
      { type: 'h2', text: 'Legibility first' },
      { type: 'p', text: 'Glass is a material for controls and navigation, not for long-form text. Keep content on solid surfaces, ensure WCAG contrast over any background, and honour the “reduce transparency” and “reduce motion” preferences.' },
      { type: 'h2', text: 'Motion with meaning' },
      { type: 'p', text: 'Apple-style motion uses springs, not linear easing. Elements respond to scroll and pointer with physical inertia. Used sparingly, it makes a site feel alive. Overused, it feels like a demo reel.' },
    ],
  },
  {
    slug: 'gdpr-analytics-for-dutch-businesses',
    title: 'Privacy-first analytics for Dutch businesses',
    excerpt: 'Measure what matters without breaking GDPR or the trust of your visitors.',
    category: 'Engineering',
    date: '2026-07-30',
    readingTime: 4,
    body: [
      { type: 'p', text: 'Under the GDPR and the Dutch Telecommunicatiewet, analytics cookies that are not strictly necessary require prior, informed consent. Yet many sites still load trackers before the banner is even answered.' },
      { type: 'h2', text: 'Consent before collection' },
      { type: 'p', text: 'Load analytics scripts only after explicit opt-in, and make “Decline” as easy as “Accept”. Google Consent Mode and first-party event pipelines make this straightforward.' },
      { type: 'h2', text: 'Collect less, learn more' },
      { type: 'p', text: 'You rarely need personal data to make product decisions. Page paths, referrers, UTM campaigns and anonymised session IDs answer most questions. Store them in the EU and set a retention period.' },
      { type: 'p', text: 'Privacy-first analytics is not a compromise. It is a competitive advantage in a market where trust converts.' },
    ],
  },
];

export const getInsight = (slug) => insights.find((i) => i.slug === slug);
