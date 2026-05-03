import { describe, expect, it } from 'vitest'
import { buildPublicThemeVars } from '@/features/public-site/lib/public-theme'

describe('public theme vars', () => {
  it('derives landing css variables from a saved palette', () => {
    const theme = buildPublicThemeVars({
      brand: '#7a2e1f',
      brand_strong: '#4a170f',
      accent: '#c48a2c',
    })

    expect(theme['--ds-color-brand']).toBe('#7a2e1f')
    expect(theme['--ds-color-brand-strong']).toBe('#4a170f')
    expect(theme['--ds-color-accent']).toBe('#c48a2c')
    expect(theme['--ds-color-brand-muted']).toMatch(/^#/)
    expect(theme['--ds-color-accent-soft']).toMatch(/^#/)
  })
})
