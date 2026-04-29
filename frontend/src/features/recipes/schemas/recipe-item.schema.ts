import { z } from 'zod'

export const recipeItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'El item necesita nombre.'),
  quantity: z.coerce.number().positive('La cantidad debe ser positiva.'),
  unit: z.string().min(1, 'La unidad es obligatoria.'),
  kind: z.enum(['ingredient', 'subrecipe']),
})

export type RecipeItemFormValues = z.infer<typeof recipeItemSchema>
