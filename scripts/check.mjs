// Post-build check of _site: internal links and anchors, PL/EN pairs, hidden /code/, no leaked work files.
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { photo, gradeAmount, gradeMix } from '../eleventy.config.js';

const slotSrc = readFileSync('src/assets/js/site.js', 'utf8').match(/function loopSlot\(index, count\) \{[^}]+\}/);
assert.ok(slotSrc, 'loopSlot missing');
const loopSlot = runInNewContext(`${slotSrc[0]}; loopSlot`);
assert.equal(loopSlot(0, 3), 3);
assert.equal(loopSlot(4, 3), 1);
assert.equal(loopSlot(2, 3), 2);

assert.deepEqual(photo('/images/a.webp'), { src: '/images/a.webp', position: '50% 50%' });
assert.deepEqual(photo({ src: '/images/a.webp', x: 140, y: -4 }), { src: '/images/a.webp', position: '100% 0%' });
assert.deepEqual(photo({ src: '/images/a.webp', x: '50%;color:red', y: null }), { src: '/images/a.webp', position: '50% 50%' });

assert.equal(gradeAmount(undefined), 40);
assert.equal(gradeAmount(''), 40);
assert.equal(gradeAmount('nope'), 0);
assert.equal(gradeAmount(150), 100);
assert.equal(gradeMix(0), null);
assert.equal(gradeMix(-10), null);
assert.equal(gradeMix('nope'), null);
const full = gradeMix(100);
const mid = gradeMix(50);
assert.ok(full.saturation < 1 && full.linear[0] < 1 && full.linear[1] > 0);
assert.ok(full.recomb[0][0] > 1 && full.recomb[2][2] < 1);
assert.ok(Math.abs(mid.saturation - (1 + full.saturation) / 2) < 1e-9);
assert.ok(Math.abs(mid.linear[0] - (1 + full.linear[0]) / 2) < 1e-9);
assert.ok(Math.abs(mid.linear[1] - full.linear[1] / 2) < 1e-9);
assert.ok(Math.abs(mid.recomb[0][0] - (1 + full.recomb[0][0]) / 2) < 1e-9);
assert.deepEqual(gradeMix(150).recomb, full.recomb);

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
  if (src.includes('http-equiv="refresh"') || page.startsWith('/admin/')) continue;

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

for (const { from, to } of JSON.parse(readFileSync('src/_data/redirects.json', 'utf8'))) {
  const target = resolve(to);
  if (!resolve(from)) fail(`redirect: missing page ${from}`);
  if (!target) fail(`redirect: ${from} points to missing ${to}`);
  else if (to.includes('#') && !read(target).includes(`id="${to.split('#')[1]}"`)) fail(`redirect: ${from} points to missing anchor ${to}`);
}

const sitemap = read('/sitemap.xml');
for (const [, url] of sitemap.matchAll(/<loc>https:\/\/www\.sketchandscript\.pl([^<]*)<\/loc>/g)) {
  if (!resolve(url)) fail(`sitemap: missing ${url}`);
  if (url.startsWith('/code/') && !site.codingVisible) fail('sitemap: lists hidden /code/');
}

const home = read('/index.html');
const enHome = read('/en/index.html');
const frameCount = html => (html.match(/<figure class="slide[\s"]/g) || []).length;
if (frameCount(home) !== 2) fail(`homepage slideshow: expected 2 frames, got ${frameCount(home)}`);
if (frameCount(enHome) !== 2) fail('en homepage slideshow: expected 2 frames');
const nbsp = '\u00A0';
if (!home.includes('Projekt skrojony do Twoich potrzeb') || !enHome.includes(`A${nbsp}project shaped around what you need`)) fail('homepage: missing package heading');
if (!home.includes(`To, co w${nbsp}Koncepcji, oraz`) || !enHome.includes('Everything in Concept, plus')) fail('homepage: missing package shorthand');
if (!home.includes(`z${nbsp}wizualizacjami`) || home.includes('z wizualizacjami')) fail('homepage: conjunction left at the end of a line');
if (home.includes('Najbardziej opłacalny') || enHome.includes('Best value') || home.includes('Wszystko z pakietu')) fail('homepage: old package wording');
if (home.includes('✓') || enHome.includes('✓')) fail('homepage: package checkmarks');
if (!home.includes('id="glass-bar"') || home.includes('id="glass-chip"')) fail('homepage: missing glass');
const portrait = html => html.match(/class="portrait"[\s\S]*?<\/div>/);
for (const [name, page] of [['homepage', home], ['en homepage', enHome]]) {
  const box = portrait(page);
  if (!box || !box[0].includes('object-position: 50% 50%')) fail(`${name}: portrait is not centered`);
}
if (!home.includes('/images/fav-icon.png')) fail('homepage: missing mark');

for (const leak of ['_working_files', 'node_modules', 'agent-toolkit', '.agents']) {
  if (files.some(f => f.includes(leak))) fail(`leaked into build: ${leak}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`check ok: ${html.length} html files`);
