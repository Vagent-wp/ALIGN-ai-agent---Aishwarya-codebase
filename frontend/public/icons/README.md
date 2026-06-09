# Frontend icons

Place PNG icons here for PWA install:

- `icon-192.png` — 192×192
- `icon-512.png` — 512×512

`icon.svg` is used as favicon until PNGs are exported from brand assets.

Generate PNGs from `icon.svg` using any design tool or:

```bash
# Example with ImageMagick (if installed)
convert -background none -resize 192x192 icon.svg icon-192.png
convert -background none -resize 512x512 icon.svg icon-512.png
```
