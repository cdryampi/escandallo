import type { RecipeItemDraft } from '@/features/recipes/types/recipe.types'

export const recipeItemsApi = {
  normalize(items: RecipeItemDraft[]) {
    return items.map((item) => ({
      ...item,
      quantity: Number(item.quantity),
    }))
  },
}
