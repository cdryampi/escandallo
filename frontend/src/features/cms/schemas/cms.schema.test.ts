import { describe, expect, it } from 'vitest'
import { HeroBlockSchema, SeoSettingsSchema } from '@/features/cms/schemas/cms.schema'

describe('cms schemas', () => {
  it('accepts local storage paths for CMS images', () => {
    expect(
      SeoSettingsSchema.safeParse({
        meta_image_url: '/storage/images/cms/hero-home.webp',
      }).success,
    ).toBe(true)
  })

  it('accepts local paths for CTA links', () => {
    expect(
      HeroBlockSchema.safeParse({
        title: 'Inicio',
        cta_text: 'Ver carta',
        cta_url: '/carta',
      }).success,
    ).toBe(true)
  })
})
