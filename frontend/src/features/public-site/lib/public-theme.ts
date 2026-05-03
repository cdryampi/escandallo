import type { CSSProperties } from 'react'
import type { LandingPaletteConfig } from '@/features/public-site/types/landing.types'

type ThemeVars = CSSProperties & Record<`--${string}`, string>

const DEFAULT_PALETTE: LandingPaletteConfig = {
  brand: '#6b3f2a',
  brand_strong: '#211512',
  accent: '#c4a06c',
}

const clamp = (value: number) => Math.min(255, Math.max(0, Math.round(value)))

const hexToRgb = (hex: string) => {
  const normalized = hex.replace('#', '')

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  }
}

const rgbToHex = ({ r, g, b }: { r: number; g: number; b: number }) =>
  `#${[r, g, b].map((channel) => clamp(channel).toString(16).padStart(2, '0')).join('')}`

const mixHex = (base: string, target: string, ratio: number) => {
  const from = hexToRgb(base)
  const to = hexToRgb(target)

  return rgbToHex({
    r: from.r + (to.r - from.r) * ratio,
    g: from.g + (to.g - from.g) * ratio,
    b: from.b + (to.b - from.b) * ratio,
  })
}

const getContrastText = (hex: string) => {
  const { r, g, b } = hexToRgb(hex)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

  return luminance > 0.62 ? '#191c1d' : '#ffffff'
}

export const buildPublicThemeVars = (palette?: Partial<LandingPaletteConfig> | null): ThemeVars => {
  const resolved = {
    ...DEFAULT_PALETTE,
    ...palette,
  }

  return {
    '--ds-color-brand': resolved.brand,
    '--ds-color-brand-strong': resolved.brand_strong,
    '--ds-color-brand-foreground': getContrastText(resolved.brand),
    '--ds-color-brand-muted': mixHex(resolved.brand, '#ffffff', 0.72),
    '--ds-color-accent': resolved.accent,
    '--ds-color-accent-soft': mixHex(resolved.accent, '#ffffff', 0.8),
    '--ds-color-accent-foreground': mixHex(resolved.accent, '#191c1d', 0.28),
    '--ds-color-success': resolved.brand,
    '--ds-color-success-foreground': mixHex(resolved.brand, '#191c1d', 0.18),
    '--ds-color-success-soft': mixHex(resolved.brand, '#ffffff', 0.84),
  }
}

export { DEFAULT_PALETTE }
