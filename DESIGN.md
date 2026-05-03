---
name: Escandallo Component System (ECS)
colors:
  surface: '#FDFCFB'
  surface-dim: '#F2F1ED'
  surface-bright: '#FFFFFF'
  surface-container-lowest: '#FFFFFF'
  surface-container-low: '#F8F7F4'
  surface-container: '#F2F1ED'
  surface-container-high: '#E9E8E4'
  surface-container-highest: '#E2E1DD'
  on-surface: '#1A1C1B'
  on-surface-variant: '#444845'
  inverse-surface: '#2E312F'
  inverse-on-surface: '#F1F1F0'
  outline: '#747975'
  outline-variant: '#C4C8C4'
  surface-tint: '#0A2E1F'
  primary: '#0A2E1F'
  on-primary: '#FFFFFF'
  primary-container: '#14412F'
  on-primary-container: '#A7D1C1'
  inverse-primary: '#85B09E'
  secondary: '#D4A017'
  on-secondary: '#FFFFFF'
  secondary-container: '#F0C75E'
  on-secondary-container: '#402D00'
  tertiary: '#2A3B4F'
  on-tertiary: '#FFFFFF'
  tertiary-container: '#3E4E63'
  on-tertiary-container: '#BDC8D9'
  error: '#BA1A1A'
  on-error: '#FFFFFF'
  error-container: '#FFDAD6'
  on-error-container: '#93000A'
  background: '#FDFCFB'
  on-background: '#1A1C1B'
  surface-variant: '#E2E4E1'
typography:
  display-lg:
    fontFamily: Newsreader
    fontSize: 34px
    fontWeight: '600'
    lineHeight: 42px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Manrope
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
    textTransform: uppercase
  tabular-nums:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    fontVariantNumeric: tabular-nums
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  grid_columns: '12'
  gutter: 20px
  margin: 32px
---

## Brand & Style

The design system is rooted in the "Modern Corporate" aesthetic, specifically tailored for the high-stakes environment of culinary back-office management. It prioritizes utility, mathematical precision, and professional trust over consumer-facing "foodie" trends.

The visual language communicates reliability through a rigorous alignment to a structured grid and a restrained use of color. By avoiding the rounded, playful aesthetics of delivery apps, this design system establishes itself as a serious tool for business intelligence and cost optimization. The emotional response is one of calm control amidst the chaotic nature of restaurant operations.

## Colors

The palette is anchored by "Culinary Green," a deep, sophisticated hue that represents profitability and growth. "Warm Amber" is used sparingly for secondary actions and high-priority alerts, providing a clear visual hierarchy without overwhelming the user.

- **Backgrounds**: The system uses a foundational neutral (#F8F9FA) to reduce eye strain during long periods of data entry.
- **Surfaces**: Pure white (#FFFFFF) is reserved for interactive cards and data containers to provide maximum contrast.
- **Borders**: A consistent soft border (#E9ECEF) defines the structure of high-density tables and form groups.
- **Semantic Colors**: Status indicators use desaturated versions of the primary and secondary colors to ensure readability in data-heavy contexts.

## Typography

The typography strategy leverages **Work Sans** for structural elements like headers and page titles to provide a grounded, professional character. **Inter** is utilized for all body text, forms, and data tables due to its exceptional legibility at small sizes and its neutral, utilitarian tone.

For cost-control calculations, the system employs `tabular-nums` settings to ensure that columns of currency and weight figures align perfectly, allowing for rapid scanning of financial discrepancies.

## Layout & Spacing

This design system utilizes a **fixed-fluid hybrid grid**. On large screens, the main content area is capped at a maximum width to maintain readability, while dashboards utilize a 12-column fluid grid for flexible widget placement.

The spacing rhythm is based on a 4px baseline, but defaults to 16px (md) for most component internal margins to balance high information density with necessary white space. Tables utilize "Compact" (8px) and "Default" (12px) vertical padding options to accommodate various user preferences for data density.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Low-Contrast Outlines**. Rather than aggressive shadows, the system uses subtle 1px borders (#E9ECEF) to define the boundaries of information.

- **Level 0 (Base)**: Background (#F8F9FA).
- **Level 1 (Cards)**: White background with a 1px border.
- **Level 2 (Modals/Dropdowns)**: White background with a soft, diffused ambient shadow (Color: #1E4D2B at 0.05 opacity, Blur: 12px, Y-Offset: 4px).

This approach maintains a "flat" professional look while providing enough depth to signify interactivity.

## Shapes

The design system uses a **Soft** (0.25rem) corner radius. This choice strikes a balance between the clinical sharp edges of legacy software and the overly rounded, consumer-focused shapes of modern social apps.

- **Standard Components**: 4px (Buttons, Inputs, Small Cards).
- **Large Containers**: 8px (Main Dashboard Sections).
- **Status Badges**: 2px (to maintain a technical, tag-like appearance).

## Components

### High-Density Tables
Tables are the core of the experience. They must include:
- Zebra striping on hover using #F1F5F9.
- Fixed headers for long ingredient lists.
- Inline editing states that use a subtle Warm Amber focus ring.

### Stats Cards
Dashboards feature cards with a clear "Signal" indicator (a 4px vertical bar on the left edge) colored by status: Green for "Under Budget," Amber for "Review Needed."

### Status Badges
Utilize a "Subtle-Solid" style: a light background tint with dark text.
- **Active**: Background: #DCF2E2, Text: #1E4D2B.
- **Warning**: Background: #FEF3C7, Text: #D97706.

### Multi-Step Forms
For recipe "Escandallos," use a vertical stepper on the left and a progress bar on the top. Each step must validate independently before proceeding, using the Primary Green for completed states and Neutral Gray for upcoming steps.

### Primary Buttons
Solid #1E4D2B with white text. Hover states shift to a slightly darker shade, and the active state uses a 2px offset focus ring in Warm Amber.
