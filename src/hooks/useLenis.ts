import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { motionOK } from '../lib/motion';

/**
 * One scroll system: GSAP's ticker drives Lenis's raf, and Lenis pushes
 * ScrollTrigger.update() on every scroll. Nothing else may listen to wheel.
 */
export function useLenis(): void {
  useEffect(() => {
    if (!motionOK()) return; // reduced motion: native scroll, no smoothing

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.085, // lower = heavier drift; raise toward 0.12 for a snappier feel
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
