import { apiClient } from '@/api/http-client'
import type { ApiResponse, PaginatedResponse } from '@/api/api-types'
import type { Recipe, RecipeFilters, RecipeRequest } from '@/features/recipes/types/recipe.types'

export const recipesApi = {
  list(filters: RecipeFilters) {
    return apiClient.get<PaginatedResponse<Recipe>>('recipes', {
      params: {
        page: filters.page,
        per_page: filters.perPage,
        search: filters.search,
        sort: filters.sort,
        direction: filters.direction,
        status: filters.status,
      },
    })
  },
  detail(id: string) {
    return apiClient.get<ApiResponse<Recipe>>(`recipes/${id}`)
  },
  create(payload: RecipeRequest) {
    return apiClient.post<ApiResponse<Recipe>>('recipes', payload)
  },
  update(id: string, payload: RecipeRequest) {
    return apiClient.put<ApiResponse<Recipe>>(`recipes/${id}`, payload)
  },
}
