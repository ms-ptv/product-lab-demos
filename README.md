# product-lab-demos

Public, curated showcase of prototypes from the private `product-lab`. Served via GitHub Pages:
https://ms-ptv.github.io/product-lab-demos/

Everything in this repo is public. Only add what is meant to be shown.

## Demos

| Demo | Folder | Link |
|------|--------|------|
| Route visualization, Hamburg U4 | `map-route-visualization/` | https://ms-ptv.github.io/product-lab-demos/map-route-visualization/?t=3:00&pause |
| Network timeline and lenses, Hamburg: 16 lines of 4 transport systems (passenger counts simulated) | `map-creation/` | https://ms-ptv.github.io/product-lab-demos/map-creation/?t=8:00 |

## Shared data

`data/hamburg-data.js` is the one Hamburg data file for the demos: the 3D layers of the U4 corridor, 16 lines of a PTV Visum model (metro, rail, ferry, bus) with their timetables, and a `legacy` block (the original U4 stops and area) for the older single-line demo. Both `map-creation/` and `map-route-visualization/` load it from `../data/`. It is built by `tools/build_demo_data.py` in the private `product-lab`.

## Adding a demo

1. Create a folder at the repo root, named `<area>-<topic>` (e.g. `timeline-rhythms`).
2. Put the demo in it, with an `index.html` as entry point. It must run as plain static files (no server, no build step).
3. Copy the card block in the root `index.html` (between `DEMO CARD` comments) and adjust title, text, tags, link.
4. Add a row to the table above.
5. Check locally: `python3 -m http.server 8000`, then open <http://localhost:8000/>.
6. Commit and push to `main`. Pages updates in about a minute.

## Before publishing, check

- No internal names, customer data, credentials or confidential ideas in code, data or comments.
- Third-party data is credited (e.g. OpenStreetMap, ODbL).
- Libraries come from a CDN with a pinned version, or are included in the folder.

## Housekeeping

- `index.html` and `robots.txt` ask search engines not to index the site. The pages are still reachable by anyone with the link.
- `.nojekyll` makes Pages serve files as they are.
- Removing a demo: delete its folder and its card, push. Old commits stay in the Git history, so anything sensitive needs a history rewrite, not just a delete.
