import { z } from 'zod'

const hexColorSchema = z
  .string()
  .trim()
  .regex(/^#(?:[0-9a-fA-F]{6})$/, 'Color HEX invalido')

export const LandingPaletteSchema = z.object({
  brand: hexColorSchema,
  brand_strong: hexColorSchema,
  accent: hexColorSchema,
})

export const SiteStylesSettingsSchema = z.object({
  palette: LandingPaletteSchema,
})

export type LandingPaletteValues = z.infer<typeof LandingPaletteSchema>
export type SiteStylesSettingsValues = z.infer<typeof SiteStylesSettingsSchema>
