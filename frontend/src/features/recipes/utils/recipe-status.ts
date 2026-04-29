import type { Recipe } from '@/features/recipes/types/recipe.types'

export const isRecipeEditable = (status: Recipe['status']) => status !== 'archived'
