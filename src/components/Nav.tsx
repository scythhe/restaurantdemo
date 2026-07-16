import { useEffect, useRef } from 'react';
import { CONTENT } from '../config/content';
import { scrollToAnchor } from '../hooks/useLenis';
import { motionOK } from '../lib/motion';

const { brand, nav } = CONTENT;

/**
 * Fixed glass bar with a scroll-progress hairline. With motion it stays out
 * of the way over the hero and slides in once you scroll past it; without
 * JS or with reduced motion it is simply always there (prerendered visible).
 */
export function Nav() {
  const ref = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const bar = barRef.current;
    if (!el) return;

    const hideOverHero = motionOK();
    if (hideOverHero) el.classList.add('nav-hidden');

    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (hideOverHero) {
        el.classList.toggle('nav-hidden', y < window.innerHeight * 0.72);
      }
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      el.classList.remove('nav-hidden');
    };
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToAnchor(href);
  };

  return (
    <nav ref={ref} className="site-nav" aria-label="Main">
      <div className="wrap flex items-center justify-between gap-4 py-3">
        <a
          href="#top"
          onClick={(e) => go(e, '#top')}
          className="font-[family-name:var(--font-marker)] text-2xl font-semibold leading-none text-[var(--ink)]"
        >
          {brand.nameEn}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {nav.links.map(({ label, href }) => (
            <a key={href} href={href} onClick={(e) => go(e, href)} className="nav-link">
              {label}
            </a>
          ))}
        </div>

        <a href="#reserve" onClick={(e) => go(e, '#reserve')} className="btn btn-sm">
          {nav.cta}
        </a>
      </div>
      <div ref={barRef} className="nav-progress" aria-hidden="true" />
    </nav>
  );
}
