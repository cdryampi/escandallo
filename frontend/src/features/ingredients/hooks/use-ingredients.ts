import { useQuery } from '@tanstack/react-query'
import { ingredientsApi } from '@/features/ingredients/api/ingredients.api'
import type { IngredientFilters } from '@/features/ingredients/types/ingredient.types'

export const ingredientKeys = {
  all: ['ingredients'] as const,
  lists: () => [...ingredientKeys.all, 'list'] as const,
  list: (filters: IngredientFilters) => [...ingredientKeys.lists(), filters] as const,
  details: () => [...ingredientKeys.all, 'detail'] as const,
  detail: (id: string) => [...ingredientKeys.details(), id] as const,
}

export const useIngredientsQuery = (filters: IngredientFilters) =>
  useQuery({
    queryKey: ingredientKeys.list(filters),
    queryFn: () => ingredientsApi.list(filters),
  })
