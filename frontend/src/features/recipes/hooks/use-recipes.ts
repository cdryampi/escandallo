import { useQuery } from '@tanstack/react-query'
import { recipesApi } from '@/features/recipes/api/recipes.api'
import type { RecipeFilters } from '@/features/recipes/types/recipe.types'

export const recipeKeys = {
  all: ['recipes'] as const,
  lists: () => [...recipeKeys.all, 'list'] as const,
  list: (filters: RecipeFilters) => [...recipeKeys.lists(), filters] as const,
  details: () => [...recipeKeys.all, 'detail'] as const,
  detail: (id: string) => [...recipeKeys.details(), id] as const,
}

export const useRecipesQuery = (filters: RecipeFilters) =>
  useQuery({
    queryKey: recipeKeys.list(filters),
    queryFn: () => recipesApi.list(filters),
  })
