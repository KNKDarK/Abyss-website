# Team Abyss

A dark-fantasy collective website featuring immersive web experiences — custom cursor trails, Three.js particle systems, interactive terminal, 3D tilt cards, magnetic buttons, and snap-scroll sections.

## Pages

| Page | Description |
|------|-------------|
| **Home** (`index.html`) | Hero section with glitch title, particle canvas, and CTA buttons |
| **Team** (`team.html`) | Team member cards with 3D tilt, bio text-reveal on scroll |
| **Projects** (`projects.html`) | Snap-scroll project showcase with culture section |
| **Extras** (`extras.html`) | Contact, community, and support links |

## Features

- **Custom cursor** — dynamic trail particles and glow effects
- **Terminal overlay** — toggle with `Ctrl+`` or the button; supports `help`, `echo`, `clear`, and more
- **Loading screen** — animated transition on page load and internal navigation
- **3D tilt cards** — perspective transform on mouse hover (team, projects, extras)
- **Magnetic buttons** — buttons that follow the cursor within a radius
- **Text reveal** — character-by-character animation on scroll
- **Snap scroll** — full-section snapping on the projects page
- **Scroll progress bar** — top-of-page reading indicator
- **Side navigation** — auto-reveals when cursor approaches the left edge

## Tech Stack

- Vanilla HTML / CSS / JS (ES modules)
- [Three.js](https://threejs.org/) — background particle system
- Import maps for dependency loading
- No build step required

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npx serve . -p 8080 --no-clipboard
```

Open `http://localhost:8080` in your browser.

## Testing

Playwright tests cover navigation, interactive features, and the terminal:

```bash
# Run all tests (headless)
npm test

# Run with browser visible
npm run test:headed

# Open Playwright UI mode
npm run test:ui

# View the HTML report
npm run test:report
```

### Test suites

| Suite | Tests | What it covers |
|-------|-------|----------------|
| `navigation.spec.js` | 6 | Page loading, internal nav, ctrl/middle-click handling |
| `features.spec.js` | 21 | Side nav, magnetic buttons, tilt cards, text reveal, cursor trail, snap scroll, progress bar |
| `terminal.spec.js` | 8 | Toggle, close, commands (`help`, `echo`, `clear`), unknown command handling |
