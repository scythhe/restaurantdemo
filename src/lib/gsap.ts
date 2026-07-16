import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Flip);
  if (import.meta.env.DEV) {
    // debug handles for verifying trigger/pin counts and driving ticks in the console
    (window as unknown as Record<string, unknown>).__ST = ScrollTrigger;
    (window as unknown as Record<string, unknown>).__gsap = gsap;
  }
}

export { gsap, ScrollTrigger, Flip };
