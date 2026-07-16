import { CONTENT } from '../config/content';

const words = CONTENT.marquee;

/**
 * Slow horizontal ticker between sections. Pure CSS animation over a track
 * holding three copies of the word list (the loop shifts by one third).
 * Under prefers-reduced-motion it stops — still legible, just static.
 * The text is decorative, so it stays out of the accessibility tree.
 */
export function Marquee() {
  return (
    <div className="marquee section" aria-hidden="true">
      <div className="marquee-track">
        {['a', 'b', 'c'].map((copy) =>
          words.map((w, i) => (
            <span key={`${copy}-${i}`} className="marquee-item">
              {w}
              <span className="marquee-dot" />
            </span>
          )),
        )}
      </div>
    </div>
  );
}
