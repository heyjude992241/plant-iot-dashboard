# Water Planting System — agent guidance

Read `PROJECT_MEMORY.md` before continuing this project.
This copy lives at the application repository root; workspace layout notes below
refer to the original enclosing Water Planting System workspace. It records the approved
design, implementation status, checks and limitations. Update that file when
meaningful progress or decisions change.

## User-approved direction

- On 29 October 2026 (Asia/Kuala_Lumpur), the user explicitly approved the current
  redesigned Verdant dashboard: “I like this design.” Treat it as the baseline.
- Preserve the borderless neumorphic UI: soft sage/cream surfaces, raised and
  inset shadows, restrained green accents, generous spacing and botanical type.
- The hero must remain a realistic, interactive young lohansung
  (`Podocarpus macrophyllus`), with narrow leaves, woody trunk, irregular branches,
  lighter new growth and subtle motion. Preserve the Three.js implementation.
- Keep the dashboard one page and responsive. Retain temperature, air humidity,
  soil moisture, tank level, battery, Malaysia time and estimated plant hydration.
- Continue locally by default. The latest explicit instructions are to run at
  `http://localhost:3000/`; do not publish this redesign unless requested.
- Keep user-facing updates and final answers concise, without sacrificing the
  implementation or verification needed to finish the request.

## Working location and commands

- The application and its own Git repository are in `dashboard/`. Run application
  commands and inspect application Git status there, not only at workspace root.
- Use Node >=22.13.0. From `dashboard/`: `npm run dev`, `npm run build`.
- Reuse a working localhost server. Check its response before starting another.
  Do not assume an earlier server remains running in a later session.
- `.openai/hosting.json` belongs to the existing Site. Preserve its identity and
  configuration. For relevant work, follow the available Sites skill's local-only
  workflow; no source synchronization or deployment is needed for local work.

## Accuracy and scope

- Readings, schedules and watering are demonstrative. No ESP32, physical sensors
  or pump are connected. Keep the demo labels and do not imply real hardware control.
- Hydration is an illustrative estimate, not a measured plant-health diagnosis.
- Design references are inspiration, not copied assets. Keep their attribution
  accessible in the dashboard's “About & references” dialog.
- Preserve existing user changes. Do not delete the original 3D structure concept,
  deployment archives or unrelated files while working on the dashboard.
- Do not report project-wide type checks as passing: see the existing issues in
  `PROJECT_MEMORY.md`. Verify in proportion to the change and report accurately.
