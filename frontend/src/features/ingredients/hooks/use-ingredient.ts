import { useQuery } from '@tanstack/react-query'
import { ingredientsApi } from '@/features/ingredients/api/ingredients.api'
import { ingredientKeys } from '@/features/ingredients/hooks/use-ingredients'

export const useIngredientQuery = (id: string) =>
  useQuery({
    queryKey: ingredientKeys.detail(id),
    queryFn: () => ingredientsApi.detail(id),
    enabled: Boolean(id),
  })
