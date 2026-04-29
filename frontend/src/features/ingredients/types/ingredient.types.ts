import type { Id, ListSearch } from '@/types/common'

export interface Ingredient {
  id: Id
  name: string
  sku?: string | null
  notes?: string | null
  is_active: boolean
  default_waste_percentage?: number | string
  default_yield_percentage?: number | string
  base_unit?: {
    id: Id
    name: string
    symbol: string
  } | null
}

export interface IngredientRequest {
  name: string
  sku?: string | null
  notes?: string | null
  base_unit_id?: number | null
  default_waste_percentage: number
  default_yield_percentage: number
  is_active: boolean
}

export type IngredientFilters = ListSearch
