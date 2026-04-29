import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ingredientsApi } from '@/features/ingredients/api/ingredients.api'
import { ingredientKeys } from '@/features/ingredients/hooks/use-ingredients'
import type { IngredientRequest } from '@/features/ingredients/types/ingredient.types'

export const useCreateIngredientMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: IngredientRequest) => ingredientsApi.create(payload),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ingredientKeys.all }),
  })
}

export const useUpdateIngredientMutation = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: IngredientRequest) => ingredientsApi.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ingredientKeys.all })
      void queryClient.invalidateQueries({ queryKey: ingredientKeys.detail(id) })
    },
  })
}

export const useDeleteIngredientMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => ingredientsApi.remove(id),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ingredientKeys.all }),
  })
}
