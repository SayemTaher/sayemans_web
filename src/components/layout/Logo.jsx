import { Link } from 'react-router';
import LogoMark from './LogoMark';

export default function Logo({ className = '', size = 32 }) {
  return (
    <Link to="/" aria-label="SAYEMANS home" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark
        size={size}
        className="drop-shadow-[0_4px_12px_rgb(94_92_230/0.45)] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:rotate-[-8deg] group-hover:scale-105"
      />
      <span className="text-[15px] font-semibold tracking-[0.14em]">SAYEMANS</span>
    </Link>
  );
}
