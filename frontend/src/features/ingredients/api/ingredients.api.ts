import { apiClient } from '@/api/http-client'
import type { ApiResponse, PaginatedResponse } from '@/api/api-types'
import type { Ingredient, IngredientFilters, IngredientRequest } from '@/features/ingredients/types/ingredient.types'

export const ingredientsApi = {
  list(filters: IngredientFilters) {
    return apiClient.get<PaginatedResponse<Ingredient>>('/ingredients', {
      params: {
        page: filters.page,
        per_page: filters.perPage,
        search: filters.search,
        sort: filters.sort,
        direction: filters.direction,
        status: filters.status,
        category: filters.category,
      },
    })
  },
  detail(id: string) {
    return apiClient.get<ApiResponse<Ingredient>>(`/ingredients/${id}`)
  },
  create(payload: IngredientRequest) {
    return apiClient.post<ApiResponse<Ingredient>>('/ingredients', payload)
  },
  update(id: string, payload: IngredientRequest) {
    return apiClient.put<ApiResponse<Ingredient>>(`/ingredients/${id}`, payload)
  },
  remove(id: string) {
    return apiClient.delete<void>(`/ingredients/${id}`)
  },
}
