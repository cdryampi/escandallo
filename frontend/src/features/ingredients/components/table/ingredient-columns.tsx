import { createColumnHelper } from '@tanstack/react-table'
import { IngredientStatusBadge } from '@/features/ingredients/components/ingredient-status-badge'
import { IngredientRowActions } from '@/features/ingredients/components/table/ingredient-row-actions'
import type { Ingredient } from '@/features/ingredients/types/ingredient.types'

const columnHelper = createColumnHelper<Ingredient>()

export const ingredientColumns = [
  columnHelper.accessor('name', {
    header: 'Ingrediente',
    cell: (info) => <span className="font-medium text-foreground">{info.getValue()}</span>,
  }),
  columnHelper.accessor('sku', {
    header: 'SKU',
    cell: (info) => info.getValue() ?? '—',
  }),
  columnHelper.accessor('base_unit', {
    header: 'Unidad base',
    cell: (info) => info.getValue()?.symbol ?? '—',
  }),
  columnHelper.accessor('is_active', {
    header: 'Estado',
    cell: (info) => <IngredientStatusBadge active={info.getValue()} />,
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Acciones',
    cell: (info) => <IngredientRowActions ingredient={info.row.original} />,
  }),
]
