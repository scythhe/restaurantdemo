import { useEffect, useRef, useState } from 'react';
import { gsap } from './lib/gsap';
import { motionOK, emit, HERO_REVEAL } from './lib/motion';
import { MEDIA } from './config/media';

/**
 * Full-viewport curtain. The counter's completion is gated on the real
 * decode of the hero image — never a timeout. The 600ms cap only guards
 * against a stalled network so the whole thing stays under 1.6s.
 *
 * Rendered into the prerendered HTML too; index.html hides it via
 * <noscript>, and index.css hides it under prefers-reduced-motion.
 */
export function Preloader() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Reduced motion: 0ms preloader, hand over immediately
    if (!motionOK()) {
      emit(HERO_REVEAL);
      setGone(true);
      return;
    }
    const rootEl = rootRef.current;
    const counterEl = counterRef.current;
    if (!rootEl || !counterEl) return;

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden'; // body scroll locked until the curtain lifts

    let value = 0;
    let target = 12;
    let finished = false;
    let curtainStarted = false;
    let raf = 0;

    const finish = () => {
      finished = true;
      target = 100;
    };

    // Decode the same asset the hero frame renders
    const img = new Image();
    img.src = MEDIA.hero.src;
    (img.decode ? img.decode() : Promise.resolve()).then(finish, finish);

    const cap = performance.now() + 600; // stalled-network guard, keeps total ≤ 1.6s
    let lastT = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastT) / 1000, 0.2); // time-based: frame-rate independent
      lastT = now;
      if (!finished && now > cap) finish();
      if (!finished && target < 90) target += dt * 24; // idle creep while decoding
      value += (target - value) * Math.min(1, dt * 11); // counter weight: lower = heavier count
      counterEl.textContent = String(Math.round(value));

      if (finished && value > 99.2 && !curtainStarted) {
        curtainStarted = true;
        counterEl.textContent = '100';
        const tl = gsap.timeline({
          onComplete: () => {
            html.style.overflow = prevOverflow;
            setGone(true);
          },
        });
        tl.fromTo(
          rootEl,
          { clipPath: 'inset(0 0 0% 0)' },
          { clipPath: 'inset(0 0 100% 0)', duration: 1.0, ease: 'power4.inOut' },
        );
        // hero headline starts while the curtain is still 40% down (overlap)
        tl.call(() => emit(HERO_REVEAL), [], 0.6);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      html.style.overflow = prevOverflow;
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      <span
        ref={counterRef}
        className="absolute bottom-6 left-6 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--muted)] tabular-nums"
      >
        0
      </span>
    </div>
  );
}
