import { Link } from 'react-router';
import Wordmark from './Wordmark';

export default function Logo({ className = '', size = 15 }) {
  return (
    <Link to="/" aria-label="SAYEMANS home" className={`inline-flex items-center py-2 text-fg transition-opacity hover:opacity-70 ${className}`}>
      <Wordmark size={size} />
    </Link>
  );
}
