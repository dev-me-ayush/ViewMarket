# DESIGN.md - Design System Specification

## Color Palette
- **Background**: `#F4F5FA` (soft lavender-gray canvas)
- **Foreground / Text Primary**: `#281950` (deep ink violet)
- **Text Muted**: `rgba(40, 25, 80, 0.75)`
- **Accent Purple Primary**: `#6D28D9`
- **Accent Violet**: `#7C3AED`
- **Dark Neutral (Footer / Frameworks)**: `#191034`
- **Accent Gradients**:
  - Purple Button: `linear-gradient(to right bottom, #a02be4, transparent, #4f46e5)`
  - Glass Pod: `linear-gradient(to right bottom, #fffbeb, #fff7ed, #fbcfe8)`
  - Framework Section: `linear-gradient(to right bottom, #a02be4, #7c3aed, #4f46e5)`
- **Status/Icon Tints**:
  - Green: `#10B981` (background `hsla(142, 77%, 73%, 0.5)` to `#6ee7b780`)
  - Blue: `#3B82F6` (background `#7dd3fc80` to `#93c5fd80`)
  - Orange: `#F97316` (background `#fed7aa80` to `#f9731666`)
  - Yellow: `#F59E0B` (background `#fef08abf` to `#fed7aabf`)

## Typography
- **Display / Headings**: `Mackinac Pro` (`--font-mackinac`), serif, weights 500.
- **Body & Controls**: `Bricolage Grotesque` (`--font-bricolage`), weights 400, 500, 600.
- **Scale**:
  - Hero Display: `text-3xl md:text-5xl lg:text-6xl`, tracking tight, leading snug.
  - Section Headings (h2): `text-2xl md:text-3xl lg:text-4xl`, tracking tight.
  - Feature Subheads (h3): `text-[19px]`, tracking tight, font medium/semibold.
  - Body: `text-base md:text-lg`, leading normal.

## Spacing & Rhythm
- Section padding: `py-20 md:py-32`
- Container max-width: `max-w-[1200px]`
- Gaps: `gap-8` to `gap-16`

## Radii & Elevation
- Buttons: `rounded-full` or pill caps
- Cards: `rounded-2xl` / `rounded-3xl`
- Shadows: Multi-stop soft ambient shadows, inset highlight rings (`box-shadow: inset 0 0 0 1px ...`)
