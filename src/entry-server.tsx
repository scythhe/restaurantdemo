import { renderToString } from 'react-dom/server';
import App from './App';

/** Used by scripts/prerender.mjs to bake the full page into dist/index.html. */
export function render(): string {
  return renderToString(<App />);
}
