# Cove

**Live: https://krishnanaicker.me/**

Krishna Naicker’s personal portfolio. A quiet ASCII pond, generative artwork, and selected work.

React, TypeScript, Vite, and Framer Motion. No backend or API keys required.

## Development

```sh
npm ci
npm run dev
```

Open http://localhost:5173. Requires Node 22.12 or newer.
`npm run build` type-checks and builds into `dist/`. `npm run preview` serves that build.

Personal content lives in `src/data/portfolio.ts`. Artwork is in `src/components/Ribbon.tsx`.
The signature and intro use Krishna’s original e-sign.

## Publishing

Pushes to `main` deploy automatically to GitHub Pages. Manage the custom domain
in repository Settings → Pages. Relative assets work on both the repository URL and a custom domain.

For Vercel instead: import with the Vite preset, build `npm run build`, output `dist`.

## Credits

The ocean derives from [stackedlol/ascii-sharks](https://github.com/stackedlol/ascii-sharks).
MIT licence retained in `src/ocean/LICENSE` and distributed in `public/third-party-notices.txt`.
