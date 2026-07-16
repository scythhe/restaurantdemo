import { useRef } from 'react';
import { CONTENT } from '../config/content';
import { SplitLines } from '../components/SplitLines';
import { useReveal } from '../hooks/useReveal';

const { voices } = CONTENT;

/** Three pull-quotes, staggered like the menu grid — proof, not decoration. */
export function Voices() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section wrap" aria-labelledby="voices-heading">
      <p className="eyebrow" data-body-reveal>{voices.eyebrow}</p>
      <SplitLines id="voices-heading" className="type-h2 mt-4" text={voices.heading} />

      <div className="mt-[clamp(3rem,8vh,5rem)] grid gap-y-14 md:grid-cols-12 md:gap-x-[var(--gutter)]">
        {voices.reviews.map(({ quote, name }, i) => (
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
            <p className="stars" aria-label="5 out of 5 stars">★★★★★</p>
            <blockquote className="review-quote mt-4">{quote}</blockquote>
            <figcaption className="caption mt-5">{name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
