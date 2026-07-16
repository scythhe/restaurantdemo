import { useRef } from 'react';
import { CONTENT } from '../config/content';
import { Figure } from '../components/Figure';
import { SplitLines } from '../components/SplitLines';
import { usePin } from '../hooks/usePin';
import { useReveal } from '../hooks/useReveal';

const { fire } = CONTENT;

/**
 * The only pinned section. Without JS (or with reduced motion) it renders
 * as a plain stacked column — usePin sets [data-motion] on the section,
 * which switches the CSS to the absolute, pinned layout.
 */
export function Fire() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  usePin(stageRef);
  useReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section fire-band" aria-labelledby="fire-heading" id="fire">
      <div className="wrap">
        <div ref={stageRef} className="fire-stage">
          <div className="fire-heading">
            <SplitLines id="fire-heading" className="type-h2" text={fire.heading} />
            <p className="type-body fire-line mt-6 max-w-[26ch]" data-body-reveal>
              {fire.line}
            </p>
          </div>
          {/* Pinned travel handles these; the standard image reveal stays off */}
          <Figure id="oven" className="fire-img" reveal={false} data-fire-img />
          <Figure id="pizza" className="fire-img" reveal={false} data-fire-img />
          <Figure id="salmon" className="fire-img" reveal={false} data-fire-img />
        </div>
      </div>

      {/* Below the pin: khachapuri, full-bleed */}
      <div className="mt-[clamp(3rem,7vh,5rem)]">
        <Figure id="khachapuri" className="w-full" />
        <p className="wrap type-body mt-6" data-body-reveal>
          {fire.khachapuriLine}
        </p>
      </div>
    </section>
  );
}
