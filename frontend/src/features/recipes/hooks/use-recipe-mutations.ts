import { useMutation, useQueryClient } from '@tanstack/react-query'
import { recipesApi } from '@/features/recipes/api/recipes.api'
import { recipeKeys } from '@/features/recipes/hooks/use-recipes'
import type { RecipeRequest } from '@/features/recipes/types/recipe.types'

export const useCreateRecipeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: RecipeRequest) => recipesApi.create(payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: recipeKeys.all }),
  })
}

export const useUpdateRecipeMutation = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: RecipeRequest) => recipesApi.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: recipeKeys.all })
      void queryClient.invalidateQueries({ queryKey: recipeKeys.detail(id) })
    },
  })
}
