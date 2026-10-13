import { Link } from 'react-router';
import { motion } from 'motion/react';
import Icon from './Icon';

const MotionLink = motion.create(Link);

const variants = {
  primary:
    'bg-fg text-bg font-semibold shadow-[inset_0_-3px_0_rgb(0_0_0/0.35),inset_0_1px_0_rgb(255_255_255/0.18),0_10px_24px_-10px_rgb(0_0_0/0.5)] hover:opacity-90',
  accent:
    'text-white font-semibold bg-[#2b39ff] shadow-[inset_0_-3px_0_rgb(0_0_0/0.28),inset_0_1px_0_rgb(255_255_255/0.3),0_12px_28px_-10px_rgb(43_57_255/0.7)] hover:brightness-110',
  lime:
    'text-[#16140f] font-semibold bg-lime shadow-[inset_0_-3px_0_rgb(0_0_0/0.18),inset_0_1px_0_rgb(255_255_255/0.5),0_12px_28px_-12px_rgb(120_160_0/0.7)] hover:brightness-105',
  glass: 'glass glass-rim text-fg',
  ghost: 'text-blue hover:underline underline-offset-4 px-0!',
};

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-14 px-8 text-[17px]',
};

/** Renders a <Link> for internal `to`, <a> for `href`, otherwise <button>. */
export default function Button({ to, href, variant = 'primary', size = 'md', icon, iconRight = 'ArrowRight', className = '', children, ...rest }) {
  const cls = `group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-[opacity,filter,background-color] duration-300 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {iconRight && (
        <Icon name={iconRight} size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
      )}
    </>
  );
  const motionProps = { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 }, transition: { type: 'spring', stiffness: 400, damping: 25 } };

  if (to) return <MotionLink to={to} className={cls} {...motionProps} {...rest}>{content}</MotionLink>;
  if (href)
    return (
      <motion.a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" {...motionProps} {...rest}>
        {content}
      </motion.a>
    );
  return <motion.button className={cls} {...motionProps} {...rest}>{content}</motion.button>;
}
