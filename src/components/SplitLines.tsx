import { useEffect, useLayoutEffect, useRef, useState, createElement } from 'react';

// useLayoutEffect is a no-op on the server; this silences the SSR warning
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import { gsap } from '../lib/gsap';
import { motionOK, once, HERO_REVEAL } from '../lib/motion';

interface SplitLinesProps {
  text: string;
  as?: 'h1' | 'h2';
  className?: string;
  id?: string;
  /** 'scroll' plays once at top 82%; 'hero' waits for the preloader event. */
  playOn?: 'scroll' | 'hero';
}

/**
 * Splits a headline by LINE (never by character): words are measured after
 * fonts load, grouped by offsetTop, and each line gets an overflow-hidden
 * wrapper. With reduced motion (or no JS) the plain text renders untouched.
 */
export function SplitLines({ text, as = 'h2', className = '', id, playOn = 'scroll' }: SplitLinesProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const played = useRef(false);

  // Measure word positions once fonts are in; regroup on resize.
  useEffect(() => {
    if (!motionOK()) return;
    let cancelled = false;

    const split = () => {
      const el = ref.current;
      if (!el || cancelled) return;
      // Measure in a hidden clone so React-managed DOM is never mutated
      const probe = document.createElement(el.tagName);
      probe.className = el.className;
      probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:${el.clientWidth}px`;
      probe.innerHTML = text
        .split(' ')
        .map((w) => `<span style="display:inline-block">${w}</span>`)
        .join(' ');
      el.parentElement?.appendChild(probe);
      const words = Array.from(probe.children) as HTMLElement[];
      const grouped: string[] = [];
      let top: number | null = null;
      words.forEach((w) => {
        if (w.offsetTop !== top) {
          grouped.push(w.textContent ?? '');
          top = w.offsetTop;
        } else {
          grouped[grouped.length - 1] += ` ${w.textContent}`;
        }
      });
      probe.remove();
      setLines(grouped);
    };

    document.fonts.ready.then(split);

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(split);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [text]);

  // Hide lines before paint, then play (once) from the trigger or hero event.
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || !lines || !motionOK()) return;

    const inners = el.querySelectorAll<HTMLElement>('[data-line]');
    if (played.current) {
      gsap.set(inners, { yPercent: 0 });
      return;
    }
    gsap.set(inners, { yPercent: 105 });

    const vars = {
      yPercent: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.07, // raise toward 0.12 for a slower, heavier cascade
      onComplete: () => {
        played.current = true;
      },
    };

    if (playOn === 'hero') {
      const off = once(HERO_REVEAL, () => gsap.to(inners, vars));
      return off;
    }
    const tween = gsap.to(inners, {
      ...vars,
      scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [lines, playOn]);

  const children =
    lines === null
      ? text
      : lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <span data-line className="block will-change-transform">
              {line}
            </span>
          </span>
        ));

  return createElement(as, { ref, id, className, 'aria-label': text }, children);
}
