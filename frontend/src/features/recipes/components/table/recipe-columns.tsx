import { Link } from '@tanstack/react-router'
import { createColumnHelper } from '@tanstack/react-table'
import { MediaThumb } from '@/components/media/media-thumb'
import { RecipeStatusBadge } from '@/features/recipes/components/recipe-status-badge'
import type { Recipe } from '@/features/recipes/types/recipe.types'

const columnHelper = createColumnHelper<Recipe>()

export const recipeColumns = [
  columnHelper.accessor('name', {
    header: 'Receta',
    cell: (info) => (
      <div className="flex items-center gap-3">
        <MediaThumb src={info.row.original.image_url} alt={info.getValue()} />
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-foreground truncate">{info.getValue()}</span>
          <span className="type-body-sm text-muted-foreground truncate">{info.row.original.slug}</span>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('category', {
    header: 'Categoría',
    cell: (info) => <span className="truncate">{info.getValue() ?? '—'}</span>,
  }),
  columnHelper.accessor('items_count', {
    header: () => <div className="text-right">Ingredientes</div>,
    cell: (info) => (
      <div className="text-right tabular-nums text-muted-foreground">
        {info.getValue() ?? 0} <span className="text-[10px] uppercase font-bold opacity-70 tracking-tight">{info.getValue() === 1 ? 'ítem' : 'ítems'}</span>
      </div>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Estado',
    cell: (info) => <RecipeStatusBadge status={info.getValue()} />,
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <div className="text-right">Acciones</div>,
    cell: (info) => (
      <div className="flex justify-end gap-4">
        <Link 
          className="type-label-md text-foreground transition-colors hover:text-brand" 
          to="/backoffice/recipes/$recipeId" 
          params={{ recipeId: String(info.row.original.id) }}
        >
          Ver
        </Link>
        <Link 
          className="type-label-md text-foreground transition-colors hover:text-brand" 
          to="/backoffice/recipes/$recipeId/edit" 
          params={{ recipeId: String(info.row.original.id) }}
        >
          Editar
        </Link>
      </div>
    ),
  }),
]
