import { motion } from 'motion/react';

/**
 * iPhone frame showing the real TaalMeester home screen.
 * Source screenshot: assets-src/taalmeester_home.png → `npm run images`.
 */
export default function PhoneMockup({ className = '', style }) {
  return (
    <motion.div style={style} className={`relative mx-auto w-[280px] sm:w-[300px] ${className}`}>
      <div className="relative rounded-[52px] bg-[linear-gradient(145deg,#3a3a3c,#1c1c1e)] p-[10px] shadow-[0_50px_100px_-30px_rgb(0_0_0/0.6),inset_0_0_0_1.5px_rgb(255_255_255/0.12)]">
        {/* side buttons */}
        <span aria-hidden="true" className="absolute top-28 -left-[3px] h-8 w-[3px] rounded-l bg-[#2c2c2e]" />
        <span aria-hidden="true" className="absolute top-40 -left-[3px] h-14 w-[3px] rounded-l bg-[#2c2c2e]" />
        <span aria-hidden="true" className="absolute top-36 -right-[3px] h-20 w-[3px] rounded-r bg-[#2c2c2e]" />

        <div className="relative overflow-hidden rounded-[42px] bg-[#f2f2f7]">
          <img
            src="/images/taalmeester-home-600.webp"
            srcSet="/images/taalmeester-home-600.webp 600w, /images/taalmeester-home-900.webp 900w"
            sizes="300px"
            width="1320"
            height="2868"
            loading="lazy"
            decoding="async"
            alt="TaalMeester home screen: daily goal at 40%, streak, XP, words learned and the A0 Beginner learning journey"
            className="block h-auto w-full"
            draggable="false"
          />
          {/* glass reflection */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.18)_0%,transparent_28%,transparent_70%,rgb(255_255_255/0.06)_100%)]" />
        </div>
      </div>
    </motion.div>
  );
}
