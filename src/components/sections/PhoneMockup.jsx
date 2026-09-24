import { motion } from 'motion/react';

/** TaalMeester home screen, recreated in HTML/CSS (illustrative). */
export default function PhoneMockup({ className = '', style }) {
  return (
    <motion.div style={style} className={`relative mx-auto w-[280px] sm:w-[300px] ${className}`}>
      <div className="relative rounded-[52px] bg-[linear-gradient(145deg,#3a3a3c,#1c1c1e)] p-[10px] shadow-[0_50px_100px_-30px_rgb(0_0_0/0.6),inset_0_0_0_1.5px_rgb(255_255_255/0.12)]">
        <div className="relative overflow-hidden rounded-[42px] bg-[#fff8f3] text-[#1b2433] dark:bg-[#0f1520] dark:text-[#f3f5f8]">
          {/* Dynamic Island */}
          <div className="absolute top-2.5 left-1/2 z-10 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
          <div className="flex items-center justify-between px-7 pt-3.5 text-[11px] font-semibold">
            <span>9:41</span>
            <span className="flex items-center gap-1"><span className="flex items-end gap-[2px]">{[4, 6, 8, 10].map((h) => <span key={h} className="w-[3px] rounded-sm bg-current" style={{ height: h }} />)}</span><span className="ml-1 h-[10px] w-[20px] rounded-[3px] border border-current p-[1px]"><span className="block h-full w-3/4 rounded-[1px] bg-current" /></span></span>
          </div>

          <div className="px-5 pt-8 pb-6">
            <p className="text-[11px] font-medium opacity-60">Goedemorgen 👋</p>
            <p className="text-[22px] font-bold tracking-tight">Ready for A1?</p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ['🔥', '14', 'day streak'],
                ['⚡', '2,340', 'XP'],
                ['📚', '312', 'words'],
              ].map(([e, v, l]) => (
                <div key={l} className="rounded-2xl bg-white p-2.5 shadow-sm dark:bg-white/5">
                  <p className="text-[13px]">{e}</p>
                  <p className="text-[15px] font-bold">{v}</p>
                  <p className="text-[9px] opacity-60">{l}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-3xl bg-[linear-gradient(135deg,#ff6b35,#ff8f5e)] p-4 text-white shadow-[0_12px_30px_-12px_#ff6b35]">
              <svg viewBox="0 0 36 36" className="size-12 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgb(255 255 255 / .3)" strokeWidth="4" />
                <motion.circle
                  cx="18" cy="18" r="15" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray="94.2"
                  initial={{ strokeDashoffset: 94.2 }}
                  whileInView={{ strokeDashoffset: 94.2 * 0.28 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
              </svg>
              <div>
                <p className="text-[10px] font-semibold uppercase opacity-80">Today’s goal</p>
                <p className="text-[15px] font-bold">72% · 18 / 25 XP</p>
              </div>
            </div>

            <p className="mt-5 mb-2 text-[11px] font-semibold uppercase tracking-wide opacity-50">Next lesson</p>
            {[
              ['A1 · Unit 3', 'Bij de huisarts', 'Symptoms & appointments'],
              ['A1 · Unit 3', 'Bij de apotheek', 'Medicine requests'],
            ].map(([u, t, s], i) => (
              <div key={t} className={`mb-2 flex items-center gap-3 rounded-2xl p-3 ${i === 0 ? 'bg-white shadow-sm dark:bg-white/10' : 'opacity-60'}`}>
                <span className="grid size-9 place-items-center rounded-xl bg-[#ff6b35]/15 text-[15px]">{i === 0 ? '🩺' : '💊'}</span>
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase opacity-50">{u}</p>
                  <p className="truncate text-[13px] font-bold">{t}</p>
                  <p className="truncate text-[10px] opacity-60">{s}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mb-2 h-1 w-28 rounded-full bg-current opacity-30" />
        </div>
      </div>
    </motion.div>
  );
}
