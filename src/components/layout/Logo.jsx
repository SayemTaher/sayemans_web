import { Link } from 'react-router';
import Wordmark from './Wordmark';

export default function Logo({ className = '', height = 17 }) {
  return (
    <Link to="/" aria-label="SAYEMANS home" className={`group inline-flex items-center py-2 text-fg ${className}`}>
      <Wordmark height={height} className="transition-opacity duration-300 group-hover:opacity-80" />
    </Link>
  );
}
