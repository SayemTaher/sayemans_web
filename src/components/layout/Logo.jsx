import { Link } from 'react-router';

export default function Logo({ className = '' }) {
  return (
    <Link to="/" aria-label="SAYEMANS home" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-[10px] bg-[linear-gradient(135deg,var(--color-blue),var(--color-indigo)_55%,var(--color-pink))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),0_4px_14px_-4px_var(--color-indigo)] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:rotate-[-8deg] group-hover:scale-105">
        <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/45 to-transparent" />
        <span className="relative text-[15px] font-bold text-white">S</span>
      </span>
      <span className="text-[15px] font-semibold tracking-[0.14em]">SAYEMANS</span>
    </Link>
  );
}
