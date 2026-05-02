import type { Id, ListSearch } from '@/types/common'

export interface Ingredient {
  id: Id
  name: string
  sku?: string | null
  image_url?: string | null
  notes?: string | null
  is_active: boolean
  cost_per_unit?: string | number | null
  default_waste_percentage?: string | number
  default_yield_percentage?: string | number
  base_unit?: {
    id: Id
    name: string
    symbol: string
  } | null
  supplier?: {
    id: Id
    name: string
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
