# CS2 Playbook · Interactive Edition

A Next.js 15 port of the CS2 Playbook PDF. Three languages (EN/RU/ES),
interactive callouts, tilt test, radar navigation, dev console, easter eggs.

## Stack

- **Next.js 15** (App Router, RSC + client islands)
- **React 19**
- **TypeScript**
- **Tailwind CSS 3**
- **Tone.js** — synthesized sound effects (no audio files to host)
- **lucide-react** — icons
- **i18n** — custom, cookie-based, middleware-driven (`/en`, `/ru`, `/es`)

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000 — middleware redirects to your preferred language.

## Deploy to Vercel

```bash
npx vercel
```

Zero config needed. Everything runs on the edge.

## Routes

| Route                           | Status | Notes                                   |
|---------------------------------|--------|-----------------------------------------|
| `/[lang]`                       | ✅     | Home with radar + terminal              |
| `/[lang]/callouts/mirage`       | ✅     | Interactive callouts + Headshot Quiz    |
| `/[lang]/mental/tilt-test`      | ✅     | 7-question interrogation                |
| `/[lang]/foundations`           | 🚧     | Coming soon                             |
| `/[lang]/mechanics`             | 🚧     | Coming soon                             |
| `/[lang]/training`              | 🚧     | Coming soon                             |
| `/[lang]/tactics`               | 🚧     | Coming soon                             |
| `/[lang]/callouts`              | 🚧     | Map index (6 more maps coming)          |
| `/[lang]/history`               | 🚧     | Timeline 1999→2026                      |

## Easter eggs

- **[~]** or **[`]** — opens the dev console (commands: `help`, `about`, `random`, `sv_cheats 1`, `rush`, `kill`, `clear`, `noclip`, or any zone name)
- **Konami code** (↑↑↓↓←→←→BA) on the home page — triggers a flashbang with a secret unlock line in the terminal
- **Language switcher** top-right — cycles EN → RU → ES, persists via cookie
- **Voice toggle** on tilt test — the coach can actually speak to you via Web Speech API

## Project structure

```
app/
  layout.tsx               # root shell
  page.tsx                 # redirect → /en
  [lang]/
    layout.tsx             # lang validator + scanlines wrapper
    page.tsx               # server wrapper
    HomeClient.tsx         # radar + terminal + cards
    callouts/mirage/
      page.tsx
      CalloutsClient.tsx
    mental/tilt-test/
      page.tsx
      TiltClient.tsx
    <section>/page.tsx     # ComingSoon stubs
components/
  HudBar.tsx               # shared top bar (lang/mute/back)
  ComingSoon.tsx           # placeholder for unbuilt sections
lib/
  i18n.ts                  # EN/RU/ES dictionary, getDict(), types
  synth.ts                 # useSynth() — Tone.js sound hook
  callouts-mirage.ts       # Mirage callout data + geometry helpers
  tilt-data.ts             # questions + diagnoses
middleware.ts              # language detection + redirect
app/globals.css            # fonts, scanlines, shared keyframes
```

## Adding a new language

1. Add the code to `SUPPORTED_LANGS` in `lib/i18n.ts`.
2. Add a full `DICT` entry with translated strings.
3. Add translated question & diagnosis data to `lib/tilt-data.ts` and callout descriptions to `lib/callouts-mirage.ts` if needed.
4. Middleware and the HUD language switcher pick it up automatically.

## Adding a new map

1. Duplicate `lib/callouts-mirage.ts` → `lib/callouts-<map>.ts`. Update polygons and localization.
2. Duplicate `app/[lang]/callouts/mirage/` → `app/[lang]/callouts/<map>/`. Swap the import.
3. Add a link to the map index in `app/[lang]/callouts/page.tsx`.

## Credits

Built by Ilya with Claude. No ads, no tracking, no skill diff.
