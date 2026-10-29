# Project memory

This copy is stored at the application repository root. Paths prefixed with
`dashboard/` below describe the original enclosing workspace; in a standalone
clone, use the corresponding paths directly from this repository root.
The original physical-structure HTML and deployment archives remain in that
workspace and are not included in this dashboard repository.

Last updated: 29 October 2026, Asia/Kuala_Lumpur.

## Latest decision

The user approved the redesigned dashboard after viewing it and asked to save
the current progress in memory and agent instructions. They subsequently
authorized committing and pushing this progress to GitHub using `heyjude992241`.
Preserve this design as the accepted baseline. This file is persistent
project-local memory, not account-wide ChatGPT memory.

## Goal and background

Build a solar/battery-powered watering and monitoring system for a potted
ornamental plant, because watering is sometimes forgotten for 2–3 days.
The physical concept includes an elevated covered water reservoir, small clear
tubing, a pump and a microcontroller such as ESP32, Arduino or Raspberry Pi Pico.
`water-planting-3d.html` is the earlier physical-structure visualization.

The current software focus is a one-page IoT dashboard for a young lohansung
(`Podocarpus macrophyllus`). Current instructions are local-only development.

## Accepted design and implemented experience

- Verdant branding; soft sage/cream, borderless neumorphic panels and controls.
- Responsive sidebar, garden heading, large botanical hero, sensor cards,
  solar/battery card, moisture history chart and watering card.
- Visible metrics: air temperature 28.4°C, air humidity 72%, soil moisture 64%,
  tank 72%, battery 88%, solar input 1.8 W and estimated hydration 78%.
  These are sample values, not live sensor telemetry.
- Clock uses `Asia/Kuala_Lumpur` and updates every second.
- A procedural Three.js tree replaces the earlier flat CSS leaf shapes. It has
  a textured woody trunk, irregular branches, instanced curved narrow leaves,
  lighter tips, soil, ceramic pot, lighting and cast shadows.
- Tree entrance animation, gentle sway, hover response, mouse drag rotation and
  a rotation toggle. Reduced-motion preference is respected for automatic motion.
- Chart switches between demo 24-hour and 7-day moisture histories.
- Automatic-watering switch changes the displayed demo scheduling mode.
- “Water now” simulates a 3.5-second, 120 ml watering cycle with animated drops;
  on completion, displayed soil moisture becomes 68%, hydration 82%, tank 71%.
  These updates are illustrative; repeated cycles do not model cumulative usage.
- “About & references” explains the demo and links the external references.
- UI state resets on reload. No hardware connection, durable telemetry history,
  backend watering control or real scheduling has been implemented.

## Source map

- `dashboard/app/page.tsx`: dashboard UI, demo state, clock, chart and dialog.
- `dashboard/app/plant-scene.tsx`: Three.js scene, tree geometry and interaction.
- `dashboard/app/globals.css`: approved theme and responsive layouts.
- `dashboard/app/layout.tsx`: metadata, fonts and favicon.
- `dashboard/package.json` and `package-lock.json`: Three.js dependencies and
  local commands; npm scripts were adjusted to run on Windows.
- `dashboard/vite.config.ts`: existing Vinext/Sites/Cloudflare configuration.

## External references used

1. Petr Tejkal, White Energy Dashboard — raised surfaces, restrained palette and
   dashboard hierarchy:
   https://dribbble.com/shots/13155544-White-Energy-Dashboard
2. Nurserylive, young Podocarpus photographs — young plant form and foliage:
   https://nurserylive.com/products/podocarpus-macrophyllus-plant
3. Royal Horticultural Society, Podocarpus macrophyllus — botanical reference:
   https://www.rhs.org.uk/plants/13357/podocarpus-macrophyllus/details

The tree is a procedural interpretation, not a scanned specimen or photograph.

## Verification and runtime status

- Production build passed after the latest scene/layout corrections.
- Strict TypeScript checks scoped to `app/page.tsx` and `app/plant-scene.tsx` passed.
- Browser checks confirmed the 3D tree renders, desktop and mobile layouts work,
  the chart range changes and demo watering updates the displayed values.
- A ResizeObserver loop discovered during visual QA was fixed by making the tree
  container absolute and using `renderer.setSize(width, height, false)`.
- No browser console errors were returned by the subsequent check.
- Localhost returned HTTP 200; the existing server was reused at
  `http://localhost:3000/`. Recheck availability when resuming.
- Full-project `tsc --noEmit` did NOT pass: existing worker/configuration errors
  include missing `cloudflare:workers` declarations, missing `Fetcher` and
  `D1Database` types, and an implicitly typed `filename` in `vite.config.ts`.
- Build has a non-blocking large client bundle warning associated with 3D code.

## Hosting and repository state

An older version is hosted at
https://verdant-water-plant-monitor.mhafizudden3.chatgpt.site/ .
The approved redesign has only been built and served locally; it has not been
deployed to that URL. Preserve `.openai/hosting.json` if deployment is later requested.

The application GitHub repository is
https://github.com/heyjude992241/plant-iot-dashboard . The requested progress
snapshot is being saved on `codex/approved-lohansung-dashboard`. The existing
`main` branch triggers a GitHub Pages deployment on push, so use the progress
branch to preserve local-only delivery. Check `git log` and remote refs for the
current commit/push state; this note is not proof that a push succeeded.

Portable copies of the agent instructions and project memory are included in
the application repository so future checkouts retain the project context.
`vite.config.old.ts` was already untracked before the redesign and is excluded
from this snapshot. Generated `tsconfig.tsbuildinfo` is ignored. The workspace
root has a separate Git context; inspect the nested application repository for
the actual application history. Deployment archives remain workspace-local.

## Continuing work

No further feature work has been requested after design approval. Future changes
should build on the approved look. Hardware integration, persistent telemetry and
deployment remain possible future tasks, not current implementation commitments.
