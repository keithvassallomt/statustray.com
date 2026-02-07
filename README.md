# statustray.com

Landing page and documentation site for [Status Tray](https://extensions.gnome.org/extension/9164/status-tray/), a GNOME Shell extension that brings back the system tray with native StatusNotifierItem support.

The landing page is built with **Svelte** and **Tailwind CSS**, bundled by **Vite**. The documentation site is built with **VitePress**.

## Prerequisites

- Node.js 22+

## Setup

```sh
npm ci
```

## Scripts

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `npm run dev` | Start the Vite dev server for the landing page. Automatically fetches extension data from GNOME Extensions before starting. |
| `build` | `npm run build` | Build the landing page for production into `dist/`. Automatically fetches extension data before building. |
| `preview` | `npm run preview` | Preview the production landing page build locally. |
| `docs:dev` | `npm run docs:dev` | Start the VitePress dev server for the documentation site. |
| `docs:build` | `npm run docs:build` | Build the documentation site for production into `docs/.vitepress/dist/`. |
| `docs:preview` | `npm run docs:preview` | Preview the production docs build locally. |

The `dev` and `build` scripts run a `predev`/`prebuild` hook (`scripts/fetch-ego.js`) that fetches the latest extension metadata (supported GNOME Shell versions, latest release version) from extensions.gnome.org and writes it to `src/data/ego.json`.

## Deployment

Deployment is handled by AWS CodeBuild (see `buildspec.yml`). It builds both the landing page and docs, then syncs them to separate S3 buckets and optionally invalidates CloudFront distributions:

- Landing page &rarr; `statustray.com`
- Documentation &rarr; `docs.statustray.com`

## License

[MIT](LICENSE)
