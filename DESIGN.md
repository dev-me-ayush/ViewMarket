# DESIGN.md - Design System Specification

## Color Palette (Architectural Dark-First Monochrome)
- **Background (Canvas)**: `#09090B` (deep obsidian black, unified across Landing, Dashboard, Auth, and Legal)
- **Surface / Cards / Containers**: `#121215` (elevated graphite carbon with subtle inset highlight)
- **Elevated Modals / Popovers**: `#18181B` (crisp surface elevation)
- **Foreground / Text Primary**: `#FAFAFA` / `#FFFFFF` (crisp white, AAA contrast 18:1)
- **Text Muted / Secondary**: `#A1A1AA` (neutral zinc 400)
- **Text Subtle / Metadata**: `#71717A` (zinc 500)
- **Borders & Dividers**: `#27272A` (1px architectural stroke) / hover `#3F3F46`
- **Primary Action (Button)**: `#FFFFFF` (solid white button, `#09090B` bold text, `.btn-white`)
- **Secondary Action (Button)**: `#18181B` (graphite fill with `#3F3F46` border, `#FFFFFF` text, `.btn-black`)
- **Glass Surfaces**: `rgba(9, 9, 11, 0.85)` with `backdrop-filter: blur(20px)` and `#27272A` border
- **Selection**: `bg-zinc-800 text-white`

## Data Visualizations & Charts
- **Primary Data Series (Desktop)**: `#FFFFFF` line, gradient fill `opacity: 0.35` to `0.02`
- **Secondary Data Series (Mobile)**: `#A1A1AA` line, gradient fill `opacity: 0.20` to `0.01`
- **Grid Lines & Axes**: `#27272A` / muted zinc labels

## Typography
- **Display / Headings**: `Mackinac Pro` (`--font-mackinac`), serif, weights 500, 600.
- **Body & Controls**: `Bricolage Grotesque` (`--font-bricolage`), weights 400, 500, 600.
- **Scale**:
  - Hero Display: `text-3xl md:text-5xl lg:text-6xl`, tracking tight, leading snug.
  - Section Headings (h2): `text-2xl md:text-3xl lg:text-4xl`, tracking tight.
  - Feature Subheads (h3): `text-xl sm:text-[19px]`, tracking tight, font medium/semibold.
  - Body: `text-base md:text-lg`, leading normal.

## Spacing & Rhythm
- Section padding: `py-20 md:py-32`
- Container max-width: `max-w-[1200px]` (landing) / `max-w-[1536px]` (legal shell)
- Gaps: `gap-8` to `gap-16`

## Radii & Elevation
- Buttons: `rounded-full` or pill caps (`.btn-black`, `.btn-white`)
- Cards: `rounded-2xl` / `rounded-3xl` with crisp 1px borders (`border border-zinc-200`)
- Shadows: Subtle ambient drop shadows (`0 1px 3px rgba(0,0,0,0.04)`)

## Brand Mark & Logo
- **Mark**: "The Hand-Sketched Isometric Knot"
  - Geometry: 3D isometric computational knot in architectural monochrome graphite, with hand-drawn pencil cross-hatching and illuminated facets.
  - Wordmark: "ViewMarket" set in `Mackinac Pro` display serif, 600 weight, solid `#09090B` on light backgrounds; crisp `#FFFFFF` on dark footer/hero surfaces.
  - Assets: `assets/logo-landscape.png`, `assets/logo-landscape-inverted.png`, `assets/viewmarket-icon.png`, `app/icon.png`.
