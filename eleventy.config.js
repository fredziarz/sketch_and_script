import { readdirSync, readFileSync } from 'node:fs';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

const langs = ['pl', 'en'];
const homeUrl = lang => (lang === 'pl' ? '/' : '/en/');
const projectUrl = (slug, lang) => (lang === 'pl' ? `/projekty/${slug}/` : `/en/projects/${slug}/`);

const projectsDir = 'src/_data/projects';
const isEmpty = v => v == null || v === '' || (Array.isArray(v) && !v.length);
const filled = o => Object.fromEntries(Object.entries(o || {}).filter(([, v]) => !isEmpty(v)));
const loadProjects = () =>
  readdirSync(projectsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const p = JSON.parse(readFileSync(`${projectsDir}/${f}`, 'utf8'));
      return { slug: f.slice(0, -5), pl: p.pl, en: { ...p.pl, ...filled(p.en) } };
    })
    .sort((a, b) => (a.pl.order ?? 99) - (b.pl.order ?? 99));

const axis = v => {
  if (v == null || v === '') return 50;
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 50;
};
export const photo = value => {
  if (typeof value === 'string') return { src: value, position: '50% 50%' };
  const src = value && typeof value.src === 'string' ? value.src : '';
  return { src, position: `${axis(value && value.x)}% ${axis(value && value.y)}%` };
};

const GRADE = {
  saturation: 0.88,
  linear: [0.94, 10],
  recomb: [
    [1.04, 0.02, 0],
    [0, 0.98, 0],
    [0, 0.02, 0.95],
  ],
};
const clampPercent = value => {
  const n = Number(value);
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 0;
};
export const gradeAmount = value => (value == null || value === '' ? 40 : Math.round(clampPercent(value)));
export const gradeMix = percent => {
  const t = clampPercent(percent) / 100;
  if (t === 0) return null;
  const lerp = (a, b) => a + (b - a) * t;
  const id = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  return {
    saturation: lerp(1, GRADE.saturation),
    linear: [lerp(1, GRADE.linear[0]), lerp(0, GRADE.linear[1])],
    recomb: GRADE.recomb.map((row, y) => row.map((n, x) => lerp(id[y][x], n))),
  };
};

const escapeHtml = s => String(s).replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
const tieWords = (html, words) => {
  const re = new RegExp(`(^|[\\s(])(${words})\\s+`, 'gi');
  const tie = text => text.replace(re, (_, pre, word) => `${pre}${word}\u00A0`);
  return html
    .split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>)/i)
    .map((part, i) => (i % 2 ? part : part.replace(/>([^<]+)</g, (_, text) => `>${tie(text)}<`)))
    .join('');
};
const orphans = html => tieWords(
  html,
  /<html[^>]*\slang="pl"/i.test(html)
    ? 'oraz|albo|lub|ani|niż|że|czy|[aiouwz]'
    : 'and|but|nor|or|a'
);

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/images': 'images', 'src/assets': 'assets', 'src/code': 'code', 'src/admin': 'admin' });
  eleventyConfig.addPassthroughCopy('src/CNAME');
  eleventyConfig.addPassthroughCopy('src/robots.txt');
  eleventyConfig.addPassthroughCopy('src/_headers');
  eleventyConfig.ignores.add('src/code/**');
  eleventyConfig.ignores.add('src/admin/**');
  eleventyConfig.addWatchTarget(projectsDir);

  eleventyConfig.addGlobalData('langs', langs);
  eleventyConfig.addGlobalData('year', new Date().getFullYear());
  eleventyConfig.addGlobalData('projectList', loadProjects);
  eleventyConfig.addGlobalData('projectPages', () =>
    loadProjects().flatMap(p => langs.map(lang => ({ lang, slug: p.slug, project: p[lang] })))
  );

  eleventyConfig.addFilter('homeUrl', homeUrl);
  eleventyConfig.addFilter('projectUrl', projectUrl);
  eleventyConfig.addFilter('otherLang', lang => (lang === 'pl' ? 'en' : 'pl'));
  eleventyConfig.addFilter('slideshow', (projects, lang) =>
    projects.flatMap(p => {
      const pr = p[lang];
      const images = pr.images || [];
      const marked = images.filter(img => img.slideshow);
      return (marked.length ? marked : images.slice(0, 1)).map(img => ({
        slug: p.slug, title: pr.title, location: pr.location, img,
      }));
    })
  );
  eleventyConfig.addFilter('photo', photo);
  eleventyConfig.addFilter('paragraphs', text =>
    String(text || '')
      .split(/\n\s*\n/)
      .filter(p => p.trim())
      .map(p => `<p>${escapeHtml(p.trim())}</p>`)
      .join('\n')
  );

  eleventyConfig.addTransform('orphans', (content, outputPath) =>
    outputPath && outputPath.endsWith('.html') ? orphans(content) : content
  );

  const gradeLevel = gradeAmount(JSON.parse(readFileSync('src/_data/site.json', 'utf8')).photoGrade);
  const grade = gradeMix(gradeLevel);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ['avif', 'webp', 'jpeg'],
    widths: [640, 1280, 1920],
    manualCacheKey: `grade-${gradeLevel}`,
    ...(grade ? { transform: pipeline => pipeline.modulate({ saturation: grade.saturation }).recomb(grade.recomb).linear(...grade.linear) } : {}),
    htmlOptions: {
      imgAttributes: { loading: 'lazy', decoding: 'async', sizes: '100vw' },
    },
  });

  return {
    dir: { input: 'src', output: '_site', includes: '_includes' },
    htmlTemplateEngine: 'njk',
  };
}
