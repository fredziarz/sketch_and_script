// Post-build check of _site: internal links and anchors, PL/EN pairs, hidden /code/, no leaked work files.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = '_site';
const site = JSON.parse(readFileSync('src/_data/site.json', 'utf8'));
const errors = [];
const fail = msg => errors.push(msg);

const walk = dir => readdirSync(dir).flatMap(f => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));
const files = walk(root).map(f => f.slice(root.length));
const html = files.filter(f => f.endsWith('.html'));
const read = f => readFileSync(join(root, f), 'utf8');
const resolve = url => {
  const path = decodeURI(url.split(/[?#]/)[0]);
  const file = path.endsWith('/') ? `${path}index.html` : path;
  return existsSync(join(root, file)) ? file : null;
};

for (const page of html) {
  const src = read(page);
  if (page.startsWith('/code/')) {
    if (!src.includes('name="robots" content="noindex"') && !site.codingVisible) fail(`${page}: missing noindex`);
    continue;
  }
  if (src.includes('http-equiv="refresh"')) continue;

  for (const [, url] of src.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const target = resolve(url);
    if (!target) { fail(`${page}: broken link ${url}`); continue; }
    const hash = url.split('#')[1];
    if (hash && !read(target).includes(`id="${hash}"`)) fail(`${page}: missing anchor ${url}`);
  }
  for (const [, url] of src.matchAll(/srcset="([^"]*)"/g)) {
    for (const part of url.split(',')) if (!resolve(part.trim().split(' ')[0])) fail(`${page}: broken srcset ${part}`);
  }

  const alternates = [...src.matchAll(/hreflang="(pl|en)" href="https:\/\/www\.sketchandscript\.pl([^"]*)"/g)];
  if (alternates.length !== 2) fail(`${page}: expected pl and en hreflang links`);
  for (const [, lang, url] of alternates) if (!resolve(url)) fail(`${page}: hreflang ${lang} points to missing ${url}`);
  if (!site.codingVisible && src.includes('href="/code/')) fail(`${page}: links to hidden /code/`);
}

const sitemap = read('/sitemap.xml');
for (const [, url] of sitemap.matchAll(/<loc>https:\/\/www\.sketchandscript\.pl([^<]*)<\/loc>/g)) {
  if (!resolve(url)) fail(`sitemap: missing ${url}`);
  if (url.startsWith('/code/') && !site.codingVisible) fail('sitemap: lists hidden /code/');
}

for (const leak of ['_working_files', 'node_modules', 'agent-toolkit', '.agents']) {
  if (files.some(f => f.includes(leak))) fail(`leaked into build: ${leak}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`check ok: ${html.length} html files`);
