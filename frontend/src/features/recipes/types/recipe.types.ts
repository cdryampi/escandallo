import type { Id, ListSearch } from '@/types/common'

export interface Recipe {
  id: Id
  name: string
  slug: string
  code?: string | null
  category?: string | null
  description?: string | null
  selling_price?: number | null
  status: 'draft' | 'active' | 'archived'
  is_subrecipe: boolean
}

export interface RecipeVersion {
  id: Id
  version_number: number
  servings: number
  yield_percentage: number
  waste_percentage: number
}

export interface RecipeItemDraft {
  id: string
  name: string
  quantity: number
  unit: string
  kind: 'ingredient' | 'subrecipe'
}

export interface RecipeRequest {
  name: string
  slug: string
  code?: string | null
  category?: string | null
  description?: string | null
  selling_price?: number | null
  status: 'draft' | 'active' | 'archived'
  is_subrecipe: boolean
}

export interface RecipeCostPreview {
  totalCost: number
  costPerServing: number
  sellingPrice: number | null
}

export type RecipeFilters = ListSearch
