import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

/**
 * `vite preview` falls back to the root index.html for /pricing, while
 * Cloudflare Pages serves /pricing/index.html. Mirror production so
 * prerendered pages hydrate against their own HTML locally.
 */
const prerenderedPreview = () => ({
  name: 'prerendered-preview',
  configurePreviewServer(server) {
    const dist = path.resolve('dist');
    server.middlewares.use((req, _res, next) => {
      const url = req.url.split('?')[0];
      if (!path.extname(url) && url !== '/') {
        const file = path.join(dist, url, 'index.html');
        if (fs.existsSync(file)) req.url = `${url.replace(/\/$/, '')}/index.html`;
      }
      next();
    });
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderedPreview()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
  },
});
