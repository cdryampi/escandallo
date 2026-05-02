import {
  CmsBlockApiSchema,
  CmsPageSchema,
  PageVersionSchema,
} from '@/features/cms/schemas/cms.schema'
import type {
  CmsBlockValues,
  CmsPageValues,
  PageVersionValues,
  HeroBlockData,
  RichTextBlockData,
  FeatureListBlockData,
  ContactFormBlockData,
  MenuHighlightsBlockData,
} from '@/features/cms/schemas/cms.schema'

export type {
  HeroBlockData,
  RichTextBlockData,
  FeatureListBlockData,
  ContactFormBlockData,
  MenuHighlightsBlockData,
}

export const CMS_BLOCK_TYPES = [
  'HeroBlock',
  'RichTextBlock',
  'FeatureListBlock',
  'ContactFormBlock',
  'MenuHighlightsBlock',
] as const

export type BlockType = (typeof CMS_BLOCK_TYPES)[number]

export type Block = CmsBlockValues
export type PageVersion = PageVersionValues
export type CmsPage = CmsPageValues
export type PageSummary = CmsPage

type MaybeWrapped<T> = { data: T } | T

const unwrapCmsData = <T>(response: MaybeWrapped<T>): T => {
  if (typeof response === 'object' && response !== null && 'data' in response) {
    return response.data
  }

  return response
}

export const createDefaultBlock = (type: BlockType): Block => {
  const id = crypto.randomUUID()

  switch (type) {
    case 'HeroBlock':
      return {
        id,
        type,
        is_visible: true,
        data: {
          title: '',
          subtitle: '',
          image_url: '',
          cta_text: '',
          cta_url: '',
        },
      }
    case 'RichTextBlock':
      return {
        id,
        type,
        is_visible: true,
        data: {
          content: '<p>Nuevo contenido</p>',
        },
      }
    case 'FeatureListBlock':
      return {
        id,
        type,
        is_visible: true,
        data: {
          title: '',
          features: [
            {
              title: '',
              description: '',
              icon: 'Star',
            },
          ],
        },
      }
    case 'ContactFormBlock':
      return {
        id,
        type,
        is_visible: true,
        data: {
          heading: '',
          recipient_email: '',
          success_message: '',
        },
      }
    case 'MenuHighlightsBlock':
      return {
        id,
        type,
        is_visible: true,
        data: {
          title: '',
          recipe_ids: [],
        },
      }
  }
}

export const normalizeCmsBlock = (value: unknown): Block | null => {
  const result = CmsBlockApiSchema.safeParse(value)
  return result.success ? result.data as Block : null
}

export const normalizeCmsBlocks = (value: unknown): Block[] =>
  Array.isArray(value)
    ? value
        .map((v) => CmsBlockApiSchema.safeParse(v))
        .filter((r) => r.success)
        .map((r) => r.data as Block)
    : []

export const normalizePageVersion = (value: unknown): PageVersion | null => {
  const result = PageVersionSchema.safeParse(value)
  return result.success ? result.data : null
}

export const normalizeCmsPage = (value: unknown): CmsPage | null => {
  const result = CmsPageSchema.safeParse(value)
  return result.success ? result.data : null
}

export const normalizePageSummaries = (value: unknown): PageSummary[] => {
  const data = unwrapCmsData<unknown>(value)
  if (!Array.isArray(data)) return []

  return data.map((v) => {
    const result = CmsPageSchema.safeParse(v)
    if (!result.success) {
      return v as PageSummary
    }
    return result.data
  })
}
