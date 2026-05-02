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
  avg_cost_per_plate: number
  avg_profit_margin: number
  ingredients_in_alert_count: number
  latest_recipes: Array<{
    id: number
    name: string
    updated_at: string
    cost: number
    margin: number
    status: 'draft' | 'active' | 'archived'
  }>
  cms: {
    total_pages: number
    active_pages: number
    pages_with_draft: number
    published_pages: number
    contact_submissions: {
      new: number
      read: number
      resolved: number
    }
  }
}

export const dashboardApi = {
  getMetrics() {
    return apiClient.get<ApiResponse<DashboardMetrics>>('/dashboard')
  },
}
