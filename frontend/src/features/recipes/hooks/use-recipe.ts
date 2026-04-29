import { useQuery } from '@tanstack/react-query'
import { recipesApi } from '@/features/recipes/api/recipes.api'
import { recipeKeys } from '@/features/recipes/hooks/use-recipes'

export const useRecipeQuery = (id: string) =>
  useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => recipesApi.detail(id),
    enabled: Boolean(id),
  })
