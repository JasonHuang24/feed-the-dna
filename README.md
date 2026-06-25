# Feed The DNA

Static website for the **Empower Humanity / Feed The DNA / DNActivate** ecosystem — a human-first community infrastructure platform based in Idaho.

- **Empower Humanity** — the movement
- **Feed The DNA** — the infrastructure (this site)
- **DNActivate** — the media / podcast arm

## Pages

`index.html` (home) · `about.html` · `projects.html` · `partner.html` · `dnactivate.html` · `contact.html`

## Stack

Hand-coded static HTML/CSS/JS — no build step.

- `css/styles.css` — single design system. Cosmic violet theme; the DNActivate page flips to a blue/orange palette via `body.page-dna`.
- `js/main.js` — mobile nav, scroll reveal, footer year.
- `assets/images/` — banner heroes + brand badges (see `assets/images/README.txt` for the drop-in convention).
- `assets/flower-of-life.svg` — sacred-geometry background motif.

## Run locally

Serve the folder over HTTP (relative paths + fonts need a server, not `file://`):

```
python -m http.server 8770
```

Then open <http://localhost:8770>.

## Deploy

Any static host (Netlify, Cloudflare Pages, GitHub Pages) — gives free HTTPS. All asset filenames are lowercase for case-sensitive hosts.
