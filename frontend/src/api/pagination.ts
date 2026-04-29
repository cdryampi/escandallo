import { z } from 'zod'

export const listSearchSchema = z.object({
  page: z.coerce.number().catch(1),
  perPage: z.coerce.number().catch(15),
  search: z.string().catch(''),
  sort: z.string().catch('created_at'),
  direction: z.enum(['asc', 'desc']).catch('desc'),
  status: z.string().optional().catch(undefined),
  category: z.string().optional().catch(undefined),
})

export type ListSearchParams = z.infer<typeof listSearchSchema>
