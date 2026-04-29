import { Link } from '@tanstack/react-router'
import { getCoreRowModel, useReactTable, createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@/components/data-display/data-table'
import { Button } from '@/components/ui/button'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { EmptyState } from '@/components/feedback/empty-state'
import { ErrorState } from '@/components/feedback/error-state'
import { LoadingState } from '@/components/feedback/loading-state'
import { Input } from '@/components/ui/input'
import { RecipeStatusBadge } from '@/features/recipes/components/recipe-status-badge'
import { useRecipesQuery } from '@/features/recipes/hooks/use-recipes'
import type { Recipe, RecipeFilters } from '@/features/recipes/types/recipe.types'

interface RecipeListPageProps {
  filters: RecipeFilters
  onFiltersChange: (patch: Partial<RecipeFilters>) => void
}

const columnHelper = createColumnHelper<Recipe>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Receta',
    cell: (info) => <span className="font-medium text-foreground">{info.getValue()}</span>,
  }),
  columnHelper.accessor('category', {
    header: 'Categoría',
    cell: (info) => info.getValue() ?? '—',
  }),
  columnHelper.accessor('status', {
    header: 'Estado',
    cell: (info) => <RecipeStatusBadge status={info.getValue()} />,
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Acciones',
    cell: (info) => (
      <div className="flex gap-3">
        <Link className="type-body-md font-medium text-foreground transition-colors hover:text-brand" to="/backoffice/recipes/$recipeId" params={{ recipeId: String(info.row.original.id) }}>
          Ver
        </Link>
        <Link className="type-body-md font-medium text-foreground transition-colors hover:text-brand" to="/backoffice/recipes/$recipeId/edit" params={{ recipeId: String(info.row.original.id) }}>
          Editar
        </Link>
      </div>
    ),
  }),
]

export const RecipeListPage = ({ filters, onFiltersChange }: RecipeListPageProps) => {
  const recipesQuery = useRecipesQuery(filters)
  const table = useReactTable({
    data: recipesQuery.data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="space-y-6">
      <BackofficePageHeader title="Recetas" description="Segundo feature modelo: divide listado, detalle, edición y coste desde el principio.">
        <Link to="/backoffice/recipes/create">
          <Button>Nueva receta</Button>
        </Link>
      </BackofficePageHeader>

      <div className="flex flex-col gap-3 rounded-[var(--ds-radius-lg)] border border-border bg-surface-raised p-4 md:flex-row md:items-center">
        <Input
          value={filters.search}
          onChange={(event) => onFiltersChange({ search: event.target.value, page: 1 })}
          placeholder="Buscar receta..."
          className="md:max-w-sm"
        />
        <Button variant="outline" onClick={() => onFiltersChange({ direction: filters.direction === 'asc' ? 'desc' : 'asc' })}>
          Orden {filters.direction === 'asc' ? 'ascendente' : 'descendente'}
        </Button>
      </div>

      {recipesQuery.isLoading ? <LoadingState /> : null}
      {recipesQuery.isError ? (
        <ErrorState
          title="No se pudieron cargar las recetas"
          description="La estructura del feature está lista aunque el backend aún no devuelva recetas."
          onRetry={() => recipesQuery.refetch()}
        />
      ) : null}
      {recipesQuery.isSuccess && recipesQuery.data.data.length === 0 ? (
        <EmptyState title="No hay recetas todavía" description="Cuando exista el backend completo, el listado se poblará desde Query." />
      ) : null}
      {recipesQuery.isSuccess && recipesQuery.data.data.length > 0 ? <DataTable table={table} /> : null}
    </div>
  )
}
