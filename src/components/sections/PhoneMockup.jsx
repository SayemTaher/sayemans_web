import { motion } from 'motion/react';
import { taalmeester } from '@/data/products';

const src = (name, w) => `/images/taalmeester/${name}-${w}.webp`;

/**
 * iPhone frame showing a real TaalMeester screen (see taalmeester.screens).
 * Screens with a dark capture swap automatically in dark mode.
 * Sources: assets-src/taalmeester/*.webp → `npm run images`.
 */
export default function PhoneMockup({ screen = 'home', className = 'w-[280px] sm:w-[300px]', style, eager = false, sizes = '300px' }) {
  const s = taalmeester.screens[screen];
  const img = (name, extra = '') => (
    <img
      src={src(name, 400)}
      srcSet={`${src(name, 400)} 400w, ${src(name, 800)} 800w`}
      sizes={sizes}
      width="1206"
      height="2622"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      alt={extra ? '' : s.alt}
      aria-hidden={extra ? 'true' : undefined}
      className={`absolute inset-0 block size-full object-cover object-top ${extra}`}
      draggable="false"
    />
  );
  return (
    <motion.div style={style} className={`relative mx-auto ${className}`}>
      <div className="relative rounded-[17%/8%] bg-[linear-gradient(145deg,#4a4642,#1d1b19_45%,#3a3633)] p-[3.4%] shadow-[0_50px_90px_-30px_rgb(40_25_5/0.55),0_20px_30px_-20px_rgb(0_0_0/0.4),inset_0_0_0_1.5px_rgb(255_255_255/0.14)]">
        {/* side buttons */}
        <span aria-hidden="true" className="absolute top-[18%] -left-[1%] h-[5%] w-[1%] rounded-l bg-[#2c2a27]" />
        <span aria-hidden="true" className="absolute top-[26%] -left-[1%] h-[9%] w-[1%] rounded-l bg-[#2c2a27]" />
        <span aria-hidden="true" className="absolute top-[24%] -right-[1%] h-[13%] w-[1%] rounded-r bg-[#2c2a27]" />

        <div className="relative aspect-[1206/2622] overflow-hidden rounded-[14%/6.6%] bg-[#f6efe8]">
          {img(screen, s.dark ? 'dark:hidden' : '')}
          {s.dark && img(`${screen}-dark`, 'hidden dark:block')}
          {/* Dynamic Island + glass reflection */}
          <span aria-hidden="true" className="absolute top-[1.3%] left-1/2 h-[3.6%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.2)_0%,transparent_26%,transparent_72%,rgb(255_255_255/0.07)_100%)]" />
        </div>
      </div>
    </motion.div>
  );
}
