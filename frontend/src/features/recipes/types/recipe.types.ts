import type { Id, ListSearch } from '@/types/common'

export interface RecipeItem {
  id: Id
  ingredient_id: Id
  ingredient_name?: string
  quantity: number
  unit?: {
    id: Id
    name: string
    symbol: string
  }
  notes?: string | null
}

export interface Recipe {
  id: Id
  name: string
  slug: string
  image_url?: string | null
  code?: string | null
  category?: string | null
  description?: string | null
  selling_price?: number | null
  status: 'draft' | 'active' | 'archived'
  is_subrecipe: boolean
  yield_portions?: number
  items_count?: number
  items?: RecipeItem[]
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
