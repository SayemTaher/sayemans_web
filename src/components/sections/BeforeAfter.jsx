import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import Icon from '../ui/Icon';
import { Reveal, RevealText } from '../ui/Reveal';

/**
 * Drag to compare: the same checkout before and after a SAYEMANS redesign.
 * Shows the value of UI/UX work instead of describing it.
 * Accessible: a native range input drives the divider (keyboard + screen reader).
 */

function Before() {
  return (
    <div className="flex h-full flex-col gap-2 bg-[#e9e9ec] p-5 pt-14 font-[Arial,sans-serif] text-[#333] sm:p-7 sm:pt-16">
      <div className="flex items-center justify-between border-b border-[#bbb] pb-2">
        <span className="text-[13px] font-bold text-[#2b4c9b] underline">ShopCo &gt; Cart &gt; Checkout (Step 1 of 5)</span>
        <span className="text-[10px] text-[#888]">Session expires in 04:59</span>
      </div>
      <p className="rounded border border-[#e0b4b4] bg-[#fff6f6] px-2 py-1 text-[11px] text-[#9f3a38]">⚠ Please fill in ALL required fields (*) correctly before continuing!!</p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10px]">
        {['First name *', 'Last name *', 'Email *', 'Confirm email *', 'Phone *', 'Company', 'Street *', 'House no. *', 'Postal code *', 'City *', 'Country *', 'VAT number'].map((f) => (
          <label key={f} className="flex flex-col gap-0.5">
            {f}
            <span className="h-5 border border-[#aaa] bg-white" />
          </label>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5 text-[10px]">
        {['Credit card', 'iDEAL', 'Bank transfer'].map((m) => (
          <span key={m} className="flex items-center gap-1 border border-[#aaa] bg-white px-1.5 py-1">
            <span className="size-2.5 rounded-full border border-[#777]" /> {m}
          </span>
        ))}
      </div>
      <label className="flex items-start gap-1.5 text-[9px] leading-tight text-[#666]">
        <span className="mt-0.5 size-2.5 shrink-0 border border-[#777] bg-white" />I agree to the terms and conditions, privacy policy, cookie policy and newsletter subscription (required)
      </label>
      <div className="mt-auto flex gap-2 text-[11px]">
        <span className="border border-[#999] bg-[#ddd] px-3 py-1.5">Cancel</span>
        <span className="border border-[#999] bg-[#ddd] px-3 py-1.5">Back</span>
        <span className="ml-auto border border-[#2b4c9b] bg-[#3b5cab] px-3 py-1.5 text-white">Continue to step 2 &gt;&gt;</span>
      </div>
    </div>
  );
}

function After() {
  return (
    <div className="flex h-full flex-col bg-[linear-gradient(160deg,#f5f5f7,#ffffff)] p-5 pt-14 text-[#1d1d1f] sm:p-7 sm:pt-16">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold tracking-[0.12em]">SHOPCO</span>
        <span className="flex items-center gap-1 text-[11px] text-[#6e6e73]">
          <Icon name="Lock" size={11} /> Secure checkout
        </span>
      </div>
      <div className="mx-auto mt-4 w-full max-w-[300px] flex-1">
        <p className="text-[12px] text-[#6e6e73]">Total</p>
        <p className="text-[34px] font-semibold tracking-tight">€149,00</p>
        <div className="mt-4 flex h-11 items-center justify-center gap-1.5 rounded-xl bg-black text-[15px] font-medium text-white">
          <Icon name="Apple" size={16} /> Pay
        </div>
        <div className="my-4 flex items-center gap-3 text-[11px] text-[#86868b]">
          <span className="h-px flex-1 bg-black/10" /> or pay with card <span className="h-px flex-1 bg-black/10" />
        </div>
        <div className="space-y-2">
          <div className="rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-[13px] text-[#86868b]">Email</div>
          <div className="rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-[13px] text-[#86868b]">Card number</div>
        </div>
        <div className="mt-4 flex h-11 items-center justify-center rounded-xl bg-[#0066cc] text-[14px] font-medium text-white">Pay €149,00</div>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#6e6e73]">
          <Icon name="Check" size={12} className="text-[#248a3d]" /> Free returns within 30 days
        </p>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -30% 0px' });
  const reduce = useReducedMotion();
  const [pos, setPos] = useState(50);
  const touched = useRef(false);

  // A small "try me" wiggle the first time it comes into view.
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(50, [50, 30, 70, 50], {
      duration: 2.2,
      delay: 0.4,
      ease: 'easeInOut',
      onUpdate: (v) => !touched.current && setPos(v),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  return (
    <section className="container-x py-24 sm:py-32">
      <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-5 text-center">
        <Reveal as="p" className="eyebrow">UI/UX, in practice</Reveal>
        <RevealText text="Same checkout. Very different result." className="text-headline font-semibold text-chrome" />
        <Reveal as="p" delay={0.1} className="text-lg text-fg-muted">
          Twelve fields and five steps, or one tap. Drag the handle to see what a redesign changes.
        </Reveal>
      </div>

      <Reveal>
        <div ref={ref} className="glass glass-rim relative mx-auto aspect-[4/5] max-w-3xl overflow-hidden rounded-[32px] select-none sm:aspect-[16/10]">
          <div className="absolute inset-0" aria-hidden="true">
            <After />
          </div>
          <div className="absolute inset-0" aria-hidden="true" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Before />
          </div>

          {/* Labels */}
          <span aria-hidden="true" className="absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 text-[12px] font-medium text-white">Before</span>
          <span aria-hidden="true" className="absolute top-4 right-4 rounded-full bg-[#0066cc] px-3 py-1 text-[12px] font-medium text-white">After</span>

          {/* Divider + handle */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_20px_rgb(0_0_0/0.35)]" style={{ left: `${pos}%` }}>
            <span className="glass absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-fg shadow-lg">
              <span className="flex">
                <Icon name="ChevronLeft" size={16} strokeWidth={2.25} />
                <Icon name="ChevronRight" size={16} strokeWidth={2.25} />
              </span>
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={pos}
            onChange={(e) => {
              touched.current = true;
              setPos(Number(e.target.value));
            }}
            aria-label="Compare the checkout before and after the redesign"
            aria-valuetext={`${Math.round(pos)}% before, ${Math.round(100 - pos)}% after`}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
      </Reveal>
      <p className="mt-5 text-center text-[13px] text-fg-subtle">Illustrative example.</p>
    </section>
  );
}
