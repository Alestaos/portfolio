// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://alestaos.com',
  integrations: [sitemap()],

  markdown: {
    // Shiki colours tokens with inline styles, which the CSP below blocks.
    // Prism emits classes instead; the theme lives in global.css.
    syntaxHighlight: 'prism',
  },

  security: {
    // Astro hashes its own inline script/style output and appends the
    // script-src / style-src directives itself. Everything else is declared
    // here. Emitted as a <meta> tag, so frame-ancestors (which meta CSP
    // ignores) lives in the Static Web Apps header instead.
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        // itch.io widgets and privacy-mode YouTube for game trailers.
        'frame-src https://itch.io https://*.itch.io https://www.youtube-nocookie.com',
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
