import { useQuery } from '@tanstack/react-query'
import { recipeVersionsApi } from '@/features/recipes/api/recipe-versions.api'

export const useRecipeCostQuery = (versionId: string) =>
  useQuery({
    queryKey: ['recipe-cost', versionId],
    queryFn: () => recipeVersionsApi.calculateCost(versionId),
    enabled: Boolean(versionId),
  })
