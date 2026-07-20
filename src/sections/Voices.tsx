import { useRef } from 'react';
import { CONTENT } from '../config/content';
import { MEDIA } from '../config/media';
import { SplitLines } from '../components/SplitLines';
import { useReveal } from '../hooks/useReveal';

const { voices } = CONTENT;

/**
 * Real Google reviews over a faint wash of the cappuccino photo —
 * the room shows through, the quotes stay fully legible.
 */
export function Voices() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section voices-section" aria-labelledby="voices-heading">
      <div className="voices-bg" aria-hidden="true">
        <img src={MEDIA.doubleCappuccino.src} alt="" loading="lazy" decoding="async" />
      </div>

      <div className="wrap relative">
        <p className="eyebrow" data-body-reveal>{voices.eyebrow}</p>
        <SplitLines id="voices-heading" className="type-h2 mt-4" text={voices.heading} />
        <p className="type-body mt-6 max-w-[36ch]" data-body-reveal>
          {voices.line}
        </p>

        <div className="mt-[clamp(3rem,7vh,4.5rem)] grid gap-y-14 md:grid-cols-12 md:gap-x-[var(--gutter)]">
          {voices.reviews.map(({ quote, name, stars }, i) => (
            <figure
              key={name}
              className={`review ${
                i === 0
                  ? 'md:col-span-4'
                  : i === 1
                    ? 'md:col-span-4 md:col-start-6 md:mt-[6vh]'
                    : 'md:col-span-3 md:col-start-10 md:mt-[3vh]'
              }`}
              data-body-reveal
            >
              <p className="stars" aria-label={`${stars} out of 5 stars`}>
                {'★'.repeat(stars)}
              </p>
              <blockquote className="review-quote mt-4">{quote}</blockquote>
              <figcaption className="caption mt-5">{name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
