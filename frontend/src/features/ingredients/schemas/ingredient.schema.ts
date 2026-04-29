import { z } from 'zod'
import { listSearchSchema } from '@/api/pagination'

export const ingredientSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  sku: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  base_unit_id: z.coerce.number().optional().nullable(),
  default_waste_percentage: z.coerce.number().min(0).max(100),
  default_yield_percentage: z.coerce.number().min(0).max(100),
  is_active: z.boolean(),
})

export const ingredientFiltersSchema = listSearchSchema.extend({
  sort: z.string().catch('name'),
})

export type IngredientFormValues = z.output<typeof ingredientSchema>
export type IngredientFiltersValues = z.output<typeof ingredientFiltersSchema>
