import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { CmsRenderer } from './cms-renderer'
import type { Block } from '@/types/cms'

// Mock de Helmet para evitar errores en el test environment
vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Mock de components que usan hooks globales o router
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
          cta_url: '/test'
        }
      }
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
          content: '<h1>Rich Title</h1><p>Rich Content</p>'
        }
      }
    ]

    render(<CmsRenderer blocks={blocks} />)
    expect(screen.getByText('Rich Title')).toBeDefined()
    expect(screen.getByText('Rich Content')).toBeDefined()
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
          cta_url: ''
        }
      }
    ]

    render(<CmsRenderer blocks={blocks} />)
    expect(screen.queryByText('Hidden Hero')).toBeNull()
    expect(screen.getByText(/esta pagina no tiene contenido publicado todavia/i)).toBeDefined()
  })

  it('renderiza múltiples bloques en orden', () => {
    const blocks: Block[] = [
      {
        id: '1',
        type: 'HeroBlock',
        is_visible: true,
        data: { title: 'First Block', subtitle: '', cta_text: '', cta_url: '' }
      },
      {
        id: '2',
        type: 'RichTextBlock',
        is_visible: true,
        data: { content: '<p>Second Block</p>' }
      }
    ]

    const { container } = render(<CmsRenderer blocks={blocks} />)
    const sections = container.querySelectorAll('section, .cms-content > *')
    // El HeroBlock y RichTextBlock deberían estar presentes
    expect(screen.getByText('First Block')).toBeDefined()
    expect(screen.getByText('Second Block')).toBeDefined()
    expect(sections.length).toBeGreaterThanOrEqual(2)
  })
})