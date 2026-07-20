import { useEffect, useRef, useState } from 'react';
import { CONTENT } from '../config/content';
import { SplitLines } from '../components/SplitLines';
import { useReveal } from '../hooks/useReveal';

const { find } = CONTENT;

/**
 * Live open/closed status. Computed client-side only (starts null), so the
 * prerendered HTML stays time-independent and shows the static hours line.
 */
function useOpenNow(): { open: boolean; closeHour: number } | null {
  const [state, setState] = useState<{ open: boolean; closeHour: number } | null>(null);
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const closeHour = find.closeHours[now.getDay()];
      setState({ open: now.getHours() >= find.openHour && now.getHours() < closeHour, closeHour });
    };
    check();
    const t = setInterval(check, 60_000);
    return () => clearInterval(t);
  }, []);
  return state;
}

export function Find() {
  const ref = useRef<HTMLElement>(null);
  const status = useOpenNow();
  useReveal(ref);

  return (
    <section
      ref={ref}
      className="section wrap pb-[clamp(4rem,10vh,8rem)]"
      aria-labelledby="find-heading"
      id="find"
    >
      <p className="eyebrow" data-body-reveal>{find.eyebrow}</p>
      <SplitLines id="find-heading" className="type-h2 mt-4" text={find.heading} />

      <div className="mt-12 grid gap-y-12 md:grid-cols-12 md:gap-x-[var(--gutter)]">
        <div className="md:col-span-5">
          {/* Phone: the largest interactive element on the page, one-thumb reachable */}
          <a
            href={find.phoneHref}
            className="inline-block py-3 font-[family-name:var(--font-serif)] text-[clamp(2.25rem,7vw,4rem)] leading-tight tracking-[-0.02em] underline decoration-1 underline-offset-8 decoration-[var(--muted)]"
          >
            {find.phoneLabel}
          </a>

          <p className="type-body mt-8 max-w-[32ch]">{find.address}</p>
          <p className="mt-4 flex items-center gap-2.5 text-[var(--ink)]">
            {status !== null && (
              <span className={`open-dot ${status.open ? 'is-open' : ''}`} aria-hidden="true" />
            )}
            {status === null
              ? find.hours
              : status.open
                ? `Open now · until ${status.closeHour === 24 ? '00' : status.closeHour}:00`
                : `Closed · opens at ${find.openHour}:00`}
          </p>
          <p className="type-body mt-2">{find.services.join(' · ')}</p>
          <p className="caption mt-6">{find.note}</p>

          <div className="mt-10 flex gap-8">
            {find.socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="type-h3 inline-flex min-h-12 items-center underline decoration-1 underline-offset-8 decoration-[var(--muted)]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <div
            className="relative overflow-hidden bg-[var(--surface)]"
            style={{ aspectRatio: '4/3' }}
          >
            {/* Fallback stays visible wherever the embed is blocked */}
            <div className="absolute inset-0 flex flex-col items-start justify-end gap-2 p-6">
              <p className="type-body max-w-[24ch]">{find.address}</p>
              <a
                href={find.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center text-[var(--ink)] underline decoration-1 underline-offset-8 decoration-[var(--muted)]"
              >
                Open in Google Maps
              </a>
            </div>
            <iframe
              title={`Map: ${find.address}`}
              src={find.mapEmbed}
              className="map-mute absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
