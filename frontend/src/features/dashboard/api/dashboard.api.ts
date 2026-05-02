import { apiClient } from '@/api/http-client'
import type { ApiResponse } from '@/api/api-types'

export interface DashboardMetrics {
  total_ingredients: number
  active_ingredients: number
  inactive_ingredients: number
  total_recipes: number
  recipes_by_status: {
    draft: number
    active: number
    archived: number
  }
  total_suppliers: number
  active_suppliers: number
  ingredients_with_images: number
  recipes_with_images: number
}

export const dashboardApi = {
  getMetrics() {
    return apiClient.get<ApiResponse<DashboardMetrics>>('/dashboard')
  },
}
