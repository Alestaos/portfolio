// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://alestaos.com',
  // Canonical URLs, sitemap entries and the Static Web Apps config all agree
  // on no trailing slash, so internal links never cost a 301.
  trailingSlash: 'never',
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
        // Contact form posts to Web3Forms, which emails the message on.
        "form-action 'self' https://api.web3forms.com",
        "object-src 'none'",
      ],
      scriptDirective: {
        // Astro hashes the scripts it generates, but not `is:inline` ones.
        // This is the one-line head script in Base.astro that sets the `js`
        // class. `npm run check:csp` fails the build if it drifts.
        hashes: ['sha256-sa2BD07tH4oO53uT1B5vNSLM2+gcrREM4WTXttKp6oU='],
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
