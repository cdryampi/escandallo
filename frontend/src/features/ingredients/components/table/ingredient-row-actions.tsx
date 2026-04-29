import { Link } from '@tanstack/react-router'
import { Pencil } from 'lucide-react'
import type { Ingredient } from '@/features/ingredients/types/ingredient.types'

interface IngredientRowActionsProps {
  ingredient: Ingredient
}

export const IngredientRowActions = ({ ingredient }: IngredientRowActionsProps) => (
  <Link
    to="/backoffice/ingredients/$ingredientId/edit"
    params={{ ingredientId: String(ingredient.id) }}
    className="inline-flex items-center gap-2 type-body-md font-medium text-foreground transition-colors hover:text-brand"
  >
    <Pencil className="size-4" />
    Editar
  </Link>
)
