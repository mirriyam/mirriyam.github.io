# Maryam Ali: two portfolios in one

One page, two portfolios. The **Engineering / Photography** switch swaps the content, colors and photo. English/Arabic (with RTL) and light/dark work in both. Engineering is blue, photography is orange; Education and Hobbies show only in engineering.

## Add your media
- **Portraits:** put your photos in `assets/` and update `PHOTOS` at the top of `script.js` (1 for engineering, 3 for photography; moving the mouse over the photo switches between them).
- **Company / school logos** are in `assets/logos/` (`progresssoft`, `estarta`, `gistec`, `uj`, `amman42`, `josa`); `at-films.png` is still missing. They are shown in black and white automatically; without a file the initials are shown.
- **Graduation project video:** save it as `assets/projects/graduation.mp4` (or change `media` in `script.js`, in both the `en` and `ar` entries). Other projects have no media, only a GitHub link.
- **Gallery photos (photography):** `assets/gallery/walker-in-amman.jpg`, `streets.jpg`, `portraits.jpg`.

## Edit the text
Everything is in `script.js`: `ui` (shared text), `copy.eng` and `copy.photo` (each with `en` and `ar`), `PHOTOS` and `LINKS`.

## Run
Open `index.html`. Fonts (Playfair Display, Inter, Amiri, Tajawal) come from Google Fonts and fall back to system fonts offline.

## Logo
`assets/logo-eng-*.png` (blue diamonds) show on the engineering page and `assets/logo-photo-*.png` (orange diamonds) on the photography page. The `-light` files (black logo) are used in light mode and the `-dark` files (ivory logo) in dark mode, automatically.

## Photography page
Switched off for now: set `PHOTOGRAPHY_PAGE = true` at the top of `script.js` to bring back the Engineering / Photography switch.
