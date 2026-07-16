import { useEffect, type RefObject } from 'react';
import { gsap } from '../lib/gsap';
import { motionOK } from '../lib/motion';

/**
 * Reusable scroll reveals, scoped to a section ref. Wires up:
 *   [data-reveal="image"]  scrubbed clip + scale (MOTION SPEC values)
 *   [data-body-reveal]     one-shot fade/rise after its headline
 *   [data-parallax]        THE PLACE image only: yPercent -12 → 12
 */
export function useReveal(scope: RefObject<HTMLElement>): void {
  useEffect(() => {
    const root = scope.current;
    if (!motionOK() || !root) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('[data-reveal="image"]').forEach((el) => {
        const img = el.querySelector('img');
        if (!img) return;
        const tl = gsap.timeline({
          // scrub: 0.8 — raise toward 1.5 for a lazier, syrupier reveal
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 45%', scrub: 0.8 },
          defaults: { ease: 'none' }, // scrubbed — easing here fights the scroll
        });
        tl.fromTo(el, { clipPath: 'inset(0 0 12% 0)' }, { clipPath: 'inset(0 0 0% 0)' }, 0);
        tl.fromTo(img, { scale: 1.12 }, { scale: 1 }, 0);
      });

      root.querySelectorAll<HTMLElement>('[data-body-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: 0.15, // holds body copy back until its headline is moving
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          },
        );
      });

      root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        // yPercent range: widen to ±16 for a deeper drift
        gsap.fromTo(
          el,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}
