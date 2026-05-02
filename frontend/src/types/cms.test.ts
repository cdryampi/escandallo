import { describe, expect, it } from 'vitest'
import { createDefaultBlock, normalizeCmsBlocks, normalizeCmsPage } from '@/types/cms'

describe('cms normalizers', () => {
  it('drops unsupported blocks and keeps valid known blocks', () => {
    const blocks = normalizeCmsBlocks([
      {
        id: 'hero-1',
        type: 'HeroBlock',
        is_visible: true,
        data: {
          title: 'Hero title',
        },
      },
      {
        id: 'weird-1',
        type: 'UnknownBlock',
        is_visible: true,
        data: {},
      },
    ])

    expect(blocks).toHaveLength(1)
    expect(blocks[0]?.type).toBe('HeroBlock')
  })

  it('normalizes incomplete menu highlight payloads without crashing', () => {
    const blocks = normalizeCmsBlocks([
      {
        id: 'menu-1',
        type: 'MenuHighlightsBlock',
        is_visible: 'yes',
        data: {
          title: 'Destacados',
          recipe_ids: [1, '2', null, -5, 'foo'],
        },
      },
    ])

    expect(blocks).toEqual([
      {
        id: 'menu-1',
        type: 'MenuHighlightsBlock',
        is_visible: true,
        data: {
          title: 'Destacados',
          recipe_ids: [1, 2],
        },
      },
    ])
  })

  it('falls back to published blocks for public page payloads', () => {
    const page = normalizeCmsPage({
      id: 1,
      slug: 'home',
      name: 'Inicio',
      is_active: true,
      published_version: {
        id: 10,
        page_id: 1,
        status: 'published',
        version_number: 2,
        blocks: [createDefaultBlock('RichTextBlock')],
        created_at: '2026-05-01T10:00:00Z',
        updated_at: '2026-05-01T10:00:00Z',
      },
      created_at: '2026-05-01T10:00:00Z',
      updated_at: '2026-05-01T10:00:00Z',
    })

    expect(page).not.toBeNull()
    expect(page?.published_version?.blocks).toHaveLength(1)
    expect(page?.published_version?.status).toBe('published')
  })
})
