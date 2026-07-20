import { useRef, useState } from 'react';
import { CONTENT } from '../config/content';
import { MEDIA } from '../config/media';
import { SplitLines } from '../components/SplitLines';
import { useReveal } from '../hooks/useReveal';

const { reserve, find } = CONTENT;

/**
 * Reservation request form. Demo build: submission is handled client-side
 * and confirmed inline — wire `onSubmit` to a booking API, email service,
 * or WhatsApp deep link for production.
 */
export function Reserve() {
  const ref = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  useReveal(ref);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section ref={ref} className="section reserve-section" aria-labelledby="reserve-heading" id="reserve">
      {/* Full-bleed photo backdrop under an ink gradient */}
      <div className="reserve-bg" aria-hidden="true">
        <img
          src={MEDIA.room.src}
          alt=""
          width={1920}
          height={1081}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="wrap relative">
        <div className="grid gap-y-12 md:grid-cols-12 md:gap-x-[var(--gutter)]">
          <div className="md:col-span-5">
            <p className="eyebrow" data-body-reveal>{reserve.eyebrow}</p>
            <SplitLines id="reserve-heading" className="type-h2 mt-4" text={reserve.heading} />
            <p className="type-body mt-8 max-w-[36ch]" data-body-reveal>
              {reserve.line}
            </p>
            <div className="mt-10" data-body-reveal>
              <a
                href={reserve.wolt.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light"
              >
                {reserve.wolt.label}
              </a>
            </div>
            <p className="type-body mt-8" data-body-reveal>
              {reserve.or}{' '}
              <a href={find.phoneHref} className="phone-link">
                {find.phoneLabel}
              </a>
            </p>
          </div>

          <div className="reserve-card md:col-span-6 md:col-start-7">
            {sent ? (
              <div className="flex min-h-[280px] flex-col justify-center" role="status">
                <p className="type-h2 font-[family-name:var(--font-serif)]">✓</p>
                <p className="type-h3 mt-4 max-w-[28ch]">{reserve.success}</p>
              </div>
            ) : (
              <form className="reserve-form" onSubmit={onSubmit}>
                <div className="field">
                  <label htmlFor="r-name">{reserve.fields.name}</label>
                  <input id="r-name" name="name" type="text" autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="r-phone">{reserve.fields.phone}</label>
                  <input id="r-phone" name="phone" type="tel" autoComplete="tel" required />
                </div>
                <div className="field">
                  <label htmlFor="r-guests">{reserve.fields.guests}</label>
                  <select id="r-guests" name="guests" defaultValue="2">
                    {reserve.guestOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="r-date">{reserve.fields.date}</label>
                    <input id="r-date" name="date" type="date" required />
                  </div>
                  <div className="field">
                    <label htmlFor="r-time">{reserve.fields.time}</label>
                    <input id="r-time" name="time" type="time" defaultValue="19:00" required />
                  </div>
                </div>
                <button type="submit" className="btn mt-2 w-full md:w-auto">
                  {reserve.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
