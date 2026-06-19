# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Archive Content Workflow

Archive content is managed from a CSV source file at [data/archiveVideos.csv](data/archiveVideos.csv).

1. Edit `data/archiveVideos.csv` directly, or paste rows from a Google Sheet export.
2. Run `npm run sync-archive`.
3. The script regenerates `src/data/archiveVideos.js`.
4. Build/run the app as normal.

### Required CSV Columns

- `id` or `title` (id is auto-derived from title if missing)
- `title`
- `year`
- `category` (one field for both category ID and label)
- `youtubeId` or `youtubeUrl`

### Optional CSV Columns

- `duration`
- `notes`
- `isPublic` (`true/false`, defaults to true)

Category colors are generated automatically from a repeating palette, so you only need to enter the category once per row.

New categories are created automatically from your sheet values.

Rows with category `Restricted` are excluded from normal category/year sorting and appear in a bottom vault drawer protected by a PIN gate in the UI.

### Final Categories

- `music-videos` - Music Videos
- `ads` - Ads
- `home-movies` - Home Movies
- `experimental` - Experimental
- `documentary` - Documentary
- `narrative` - Narrative
- `event-films` - Event Films
- `social-cuts` - Social Cuts
- `brand-films` - Brand Films
- `commercials` - Commercials
- `behind-the-scenes` - Behind the Scenes
- `performance` - Performance
- `short-films` - Short Films
- `reels` - Reels
- `promos` - Promos
- `trailers` - Trailers
- `music-content` - Music Content
- `motion-graphics` - Motion Graphics
- `vfx-shots` - VFX Shots
- `archive-footage` - Archive Footage
- `campus-projects` - Campus Projects
- `personal` - Personal
- `art-films` - Art Films
- `spec-work` - Spec Work

### Filter Behavior

This archive no longer uses tags. The checkbox row changes by mode:

- In `Categories` mode, the checkboxes are years.
- In `Years` mode, the checkboxes are categories.
