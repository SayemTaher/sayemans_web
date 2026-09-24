// Static prerender (SSG) for SEO: renders every route to HTML at build time,
// writes dist/<route>/index.html, a 404.html and sitemap.xml.
// Cloudflare Pages serves these directly; React hydrates on the client.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const entry = fs.readdirSync(ssrDir).find((f) => /^entry-server\.(m?js)$/.test(f));
const { render, prerenderPaths, sitemapEntries } = await import(pathToFileURL(path.join(ssrDir, entry)).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const siteUrl = (process.env.VITE_SITE_URL || 'https://sayemans.org').replace(/\/$/, '');

const write = (file, html) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};

const page = async (url) => {
  const { html, head } = await render(url);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
};

const paths = [...prerenderPaths(), '/admin'];
let ok = 0;
for (const url of paths) {
  const out = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url, 'index.html');
  write(out, await page(url));
  ok++;
}
write(path.join(dist, '404.html'), await page('/__not-found__'));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries()
  .map(
    (e) => `  <url><loc>${siteUrl}${e.path === '/' ? '/' : e.path}</loc><lastmod>${today}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority.toFixed(1)}</priority></url>`,
  )
  .join('\n')}
</urlset>
`;
write(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8').replace(/Sitemap: .*/, `Sitemap: ${siteUrl}/sitemap.xml`));

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`✓ Prerendered ${ok} pages + 404.html + sitemap.xml`);
