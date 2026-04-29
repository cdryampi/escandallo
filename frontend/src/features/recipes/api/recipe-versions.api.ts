import { apiClient } from '@/api/http-client'
import type { ApiResponse } from '@/api/api-types'
import type { RecipeCostPreview, RecipeVersion } from '@/features/recipes/types/recipe.types'

export const recipeVersionsApi = {
  list(recipeId: string) {
    return apiClient.get<ApiResponse<RecipeVersion[]>>(`/recipes/${recipeId}/versions`)
  },
  calculateCost(versionId: string) {
    return apiClient.post<ApiResponse<RecipeCostPreview>>(`/recipe-versions/${versionId}/calculate-cost`)
  },
}
