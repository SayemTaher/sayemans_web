const Sparkle = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true" className="size-5 shrink-0 text-lime">
    <path d="M50 0 C55 38 62 45 100 50 C62 55 55 62 50 100 C45 62 38 55 0 50 C38 45 45 38 50 0Z" fill="currentColor" />
  </svg>
);

/** Tilted ink ribbon of capabilities, scrolling endlessly (pauses on hover). */
export default function Marquee({ items, className = '' }) {
  const row = [...items, ...items];
  return (
    <div className={`relative z-10 -mx-4 ${className}`}>
      <div className="-rotate-[1.6deg] overflow-hidden bg-[#16140f] py-4 text-[#f3efe6] shadow-[0_20px_40px_-20px_rgb(0_0_0/0.5)] dark:bg-[#f3efe6] dark:text-[#16140f]">
        <ul className="animate-marquee flex w-max items-center gap-6 hover:[animation-play-state:paused]">
          {row.map((item, i) => (
            <li key={i} aria-hidden={i >= items.length} className="flex items-center gap-6 font-display text-[clamp(1.25rem,2.4vw,1.9rem)] font-bold tracking-[-0.03em] whitespace-nowrap">
              {item}
              <Sparkle />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
