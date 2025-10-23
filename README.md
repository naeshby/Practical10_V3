<<<<<<< HEAD
# Naeshby Photography — Practical10_V3
=======
# Naeshby Photography — Practical 10
>>>>>>> 2b15f50540f282b36ca2b15622e999e4e4cd4160

This is a small static portfolio website project for "Naeshby Photography". It's structured as a simple React-enabled static site (using in-browser Babel for development) and uses Bootstrap for layout and styling. The project showcases a hero header with an overlay navigation bar that transitions to a compact, solid navbar after you scroll past the hero.

## Project purpose

- Demonstrate a responsive photography portfolio layout.
- Show how to implement a hero header where the navbar overlays the hero and then changes style after scrolling.
- Provide modular React components (for sections) that are loaded with in-browser Babel for rapid prototyping.

## Project structure

- `index.html` — Main HTML entry. Contains the navigation, the hero header, the main container for React components, footer, and the small inline script that toggles the navbar state on scroll.
- `components/` — React components used by the page (loaded via `<script type="text/babel">`):
  - `HomePage.jsx` — Home/landing content (may be used by `index.html` via React mounting in `scripts/app.js`).
  - `GalleryPage.jsx` — Gallery component (renders the photo grid).
  - `ServicesPage.jsx` — Services and pricing content.
  - `ContactPage.jsx` — Contact form / contact information.
  - `img/` — Images used by components (header, portraits, events, etc.).
- `data/` — JSON data used by components (e.g., `services.json`).
- `img/` — Additional images used across the site.
- `scripts/` — Site JavaScript:
  - `api.js` — small helper(s) to fetch `data/*.json` or mock API calls.
  - `app.js` — React mounting and app-level behavior.
- `styles/` — CSS styles:
  - `main.css` — Custom styling including hero, navbar transitions, gallery, cards, and responsive rules.

## Key features

- Hero header with large image and overlay text.
- Transparent navbar overlay while hero is visible; transitions to a compact, solid navbar once the hero is scrolled out of view.
- React components (Babel in browser) for modular sections: gallery, services, contact, etc.
- Responsive design using Bootstrap 5 + custom CSS grid for the gallery.
- Accessible markup for primary navigation; the script only toggles presentation classes.

## How the hero-to-navbar behavior works

- The hero header is implemented as a `header` element with the `.hero-section` class in `index.html`.
- The navbar uses `.navbar-hero` (instead of a static background). On page load the navbar is transparent and overlays the hero.
- An inline script in `index.html` calculates the hero's bounding box on scroll/resize and toggles the `.navbar-scrolled` class on the navbar.
- CSS in `styles/main.css` changes background color, padding, and box-shadow when `.navbar-scrolled` is present to make the navbar compact and solid.

## Local development / preview

This is a static site; you can open `index.html` directly in a browser for a quick preview. For a more realistic local environment (recommended), run a simple static server so that fetch/XHR (if used) works correctly:

Using Python (if installed):

```powershell
# from the Practical10_V3 folder
python -m http.server 8000
# open http://localhost:8000
```

Using Node.js `http-server` (if installed):

```powershell
# from the Practical10_V3 folder
npx http-server -p 8000
# open http://localhost:8000
```

## Customization tips

- Replace `components/img/header.jpg` with your preferred hero image. CSS uses an overlay gradient; adjust `styles/main.css` `.hero-section` background if needed.
- To adjust when the navbar switches state, modify the inline script's logic in `index.html` (the script uses `hero.getBoundingClientRect().bottom <= 0` as the trigger). You can change this to a pixel threshold or percentage.
- If you prefer externalizing the small inline script, move it into `scripts/app.js` or a new `scripts/ui.js` and ensure it runs after DOM load.
- The project currently uses in-browser Babel for quick prototyping. For production, transpile the JSX ahead of time and include plain JS bundles instead of `type="text/babel"` scripts.

## Known considerations

- In-browser Babel is convenient for learning/prototyping but not suitable for production due to performance and caching reasons.
- Ensure image paths in `styles/main.css` and `components` are correct relative to the file locations; if you move files, update the paths.

## Contributions

If you want new features (e.g., lightbox for gallery images, contact form submissions, or pagination), open an issue or submit a PR with a short description of the desired change.

## License

This repository doesn't include a formal license file. Add one if you plan to share this project publicly or collaborate.

4 Naeshby Photography
