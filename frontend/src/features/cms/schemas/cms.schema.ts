import { z } from 'zod'

const isAbsoluteUrl = (value: string) => {
  try {
    const protocol = new URL(value).protocol
    return protocol === 'http:' || protocol === 'https:'
  } catch {
    return false
  }
}

const isEmailLink = (value: string) => value.startsWith('mailto:')
const isPhoneLink = (value: string) => value.startsWith('tel:')

const optionalMediaUrlSchema = z
  .string()
  .trim()
  .transform((val) => {
    if (val.length === 0) return val
    if (isAbsoluteUrl(val)) return val
    // Ensure relative paths start with /
    return val.startsWith('/') ? val : `/${val}`
  })
  .refine((value) => value.length === 0 || isAbsoluteUrl(value) || value.startsWith('/'), 'URL de imagen invalida')
  .optional()
  .nullable()
  .or(z.literal(''))

const optionalLinkSchema = z
  .string()
  .trim()
  .transform((val) => {
    if (val.length === 0) return val
    if (isAbsoluteUrl(val) || isEmailLink(val) || isPhoneLink(val)) return val
    // Ensure relative paths start with /
    return val.startsWith('/') ? val : `/${val}`
  })
  .refine(
    (value) =>
      value.length === 0 || isAbsoluteUrl(value) || value.startsWith('/') || isEmailLink(value) || isPhoneLink(value),
    'Enlace invalido',
  )
  .optional()
  .nullable()
  .or(z.literal(''))

export const HeroBlockSchema = z.object({
  title: z.string().min(1, 'El titulo es obligatorio'),
  subtitle: z.string().optional().nullable(),
  image_url: optionalMediaUrlSchema,
  cta_text: z.string().optional().nullable(),
  cta_url: optionalLinkSchema,
})

export const RichTextBlockSchema = z.object({
  content: z.string().min(1, 'El contenido es obligatorio'),
})

export const FeatureItemSchema = z.object({
  title: z.string().min(1, 'El titulo es obligatorio'),
  description: z.string().min(1, 'La descripcion es obligatoria'),
  icon: z.string().optional().nullable(),
})

export const FeatureListBlockSchema = z.object({
  title: z.string().min(1, 'El titulo es obligatorio'),
  features: z.array(FeatureItemSchema).min(1, 'Al menos una caracteristica'),
})

export const ContactFormBlockSchema = z.object({
  heading: z.string().min(1, 'El encabezado es obligatorio'),
  recipient_email: z.string().email('Email invalido'),
  success_message: z.string().min(1, 'El mensaje de exito es obligatorio'),
})

export const MenuHighlightsBlockSchema = z.object({
  title: z.string().min(1, 'El titulo es obligatorio'),
  recipe_ids: z.array(z.number()).min(1, 'Selecciona al menos una receta'),
})

export const PublicContactSubmissionSchema = z.object({
  name: z.string().trim().min(1, 'El nombre es obligatorio').max(120, 'Maximo 120 caracteres'),
  email: z.string().trim().email('Email invalido').max(255, 'Maximo 255 caracteres'),
  subject: z.string().trim().min(1, 'El asunto es obligatorio').max(160, 'Maximo 160 caracteres'),
  message: z.string().trim().min(1, 'El mensaje es obligatorio').max(5000, 'Maximo 5000 caracteres'),
})

/**
 * Coerces mixed recipe_id arrays from API payloads (strings, nulls, negatives)
 * into clean positive integers. Used only by the CMS normalizer, not by forms.
 */
export const MenuHighlightsBlockApiSchema = z.object({
  title: z.string().min(1, 'El titulo es obligatorio'),
  recipe_ids: z
    .array(z.unknown())
    .transform((arr) =>
      arr
        .map((v) => {
          const n = Number(v)
          return Number.isFinite(n) && n > 0 ? n : null
        })
        .filter((n): n is number => n !== null)
    )
    .pipe(z.array(z.number()).min(1, 'Selecciona al menos una receta')),
})

export const SeoSettingsSchema = z.object({
  meta_title: z.string().max(60, 'El titulo SEO no debe exceder 60 caracteres').optional().or(z.literal('')),
  meta_description: z.string().max(160, 'La descripcion SEO no debe exceder 160 caracteres').optional().or(z.literal('')),
  meta_image_url: optionalMediaUrlSchema,
  show_in_menu: z.boolean().optional().default(false),
})

export const CmsBlockSchema = z.discriminatedUnion('type', [
  z.object({ id: z.string(), type: z.literal('HeroBlock'), is_visible: z.coerce.boolean(), data: HeroBlockSchema }),
  z.object({ id: z.string(), type: z.literal('RichTextBlock'), is_visible: z.coerce.boolean(), data: RichTextBlockSchema }),
  z.object({ id: z.string(), type: z.literal('FeatureListBlock'), is_visible: z.coerce.boolean(), data: FeatureListBlockSchema }),
  z.object({ id: z.string(), type: z.literal('ContactFormBlock'), is_visible: z.coerce.boolean(), data: ContactFormBlockSchema }),
  z.object({ id: z.string(), type: z.literal('MenuHighlightsBlock'), is_visible: z.coerce.boolean(), data: MenuHighlightsBlockSchema }),
])

/**
 * Block schema for parsing API payloads — uses the coercing MenuHighlightsBlockApiSchema.
 * The output type is identical to CmsBlockSchema (same z.infer result for stored blocks).
 */
export const CmsBlockApiSchema = z.discriminatedUnion('type', [
  z.object({ id: z.string(), type: z.literal('HeroBlock'), is_visible: z.coerce.boolean(), data: HeroBlockSchema }),
  z.object({ id: z.string(), type: z.literal('RichTextBlock'), is_visible: z.coerce.boolean(), data: RichTextBlockSchema }),
  z.object({ id: z.string(), type: z.literal('FeatureListBlock'), is_visible: z.coerce.boolean(), data: FeatureListBlockSchema }),
  z.object({ id: z.string(), type: z.literal('ContactFormBlock'), is_visible: z.coerce.boolean(), data: ContactFormBlockSchema }),
  z.object({ id: z.string(), type: z.literal('MenuHighlightsBlock'), is_visible: z.coerce.boolean(), data: MenuHighlightsBlockApiSchema }),
])

export const PageVersionSchema = z.object({
  id: z.number(),
  page_id: z.number(),
  status: z.enum(['draft', 'published', 'archived']),
  version_number: z.number(),
  blocks: z.array(CmsBlockApiSchema).catch([]),
  meta_title: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  meta_image_url: z.string().optional().nullable(),
  show_in_menu: z.coerce.boolean().default(false),
  created_by: z.number().optional().nullable(),
  published_at: z.string().optional().nullable(),
  created_at: z.string().catch(''),
  updated_at: z.string().catch(''),
})

export const CmsPageSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  is_active: z.coerce.boolean().default(true),
  show_in_menu: z.coerce.boolean().default(false),
  meta_title: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  meta_image_url: z.string().optional().nullable(),
  blocks: z.array(CmsBlockApiSchema).optional().catch([]),
  published_version: PageVersionSchema.optional().nullable(),
  draft_version: PageVersionSchema.optional().nullable(),
  versions: z.array(PageVersionSchema).optional().catch([]),
  created_at: z.string().catch(''),
  updated_at: z.string().catch(''),
})

export type HeroBlockData = z.infer<typeof HeroBlockSchema>
export type RichTextBlockData = z.infer<typeof RichTextBlockSchema>
export type FeatureListBlockData = z.infer<typeof FeatureListBlockSchema>
export type ContactFormBlockData = z.infer<typeof ContactFormBlockSchema>
export type MenuHighlightsBlockData = z.infer<typeof MenuHighlightsBlockSchema>
export type SeoSettingsValues = z.infer<typeof SeoSettingsSchema>
export type CmsBlockValues = z.infer<typeof CmsBlockSchema>
export type PageVersionValues = z.infer<typeof PageVersionSchema>
export type CmsPageValues = z.infer<typeof CmsPageSchema>
export type PublicContactSubmissionValues = z.infer<typeof PublicContactSubmissionSchema>
