import { useEffect, type RefObject } from 'react';
import { gsap } from '../lib/gsap';
import { motionOK } from '../lib/motion';

/** Per-card parallax weight; index-matched to the .float-card nodes. */
const DEPTHS = [0.02, 0.045, 0.032];

/**
 * FLOATING MENU CARDS — depth parallax around the hero image.
 * Pointer-only; on touch (or reduced motion) the cards just sit still,
 * which is the intended static look.
 */
export function useFloatCards(heroRef: RefObject<HTMLElement>): void {
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !motionOK() || !window.matchMedia('(pointer: fine)').matches) return;

    const cards = Array.from(hero.querySelectorAll<HTMLElement>('.float-card'));
    if (cards.length === 0) return;

    // quickTo preserves each card's CSS rotation while driving x/y
    const setters = cards.map((card, i) => ({
      x: gsap.quickTo(card, 'x', { duration: 0.6, ease: 'power3' }),
      y: gsap.quickTo(card, 'y', { duration: 0.6, ease: 'power3' }),
      depth: DEPTHS[i] ?? 0.03,
    }));

    const onMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      setters.forEach((s) => {
        s.x(dx * s.depth);
        s.y(dy * s.depth);
      });
    };

    hero.addEventListener('pointermove', onMove);
    return () => {
      hero.removeEventListener('pointermove', onMove);
      gsap.set(cards, { x: 0, y: 0 });
    };
  }, [heroRef]);
}
