import { describe, expect, it } from 'vitest'
import {
  GalleryBlockSchema,
  HeroBlockSchema,
  SeoSettingsSchema,
  VisitInfoBlockSchema,
} from '@/features/cms/schemas/cms.schema'

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

  it('accepts valid gallery blocks with local images', () => {
    expect(
      GalleryBlockSchema.safeParse({
        title: 'Galeria',
        intro: 'Recorrido visual.',
        images: [
          { image_url: '/storage/uno.webp', alt: 'Sala', caption: 'Sala principal' },
          { image_url: '/storage/dos.webp', alt: 'Plato', caption: 'Plato firma' },
        ],
      }).success,
    ).toBe(true)
  })

  it('requires absolute map urls for visit info blocks', () => {
    expect(
      VisitInfoBlockSchema.safeParse({
        title: 'Visita',
        intro: 'Informacion util.',
        address: 'Arenal 14',
        phone: '+34 915',
        email: 'hola@test.dev',
        hours: [{ label: 'Martes', value: '13:30' }],
        map_url: '/mapa-local',
        primary_cta_text: 'Reservar',
        primary_cta_url: '/contacto',
      }).success,
    ).toBe(false)
  })

})
