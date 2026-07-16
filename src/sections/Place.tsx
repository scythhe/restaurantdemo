import { useRef } from 'react';
import { CONTENT } from '../config/content';
import { Figure } from '../components/Figure';
import { SplitLines } from '../components/SplitLines';
import { useReveal } from '../hooks/useReveal';

const { place } = CONTENT;

export function Place() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section wrap" aria-labelledby="place-heading">
      <div className="grid gap-y-12 md:grid-cols-12 md:gap-x-[var(--gutter)]">
        <div className="md:col-span-5">
          <p className="eyebrow" data-body-reveal>{place.eyebrow}</p>
          <SplitLines id="place-heading" className="type-h2 mt-4" text={place.heading} />
          <p className="type-body mt-8 max-w-[40ch]" data-body-reveal>
            {place.body}
          </p>
        </div>
        {/* Sits low against the text via parallax offset (yPercent -12 → 12), not margin */}
        <div className="md:col-span-6 md:col-start-7">
          <Figure id="place" className="w-full" data-parallax />
        </div>
      </div>
    </section>
  );
}
