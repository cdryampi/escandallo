import { describe, expect, it } from 'vitest'
import { LandingPaletteSchema } from '@/features/settings/schemas/settings.schema'

describe('settings schemas', () => {
  it('accepts valid landing palette hex colors', () => {
    expect(
      LandingPaletteSchema.safeParse({
        brand: '#7a2e1f',
        brand_strong: '#4a170f',
        accent: '#c48a2c',
      }).success,
    ).toBe(true)
  })

  it('rejects invalid landing palette colors', () => {
    expect(
      LandingPaletteSchema.safeParse({
        brand: 'verde',
        brand_strong: '#4a170f',
        accent: '#c48a2c',
      }).success,
    ).toBe(false)
  })
})
