import { useEffect, type RefObject } from 'react';
import { gsap } from '../lib/gsap';
import { motionOK } from '../lib/motion';

/**
 * THE FIRE — the only pinned ScrollTrigger in the build.
 * Pins the stage (heading stays put) for 100vh while the three images
 * translate upward through the viewport. Without motion, the section
 * keeps its static stacked layout ([data-motion] never gets set).
 */
export function usePin(stageRef: RefObject<HTMLElement>): void {
  useEffect(() => {
    const stage = stageRef.current;
    if (!motionOK() || !stage) return;

    const section = stage.closest('section');
    section?.setAttribute('data-motion', 'true'); // flips CSS to the absolute layout

    const imgs = stage.querySelectorAll<HTMLElement>('[data-fire-img]');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=85%', // pin length: a bit under one viewport, keeps the page short
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });
      imgs.forEach((img, i) => {
        // first image is already in frame when the pin catches; the rest
        // travel the full 110vh → -130vh, offset 0.26 apart
        tl.fromTo(img, { y: i === 0 ? '38vh' : '110vh' }, { y: '-130vh', ease: 'none' }, i * 0.26);
      });
    }, stage);

    return () => {
      ctx.revert();
      section?.removeAttribute('data-motion');
    };
  }, [stageRef]);
}
