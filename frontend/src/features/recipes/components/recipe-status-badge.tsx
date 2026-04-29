import { StatusBadge } from '@/components/data-display/status-badge'
import type { Recipe } from '@/features/recipes/types/recipe.types'

interface RecipeStatusBadgeProps {
  status: Recipe['status']
}

const statusTone: Record<Recipe['status'], 'neutral' | 'success' | 'warning'> = {
  draft: 'warning',
  active: 'success',
  archived: 'neutral',
}

export const RecipeStatusBadge = ({ status }: RecipeStatusBadgeProps) => (
  <StatusBadge tone={statusTone[status]}>{status}</StatusBadge>
)
