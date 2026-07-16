/**
 * Motion gate + a tiny once-event bus (preloader → hero headline).
 * Every animation in the build checks motionOK() first; when it is false
 * the page simply renders in its final state.
 */

export function motionOK(): boolean {
  return (
    typeof window !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export const HERO_REVEAL = 'terrace:hero-reveal';

const fired = new Set<string>();
const handlers = new Map<string, Array<() => void>>();

export function emit(name: string): void {
  if (fired.has(name)) return;
  fired.add(name);
  (handlers.get(name) ?? []).forEach((cb) => cb());
}

/** Runs cb when `name` fires; runs immediately if it already fired. */
export function once(name: string, cb: () => void): () => void {
  if (fired.has(name)) {
    cb();
    return () => {};
  }
  const list = handlers.get(name) ?? [];
  list.push(cb);
  handlers.set(name, list);
  return () => {
    const l = handlers.get(name);
    if (l) l.splice(l.indexOf(cb), 1);
  };
}
