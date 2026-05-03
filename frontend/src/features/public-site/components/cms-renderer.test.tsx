import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CmsRenderer } from './cms-renderer'
import type { Block } from '@/types/cms'

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}))

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
}))

describe('CmsRenderer', () => {
  it('renderiza mensaje cuando no hay bloques visibles', () => {
    render(<CmsRenderer blocks={[]} />)
    expect(screen.getByText(/esta pagina no tiene contenido publicado todavia/i)).toBeDefined()
  })

  it('renderiza HeroBlock correctamente', () => {
    const blocks: Block[] = [
      {
        id: '1',
        type: 'HeroBlock',
        is_visible: true,
        data: {
          title: 'Hero Title',
          subtitle: 'Hero Subtitle',
          cta_text: 'Click Me',
          cta_url: '/test',
        },
      },
    ]

    render(<CmsRenderer blocks={blocks} />)
    expect(screen.getByText('Hero Title')).toBeDefined()
    expect(screen.getByText('Hero Subtitle')).toBeDefined()
    expect(screen.getByText('Click Me')).toBeDefined()
  })

  it('renderiza RichTextBlock correctamente', () => {
    const blocks: Block[] = [
      {
        id: '2',
        type: 'RichTextBlock',
        is_visible: true,
        data: {
          content: '<h1>Rich Title</h1><p>Rich Content</p>',
        },
      },
    ]

    render(<CmsRenderer blocks={blocks} />)
    expect(screen.getByText('Rich Title')).toBeDefined()
    expect(screen.getByText('Rich Content')).toBeDefined()
  })

  it('renderiza los nuevos bloques de landing de restaurante', () => {
    const blocks: Block[] = [
      {
        id: 'gallery',
        type: 'GalleryBlock',
        is_visible: true,
        data: {
          title: 'La casa',
          intro: 'Sala y producto.',
          images: [
            { image_url: '', alt: 'Sala principal', caption: 'Sala principal' },
            { image_url: '', alt: 'Plato firma', caption: 'Plato firma' },
          ],
        },
      },
      {
        id: 'testimonials',
        type: 'TestimonialsBlock',
        is_visible: true,
        data: {
          title: 'Testimonios',
          intro: 'Lo que se comenta.',
          testimonials: [
            { quote: 'Volveremos.', author: 'Ana', source: 'Google' },
            { quote: 'Magnifico servicio.', author: 'Luis', source: 'Tripadvisor' },
          ],
        },
      },
      {
        id: 'visit',
        type: 'VisitInfoBlock',
        is_visible: true,
        data: {
          title: 'Como visitarnos',
          intro: 'Toda la informacion util.',
          address: 'Arenal 14',
          phone: '+34 915',
          email: 'info@test.dev',
          hours: [{ label: 'Martes', value: '13:30' }],
          map_url: 'https://maps.google.com/example',
          primary_cta_text: 'Reservar',
          primary_cta_url: '/contacto',
        },
      },
      {
        id: 'cta',
        type: 'ReservationCtaBlock',
        is_visible: true,
        data: {
          eyebrow: 'Reservas',
          title: 'Una mesa a tu medida',
          body: 'Reserva o consulta eventos privados.',
          primary_cta_text: 'Reservar mesa',
          primary_cta_url: '/contacto',
          secondary_cta_text: 'Ver carta',
          secondary_cta_url: '/carta',
          background_image_url: '',
        },
      },
    ]

    render(<CmsRenderer blocks={blocks} />)
    expect(screen.getByText('La casa')).toBeDefined()
    expect(screen.getByText('Testimonios')).toBeDefined()
    expect(screen.getByText('Como visitarnos')).toBeDefined()
    expect(screen.getByText('Una mesa a tu medida')).toBeDefined()
  })

  it('no renderiza bloques con is_visible: false', () => {
    const blocks: Block[] = [
      {
        id: '3',
        type: 'HeroBlock',
        is_visible: false,
        data: {
          title: 'Hidden Hero',
          subtitle: '',
          cta_text: '',
          cta_url: '',
        },
      },
    ]

    render(<CmsRenderer blocks={blocks} />)
    expect(screen.queryByText('Hidden Hero')).toBeNull()
    expect(screen.getByText(/esta pagina no tiene contenido publicado todavia/i)).toBeDefined()
  })

  it('renderiza multiples bloques en orden', () => {
    const blocks: Block[] = [
      {
        id: '1',
        type: 'HeroBlock',
        is_visible: true,
        data: { title: 'First Block', subtitle: '', cta_text: '', cta_url: '' },
      },
      {
        id: '2',
        type: 'RichTextBlock',
        is_visible: true,
        data: { content: '<p>Second Block</p>' },
      },
    ]

    const { container } = render(<CmsRenderer blocks={blocks} />)
    const sections = container.querySelectorAll('section, .cms-content > *')
    expect(screen.getByText('First Block')).toBeDefined()
    expect(screen.getByText('Second Block')).toBeDefined()
    expect(sections.length).toBeGreaterThanOrEqual(2)
  })
})
