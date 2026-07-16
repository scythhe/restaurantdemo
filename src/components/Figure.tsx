import { forwardRef } from 'react';
import { MEDIA, ratioBox, type MediaKey } from '../config/media';

interface FigureProps extends React.HTMLAttributes<HTMLElement> {
  id: MediaKey;
  /** Hero is the only eager image; everything else lazy-loads. */
  eager?: boolean;
  /** Opt out of the scroll reveal (hero, map, etc.). */
  reveal?: boolean;
}

/**
 * Ratio-locked image. The box is sized purely by MEDIA[id].ratio and a
 * --surface backing, so swapping a src never moves the layout and nothing
 * flashes white while loading.
 */
export const Figure = forwardRef<HTMLElement, FigureProps>(function Figure(
  { id, eager = false, reveal = true, className = '', ...rest },
  ref,
) {
  const { src, alt, ratio } = MEDIA[id];
  const { width, height } = ratioBox(ratio);

  return (
    <figure
      ref={ref}
      data-reveal={reveal ? 'image' : undefined}
      className={`overflow-hidden bg-[var(--surface)] ${className}`}
      style={{ aspectRatio: ratio }}
      {...rest}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        {...(eager ? { fetchpriority: 'high' } : {})}
        className="h-full w-full object-cover object-center"
      />
    </figure>
  );
});
