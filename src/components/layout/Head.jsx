import { useEffect } from 'react';
import { absUrl, DEFAULT_OG, SITE_NAME } from '@/config/seo';

/** Build the <head> tags for a page. Shared by the prerenderer (string) and the client (DOM). */
export function buildHead(seo, pathname) {
  const title = seo.title ? `${seo.title} · ${SITE_NAME}` : `${SITE_NAME} · Digital Product Studio`;
  const canonical = absUrl(pathname);
  const image = absUrl(seo.image || DEFAULT_OG);
  return {
    title,
    meta: [
      ['name', 'description', seo.description],
      ['name', 'robots', seo.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'],
      ['property', 'og:type', seo.type || 'website'],
      ['property', 'og:site_name', SITE_NAME],
      ['property', 'og:title', title],
      ['property', 'og:description', seo.description],
      ['property', 'og:url', canonical],
      ['property', 'og:image', image],
      ['property', 'og:image:width', seo.image ? null : '1200'],
      ['property', 'og:image:height', seo.image ? null : '630'],
      ['property', 'og:image:alt', 'SAYEMANS: digital products, engineered with craft.'],
      ['property', 'og:locale', 'en_US'],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', title],
      ['name', 'twitter:description', seo.description],
      ['name', 'twitter:image', image],
    ],
    canonical,
    jsonLd: seo.jsonLd ?? [],
  };
}

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function headToString(head) {
  return [
    `<title>${esc(head.title)}</title>`,
    ...head.meta.filter(([, , v]) => v).map(([attr, key, v]) => `<meta ${attr}="${key}" content="${esc(v)}" data-seo />`),
    `<link rel="canonical" href="${esc(head.canonical)}" data-seo />`,
    ...head.jsonLd.map((ld) => `<script type="application/ld+json" data-seo>${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`),
  ].join('\n    ');
}

/** Client-side head sync on navigation. */
export default function Head({ seo, pathname }) {
  useEffect(() => {
    const head = buildHead(seo, pathname);
    document.title = head.title;
    document.head.querySelectorAll('[data-seo]').forEach((n) => n.remove());
    const frag = document.createDocumentFragment();
    head.meta.forEach(([attr, key, v]) => {
      if (!v) return;
      const m = document.createElement('meta');
      m.setAttribute(attr, key);
      m.setAttribute('content', v);
      m.dataset.seo = '';
      frag.appendChild(m);
    });
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = head.canonical;
    link.dataset.seo = '';
    frag.appendChild(link);
    head.jsonLd.forEach((ld) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.seo = '';
      s.textContent = JSON.stringify(ld);
      frag.appendChild(s);
    });
    document.head.appendChild(frag);
  }, [seo, pathname]);
  return null;
}
