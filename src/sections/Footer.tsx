import { CONTENT } from '../config/content';

const { brand, footer, find } = CONTENT;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap grid gap-y-12 py-[clamp(3rem,8vh,6rem)] md:grid-cols-12 md:gap-x-[var(--gutter)]">
        <div className="md:col-span-5">
          <p className="font-[family-name:var(--font-marker)] text-4xl font-semibold text-[var(--ink)]">
            {brand.nameEn}
          </p>
          <p className="ka mt-1 text-[var(--muted)]" lang="ka">
            {brand.nameKa}
          </p>
          <p className="type-body mt-6 max-w-[34ch]">{footer.blurb}</p>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <p className="eyebrow">{footer.hoursTitle}</p>
          <ul className="mt-5 space-y-3">
            {footer.hours.map(({ days, time }) => (
              <li key={days} className="text-sm leading-relaxed">
                <span className="block text-[var(--muted)]">{days}</span>
                <span className="text-[var(--ink)]">{time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 md:col-start-10">
          <p className="eyebrow">{footer.visitTitle}</p>
          <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">{find.address}</p>
          <a href={find.phoneHref} className="mt-3 inline-block text-sm text-[var(--ink)] underline decoration-1 underline-offset-4 decoration-[var(--muted)]">
            {find.phoneLabel}
          </a>
          <p className="eyebrow mt-8">{footer.followTitle}</p>
          <div className="mt-5 flex gap-6">
            {find.socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--ink)] underline decoration-1 underline-offset-4 decoration-[var(--muted)]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap flex flex-col gap-2 border-t border-[var(--surface)] py-6 text-xs text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <p>{footer.note}</p>
        <p>
          {footer.credit.label} ·{' '}
          <a href={footer.credit.href} className="underline underline-offset-4">
            {footer.credit.phone}
          </a>
        </p>
      </div>
    </footer>
  );
}
