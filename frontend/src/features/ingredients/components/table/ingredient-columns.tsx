import { createColumnHelper } from '@tanstack/react-table'
import { MediaThumb } from '@/components/media/media-thumb'
import { IngredientStatusBadge } from '@/features/ingredients/components/ingredient-status-badge'
import { IngredientRowActions } from '@/features/ingredients/components/table/ingredient-row-actions'
import type { Ingredient } from '@/features/ingredients/types/ingredient.types'
import { formatMoney } from '@/lib/format-money'
import { formatNumber } from '@/lib/format-number'

const columnHelper = createColumnHelper<Ingredient>()

export const ingredientColumns = [
  columnHelper.accessor('name', {
    header: 'Ingrediente',
    cell: (info) => (
      <div className="flex items-center gap-3">
        <MediaThumb src={info.row.original.image_url} alt={info.getValue()} />
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-foreground truncate">{info.getValue()}</span>
          {info.row.original.sku && (
            <span className="type-body-sm text-muted-foreground truncate">{info.row.original.sku}</span>
          )}
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('supplier', {
    header: 'Proveedor',
    cell: (info) => <span className="truncate">{info.getValue()?.name ?? '—'}</span>,
  }),
  columnHelper.accessor('base_unit.symbol', {
    header: 'Unidad',
    cell: (info) => <span className="text-muted-foreground">{info.getValue() ?? '—'}</span>,
  }),
  columnHelper.accessor('cost_per_unit', {
    header: () => <div className="text-right">Coste</div>,
    cell: (info) => {
      const val = info.getValue()
      if (val === null || val === undefined) return <div className="text-right">—</div>
      return (
        <div className="text-right tabular-nums font-medium">
          {formatMoney(Number(val))}
        </div>
      )
    },
  }),
  columnHelper.accessor('default_waste_percentage', {
    header: () => <div className="text-right">Merma</div>,
    cell: (info) => {
      const val = info.getValue()
      if (val === null || val === undefined) return <div className="text-right">—</div>
      return <div className="text-right tabular-nums">{formatNumber(Number(val))}%</div>
    },
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
