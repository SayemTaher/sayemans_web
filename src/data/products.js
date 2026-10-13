// Products & ventures built in-house by SAYEMANS.
// Source for TaalMeester content: https://taalmeester.net (September 2026).

export const taalmeester = {
  slug: 'taalmeester',
  name: 'TaalMeester',
  tagline: 'Dutch for expats, built for inburgering.',
  category: 'EdTech · iOS app',
  summary:
    'Structured A0 to A2 Dutch practice for expats and international students preparing for the inburgering path in the Netherlands.',
  description:
    'TaalMeester is a language-learning app built specifically for Dutch. It was not adapted from a generic template. Every exercise, content unit and progression rule is designed around the real challenges learners face on their way to A2, from ordering at a café to registering at the gemeente.',
  website: 'https://taalmeester.net',
  appStore: 'https://apps.apple.com/nl/app/taalmeester/id6763873937?l=en-GB',
  instagram: 'https://www.instagram.com/taalmeester/',
  platforms: ['iPhone', 'iPad'],
  // Real app screens (October 2026 build). Image files: public/images/taalmeester/{key}-{400,800}.webp
  screens: {
    home: { dark: true, label: 'Home', alt: 'TaalMeester home screen: streak card, the A0 Beginner level with today’s 10-minute goal and a Continue button for the Dutch alphabet lesson' },
    path: { dark: true, label: 'Learning path', alt: 'TaalMeester learning path: unit 1 Getting Started with lesson bubbles from The Dutch alphabet to a locked unit review' },
    'new-word': { label: 'New word', alt: 'TaalMeester lesson card introducing the letter A, pronounced aa, with audio' },
    lesson: { label: 'Lesson overview', alt: 'TaalMeester lesson overview for Het Nederlandse alfabet with goals and a Start lesson button' },
    quiz: { label: 'Listening quiz', alt: 'TaalMeester listening exercise answered correctly with the message Fantastisch!' },
    perfect: { label: 'Results', alt: 'TaalMeester lesson results: 100% accuracy, perfect score and +32 XP' },
    'de-het': { label: 'De or het', alt: 'TaalMeester de/het quiz intro: Ready for a round? with 25 short questions per round' },
    'de-het-rule': { label: 'Grammar rule', alt: 'TaalMeester de/het question answered correctly, showing the rule that words ending in -ing are de-words' },
    translator: { label: 'Translator', alt: 'TaalMeester translator: type, speak or scan Dutch text to translate it' },
    streak: { label: 'Streaks', alt: 'TaalMeester streak cards showing 4 and 3 days in a row' },
    exam: { label: 'Level exam', alt: 'TaalMeester level exam intro: one exam for every stage, timed and fully in Dutch' },
    welcome: { label: 'Welcome', alt: 'TaalMeester welcome screen with a personal plan of the first three lessons' },
    challenges: { label: 'Challenges', alt: 'TaalMeester Challenges tab: XP balance, word review, articles and verb tenses' },
    words: { label: 'Dictionary', alt: 'TaalMeester dictionary: a searchable library of 406 Dutch words filtered by level' },
    grammar: { label: 'Grammar', alt: 'TaalMeester grammar lab: bilingual explanations of 61 topics from A0 to A2' },
    knm: { label: 'Leven in Nederland', alt: 'TaalMeester KNM chapter Leven in Nederland covering culture, history, government, rights, education and work' },
    voice: { label: 'Dutch voice', alt: 'TaalMeester setup screen for a natural-sounding Dutch voice' },
  },
  accent: '#ff6b35',
  stats: [
    { value: 60, suffix: '+', label: 'Structured lessons' },
    { value: 15, suffix: '', label: 'Exercise types' },
    { value: 40, suffix: '+', label: 'Achievements' },
    { value: 3, suffix: '', label: 'CEFR levels (A0–A2)' },
  ],
  levels: [
    {
      level: 'A0',
      name: 'Absolute Beginner',
      units: 4,
      lessons: 12,
      hours: 8,
      summary: 'Greetings, introductions, numbers, appointments, café language, family and daily home vocabulary.',
    },
    {
      level: 'A1',
      name: 'Elementary',
      units: 7,
      lessons: 28,
      hours: 20,
      summary: 'Daily life, transport, health, housing, work communication and social interaction.',
    },
    {
      level: 'A2',
      name: 'Pre-Intermediate',
      units: 5,
      lessons: 20,
      hours: 18,
      summary: 'Government systems, rights, formal communication, education and cultural integration.',
    },
  ],
  features: [
    { icon: 'Gauge', title: 'Daily dashboard', text: 'Streak, XP, today’s goal, review queue and the next lesson, all on one screen.' },
    { icon: 'BookOpen', title: 'Clear curriculum', text: 'Stage, unit and lesson structure keeps the next step obvious.' },
    { icon: 'BarChart3', title: 'Real progress', text: 'Lessons completed, words learned, XP earned and days practised, in real numbers.' },
    { icon: 'Trophy', title: 'Motivation that means something', text: 'Streaks, XP and 40+ achievements tied to actual learning milestones.' },
    { icon: 'Headphones', title: 'Listening practice', text: 'Train your ear with native audio across realistic Dutch situations.' },
    { icon: 'ShieldCheck', title: 'Accessible & private', text: 'Dynamic Type, VoiceOver, biometric lock, dark mode, haptics and sound controls.' },
  ],
  pricing: [
    { plan: 'Free', price: '€0', note: 'First 5 A0 lessons + vocabulary & grammar library' },
    { plan: 'Weekly', price: '€5.99', note: 'per week' },
    { plan: 'Monthly', price: '€14.99', note: 'per month' },
    { plan: 'Yearly', price: '€49.99', note: 'per year' },
  ],
  whatWeDid: [
    'Product strategy & curriculum architecture',
    'Brand identity & app icon',
    'UX research with expat learners',
    'Native iOS app design & development',
    'Subscription & paywall design',
    'Bilingual marketing website (EN/NL) & SEO',
  ],
  disclaimer:
    'TaalMeester supports self-study and exam preparation. Official exam registration and requirements are managed by DUO and official institutions.',
};

export const products = [taalmeester];
