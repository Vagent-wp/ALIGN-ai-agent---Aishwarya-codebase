# Design Reference — UI/UX

Upload images and screenshots here so they can be used as visual reference when updating the ALIGN Network website.

## How to use

1. Add your files to one of the folders below (or create a new subfolder for a specific task).
2. Use clear filenames, for example:
   - `hero-desktop.png`
   - `mobile-nav-open.png`
   - `ellure-homepage-full.png`
   - `align-current-hero.png`
3. In chat, tell the agent which files to look at and what to change.

## Folder structure

```
design-reference/
├── README.md                 ← this file
├── inspiration/              ← reference sites (e.g. Ellure NexHire screenshots)
├── align-current/            ← current ALIGN site screenshots (before/after)
├── align-target/             ← mockups or target designs you want matched
└── assets/                   ← logos, icons, brand exports (optional duplicates)
```

## Supported formats

- PNG, JPG, JPEG, WebP, GIF (screenshots)
- SVG (icons, logos)

## Notes

- Do **not** put secrets or `.env` files here.
- Large files are fine; prefer PNG for UI screenshots.
- Reference sites (e.g. [Ellure NexHire](https://ellurenexhire.vercel.app/)) can be linked in chat **and** saved as screenshots here for pixel-level comparison.

## Example prompt

> Look at `design-reference/inspiration/ellure-hero.png` and update our landing hero to match that layout on mobile and desktop.
