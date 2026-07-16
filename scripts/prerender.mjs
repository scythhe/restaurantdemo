/**
 * Bakes the app's HTML into dist/index.html after the client build, so the
 * page is legible and complete with JavaScript disabled. main.tsx hydrates
 * this markup in the browser.
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const { render } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
);

const indexPath = path.join(root, 'dist', 'index.html');
const template = readFileSync(indexPath, 'utf8');

if (!template.includes('<!--app-html-->')) {
  throw new Error('index.html is missing the <!--app-html--> placeholder');
}

writeFileSync(indexPath, template.replace('<!--app-html-->', render()));
rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });

console.log('prerender: dist/index.html now contains the full static page');
