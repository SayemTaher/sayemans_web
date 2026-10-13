import { taalmeester } from '@/data/products';
import PhoneMockup from './PhoneMockup';

const order = ['welcome', 'home', 'lesson', 'new-word', 'quiz', 'perfect', 'streak', 'challenges', 'words', 'voice'];

/** Endless rail of real TaalMeester screens with captions (pauses on hover). */
export default function ScreenRail({ screens = order }) {
  const row = [...screens, ...screens];
  return (
    <div className="mask-fade-x overflow-hidden py-6">
      <ul className="flex w-max animate-[marquee_70s_linear_infinite] gap-6 hover:[animation-play-state:paused] sm:gap-8">
        {row.map((key, i) => (
          <li key={i} aria-hidden={i >= screens.length} className="w-[170px] shrink-0 sm:w-[200px]">
            <PhoneMockup screen={key} className="w-full" sizes="200px" />
            <p className="mt-4 text-center font-mono text-[11px] tracking-[0.14em] text-fg-subtle uppercase">{taalmeester.screens[key].label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
