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
