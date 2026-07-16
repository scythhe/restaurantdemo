import { useEffect, type RefObject } from 'react';
import { gsap } from '../lib/gsap';
import { motionOK } from '../lib/motion';

/**
 * HERO IMAGE TRAIL — the signature interaction.
 *
 * Mounts only on (pointer: fine) without reduced motion; never on touch.
 * The 12 .trail-card nodes are rendered once in Hero's JSX (pooled), so
 * nothing is created after first paint — this hook only assigns their
 * image src (from data-src, so touch devices never download them) and
 * recycles them modulo 12 as the pointer moves.
 */
export function useImageTrail(heroRef: RefObject<HTMLElement>): void {
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !motionOK() || !window.matchMedia('(pointer: fine)').matches) return;

    const cards = Array.from(hero.querySelectorAll<HTMLElement>('.trail-card'));
    if (cards.length === 0) return;

    // Trail is live on this device: load the pooled images now
    cards.forEach((card) => {
      const img = card.querySelector<HTMLImageElement>('img[data-src]');
      if (img && !img.src) img.src = img.dataset.src ?? '';
    });

    const hint = hero.querySelector<HTMLElement>('.trail-hint');
    if (hint) gsap.set(hint, { opacity: 1 });

    let lastX = 0;
    let lastY = 0;
    let hasLast = false;
    let travelled = 0;
    let index = 0;
    let z = 0;
    let hintGone = false;
    const live = new Map<HTMLElement, gsap.core.Timeline>();

    const SPAWN_DISTANCE = 110; // px of pointer travel per card; raise for a sparser trail

    const onMove = (e: PointerEvent) => {
      if (!hintGone) {
        hintGone = true; // hint leaves permanently on first movement
        if (hint) gsap.to(hint, { opacity: 0, duration: 0.6 });
      }

      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (!hasLast) {
        hasLast = true;
        lastX = x;
        lastY = y;
        return;
      }
      travelled += Math.hypot(x - lastX, y - lastY);
      lastX = x;
      lastY = y;
      if (travelled <= SPAWN_DISTANCE) return;
      travelled = 0;

      const card = cards[index % cards.length];
      index += 1;

      live.get(card)?.kill(); // never let a recycled card fight its old tween

      const tl = gsap
        .timeline()
        .set(card, {
          x,
          y,
          zIndex: ++z,
          opacity: 0,
          scale: 0.5,
          rotate: gsap.utils.random(-14, 14),
          xPercent: -50,
          yPercent: -50,
        })
        .to(card, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' })
        .to(
          card,
          { opacity: 0, scale: 0.86, y: '+=30', duration: 0.5, ease: 'power2.in' },
          '+=0.35', // hold time at full size before the card sinks away
        );
      live.set(card, tl);
    };

    hero.addEventListener('pointermove', onMove);
    return () => {
      hero.removeEventListener('pointermove', onMove);
      live.forEach((tl) => tl.kill());
      gsap.set(cards, { opacity: 0 });
    };
  }, [heroRef]);
}
