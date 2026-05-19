# Nichetack

A personal commerce CRM — a calm home for everything you've saved across the
web. Save products, articles, videos, screenshots and recipes; move them
through a lifecycle (wishlist → considering → purchased → archived); weigh
them two at a time to learn what your gut actually wants; and get a
budget-aware basket of what to buy.

This is a **desktop-only production prototype**, converted from a vanilla
React + Babel design handoff into a real Next.js App Router project.

## Screens

| Route         | Screen                                                          |
| ------------- | --------------------------------------------------------------- |
| `/gallery`    | Masonry of everything saved, filtered by lifecycle state        |
| `/item/[id]`  | A single item — price history, lifecycle, tags, private note    |
| `/pairwise`   | The comparison game: entry → rounds → ranked results            |
| `/basket`     | A budget-aware "buy these four, archive the rest" recommendation |
| `/capture`    | A browser-extension-style quick-capture popover                 |
| `/creator`    | A public, affiliate-linked curated board                        |

`/` redirects to `/gallery`.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Theme system

Three themes — **Linen**, **Atelier**, and **Olive** — are defined as OKLCH
CSS variable sets in `src/app/globals.css` and exposed to Tailwind as colour
tokens. The active theme lives in a `data-theme` attribute on `<html>`:

- Switch it from the persistent control in the top bar.
- The choice is saved to `localStorage` and re-applied before first paint by a
  small inline script, so there is no flash of the default theme on reload.
- Switching is instant — every surface reads the same CSS variables.

## Notes

- **Desktop only.** There are no responsive breakpoints below ~1024px; mobile
  is a later phase.
- **Imagery is generated, not fetched.** Moodboard visuals are deterministic
  OKLCH gradients seeded per item (`src/lib/art.ts`), so the prototype is
  self-contained and depends on no external image host.
- Data is mock and in-memory (`src/lib/data.ts`). Session-only state — lifecycle
  edits, comparison picks — is intentionally not persisted.

## Structure

```
src/
  app/         routes — one folder per screen, plus layout and globals.css
  components/  shared UI — top bar, theme toggle, tile, icons, sparkline
  lib/         data, theme tokens, gradient art, basket logic
```
