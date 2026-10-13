import { motion } from 'motion/react';
import PhoneMockup from './PhoneMockup';
import { Stagger, staggerItem } from '../ui/Reveal';

// What's inside TaalMeester, each card showing the real screen.
const cards = [
  { screen: 'path', title: 'A clear learning path', text: 'Units and lessons in order, so the next step is always obvious.', fill: '#ffd9c2', span: 'sm:col-span-2 md:row-span-2', big: true },
  { screen: 'de-het', title: 'De or het?', text: 'Short rounds of real sentences, with the rule behind every answer.', fill: '#cfe0ff' },
  { screen: 'translator', title: 'Built-in translator', text: 'Type, speak or scan a letter from the gemeente.', fill: '#cdeedd' },
  { screen: 'grammar', title: 'Grammar lab', text: '61 bilingual topics with quick checks, A0 to A2.', fill: '#ddd0ff' },
  { screen: 'exam', title: 'Level exams', text: 'Timed, fully in Dutch, one for every stage.', fill: '#fbeaa8' },
  { screen: 'knm', title: 'Leven in Nederland', text: 'KNM prep: culture, government, rights, work and more.', fill: '#ffd6e7', span: 'sm:col-span-2' },
  { screen: 'words', title: 'Word library', text: 'Every word from the lessons, searchable by level.', fill: '#e6f6b4' },
  { screen: 'challenges', title: 'Challenges', text: 'Spend XP on extra practice: reviews, articles, verbs.', fill: '#f3e6d6' },
];

/** Bento of TaalMeester features; each card has a phone rising out of it. */
export default function AppShowcase() {
  return (
    <Stagger className="grid auto-rows-[340px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {cards.map((c) => (
        <motion.article
          key={c.screen}
          variants={staggerItem}
          style={{ '--fill': c.fill }}
          className={`group relative isolate flex flex-col overflow-hidden rounded-[32px] bg-[var(--fill)] p-6 text-[#16140f] shadow-[inset_0_1px_0_rgb(255_255_255/0.7),12px_16px_32px_-16px_rgb(120_104_76/0.45)] dark:bg-[color-mix(in_oklab,var(--fill)_22%,#1a1815)] dark:text-fg ${c.span ?? ''}`}
        >
          <h3 className={`font-display font-bold tracking-[-0.035em] ${c.big ? 'text-3xl sm:text-4xl' : 'text-xl'}`}>{c.title}</h3>
          <p className={`mt-2 max-w-xs leading-snug opacity-75 ${c.big ? 'text-[16px]' : 'text-[14px]'}`}>{c.text}</p>
          <div className={`pointer-events-none absolute left-1/2 -translate-x-1/2 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-4 ${c.big ? 'top-[34%] w-[62%] sm:w-[54%]' : 'top-[45%] w-[58%]'}`}>
            <PhoneMockup screen={c.screen} className="w-full" sizes={c.big ? '320px' : '200px'} />
          </div>
        </motion.article>
      ))}
    </Stagger>
  );
}
