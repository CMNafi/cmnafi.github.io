# Design System

See Section 3 of PLAN.md for complete aesthetic direction.

## Aesthetic Direction
**Editorial F1 telemetry.** Not the cartoony broadcast graphics. Think the printed race-weekend brief: serious typography, precise numbers, generous space, sparing but decisive color. Carbon-fiber textures used *once* as accent, not wallpaper.

## Rules
- **No Inter. No Space Grotesk. No purple-on-white gradients.** Those are the tells of generic AI output.
- **Monospace everywhere numbers appear** — lap times, dates, versions, coords.
- **Racing red = live only.** Never decorative. Seeing red means something is currently happening.
- **Carbon-fiber texture reserved** for the single garage hero background. Nowhere else.

## Signature Components
Reuse these primitives from `src/components/telemetry/`:
- `<LapTimer />` — the `00:00.000` counter in the nav corner.
- `<SectorBadge variant="p1" />` — the P1/P2/P3 chips.
- `<TelemetryGrid />` — the 4-col data strip (Updated · Status · Stack · Link).
- `<StatusDot state="live | brewing | parked" />` — green/amber/grey dot with subtle pulse on "live."
- `<Flag color="checkered | yellow | red" />` — used in post headers.
