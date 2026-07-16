import { useEffect, useRef } from 'react';
import { CONTENT } from '../config/content';
import { MEDIA, type MediaKey } from '../config/media';
import { Figure } from '../components/Figure';
import { SplitLines } from '../components/SplitLines';
import { useImageTrail } from '../hooks/useImageTrail';
import { useFloatCards } from '../hooks/useFloatCards';
import { gsap } from '../lib/gsap';
import { motionOK, once, HERO_REVEAL } from '../lib/motion';

const { hero, captions } = CONTENT;

/** Trail pool: 8 dishes cycled across 12 recycled cards. */
const TRAIL_KEYS: readonly MediaKey[] = [
  'pizza',
  'cheesecake',
  'mojito',
  'coffee',
  'khachapuri',
  'salmon',
  'burger',
  'clubSandwich',
];
const POOL_SIZE = 12;

/** Floating cards: media key, rotation, anchor classes. Depths live in useFloatCards. */
const FLOAT_CARDS: ReadonlyArray<{ key: MediaKey; rotate: number; className: string }> = [
  { key: 'mojito', rotate: -6, className: 'left-0 top-[16%] -translate-x-1/3' },
  { key: 'cheesecake', rotate: 4, className: 'right-0 top-[4%] translate-x-1/4' },
  { key: 'coffee', rotate: -3, className: 'right-[6%] bottom-[-5%]' },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useImageTrail(ref);
  useFloatCards(ref);

  // Subtitle, line and rating fade in once the preloader hands over.
  useEffect(() => {
    const root = ref.current;
    if (!motionOK() || !root) return;
    const els = root.querySelectorAll<HTMLElement>('[data-hero-fade]');
    gsap.set(els, { opacity: 0, y: 20 });
    return once(HERO_REVEAL, () => {
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.15, // after the headline starts moving
        stagger: 0.08,
      });
    });
  }, []);

  return (
    <header ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <div className="wrap grid min-h-[100svh] content-center items-center gap-y-12 pb-28 pt-16 md:grid-cols-12 md:gap-x-[var(--gutter)] md:pb-24">
        <div className="relative z-10 md:col-span-6">
          <SplitLines as="h1" className="type-wordmark" text={hero.titleEn} playOn="hero" />
          <p className="type-h3 ka mt-4 text-[var(--muted)]" lang="ka" data-hero-fade>
            {hero.titleKa}
          </p>
          <p className="type-body mt-6 max-w-[36ch]" data-hero-fade>
            {hero.line}
          </p>
        </div>

        {/* Framed hero image with the three floating menu cards around it */}
        <div className="relative md:col-span-5 md:col-start-8">
          <Figure id="hero" eager reveal={false} className="w-full" />
          {FLOAT_CARDS.map(({ key, rotate, className }) => (
            <div
              key={key}
              className={`float-card ${className}`}
              style={{ transform: `rotate(${rotate}deg)` }}
            >
              <div className="card-img">
                <img
                  src={MEDIA[key].src}
                  alt={MEDIA[key].alt}
                  width={300}
                  height={400}
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="caption mt-2 block">{captions[key]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row: scroll cue, hint, rating */}
      <div className="wrap absolute inset-x-0 bottom-0 flex items-end justify-between pb-8">
        <div className="scroll-cue" aria-hidden="true" />
        <p className="caption trail-hint" aria-hidden="true">
          {hero.hint}
        </p>
        <p className="caption" data-hero-fade>
          {hero.rating}
        </p>
      </div>

      {/* Image-trail pool: rendered once, recycled by useImageTrail.
          data-src keeps touch devices from ever downloading these. */}
      <div aria-hidden="true">
        {Array.from({ length: POOL_SIZE }, (_, i) => {
          const key = TRAIL_KEYS[i % TRAIL_KEYS.length];
          return (
            <div key={i} className="trail-card">
              <div className="card-img">
                <img data-src={MEDIA[key].src} alt="" width={300} height={400} loading="lazy" />
              </div>
              <span className="caption mt-2 block">{captions[key]}</span>
            </div>
          );
        })}
      </div>
    </header>
  );
}
