import { useLayoutEffect, useRef, useState } from 'react';
import { CONTENT } from '../config/content';
import { Figure } from '../components/Figure';
import { SplitLines } from '../components/SplitLines';
import { useReveal } from '../hooks/useReveal';
import { gsap, ScrollTrigger, Flip } from '../lib/gsap';
import { motionOK } from '../lib/motion';
import type { MediaKey } from '../config/media';

const { table } = CONTENT;

/**
 * Asymmetric grid: spans and offsets are deliberate — uneven rows and a
 * deliberate empty cell (desktop col 7 in row one). The explicit col-starts
 * keep every filtered state asymmetric too.
 */
const TILE_CLASS: Record<string, string> = {
  cheesecake: 'col-span-2 md:col-span-6',
  clubSandwich: 'md:col-span-4 md:col-start-8 md:mt-[18vh]',
  pizza: 'md:col-span-4 mt-[8vh] md:mt-0',
  salad: 'md:col-span-3 md:col-start-6 md:mt-[10vh]',
  burger: 'md:col-span-3 md:col-start-10 mt-[6vh] md:mt-[-8vh]',
  khachapuri: 'md:col-span-5 md:col-start-2 md:mt-[4vh]',
  soup: 'md:col-span-3 md:col-start-8 mt-[8vh] md:mt-[14vh]',
  salmon: 'md:col-span-4 md:col-start-4 mt-[6vh] md:mt-[6vh]',
  mojito: 'md:col-span-3 md:col-start-9 md:mt-[-6vh]',
  coffee: 'md:col-span-4 md:col-start-2 mt-[8vh] md:mt-[10vh]',
};

export function Table() {
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [active, setActive] = useState('all');
  useReveal(ref);

  const visibleKeys = (id: string): ReadonlySet<MediaKey> | null => {
    const f = table.filters.find((x) => x.id === id);
    return f?.keys ? new Set(f.keys) : null;
  };

  const applyFilter = (id: string) => {
    if (id === active) return;
    const grid = gridRef.current;
    if (grid && motionOK()) {
      // the scrubbed image reveals fight Flip once tiles start moving:
      // retire them for this grid and pin every image at its final state
      ScrollTrigger.getAll()
        .filter((st) => grid.contains(st.trigger as Element))
        .forEach((st) => st.kill());
      grid.querySelectorAll<HTMLElement>('[data-reveal="image"]').forEach((el) => {
        gsap.set(el, { clipPath: 'inset(0 0 0% 0)' });
        const img = el.querySelector('img');
        if (img) gsap.set(img, { scale: 1 });
      });
      flipState.current = Flip.getState(grid.querySelectorAll('.tile'));
    }
    setActive(id);
  };

  // Tiles physically travel to their new grid positions (never fade-and-reflow)
  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    Flip.from(state, {
      duration: 0.6,
      ease: 'power3.inOut',
      stagger: 0.02, // raise toward 0.05 for a more pronounced ripple
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.4 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.96, duration: 0.3 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [active]);

  const shown = visibleKeys(active);

  return (
    <section ref={ref} className="section wrap" aria-labelledby="table-heading">
      <p className="eyebrow" data-body-reveal>{table.eyebrow}</p>
      <SplitLines id="table-heading" className="type-h2 mt-4" text={table.heading} />
      <p className="type-body mt-8 max-w-[40ch]" data-body-reveal>
        {table.line}
      </p>

      <div className="filter-pills mt-12 flex flex-wrap gap-3" role="group" aria-label="Filter the menu">
        {table.filters.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className="pill"
            aria-pressed={id === active}
            onClick={() => applyFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        ref={gridRef}
        className="mt-[clamp(3rem,8vh,6rem)] grid grid-cols-2 items-start gap-x-[clamp(1rem,2.5vw,3rem)] gap-y-[clamp(3rem,8vh,6rem)] md:grid-cols-12"
      >
        {table.items.map(({ key, name }) => {
          const visible = !shown || shown.has(key);
          return (
            <div
              key={key}
              className={`tile ${TILE_CLASS[key]}`}
              style={visible ? undefined : { display: 'none' }}
            >
              <Figure id={key} className="w-full" />
              <h3 className="type-h3 mt-4">{name}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
