export default function Marquee({ items, className = '' }) {
  const row = [...items, ...items];
  return (
    <div className={`mask-fade-x overflow-hidden ${className}`}>
      <ul className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <li key={i} aria-hidden={i >= items.length} className="glass glass-rim whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-fg-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
