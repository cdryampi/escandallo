import { z } from 'zod'
import { listSearchSchema } from '@/api/pagination'

export const recipeSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  slug: z.string().min(2, 'El slug es obligatorio.'),
  code: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  selling_price: z.coerce.number().nonnegative().optional().nullable(),
  status: z.enum(['draft', 'active', 'archived']),
  is_subrecipe: z.boolean(),
})

export const recipesFiltersSchema = listSearchSchema.extend({
  sort: z.string().catch('name'),
})

export type RecipeFormValues = z.output<typeof recipeSchema>
export type RecipesFiltersValues = z.output<typeof recipesFiltersSchema>
