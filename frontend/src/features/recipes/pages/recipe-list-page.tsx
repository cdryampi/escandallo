import { Link } from '@tanstack/react-router'
import { Plus, Search, ArrowUpDown } from 'lucide-react'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DataTable } from '@/components/data-display/data-table'
import { Button } from '@/components/ui/button'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { EmptyState } from '@/components/feedback/empty-state'
import { ErrorState } from '@/components/feedback/error-state'
import { LoadingState } from '@/components/feedback/loading-state'
import { Input } from '@/components/ui/input'
import { useRecipesQuery } from '@/features/recipes/hooks/use-recipes'
import { recipeColumns } from '@/features/recipes/components/table/recipe-columns'
import type { RecipeFilters } from '@/features/recipes/types/recipe.types'

interface RecipeListPageProps {
  filters: RecipeFilters
  onFiltersChange: (patch: Partial<RecipeFilters>) => void
}

export const RecipeListPage = ({ filters, onFiltersChange }: RecipeListPageProps) => {
  const recipesQuery = useRecipesQuery(filters)
  const table = useReactTable({
    data: recipesQuery.data?.data ?? [],
    columns: recipeColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="space-y-8">
      <BackofficePageHeader 
        title="Libro de Recetas" 
        description="Gestión de escandallos, fichas técnicas y optimización de costes de producción."
      >
        <Link to="/backoffice/recipes/create">
          <Button className="gap-2">
            <Plus className="size-4" />
            Nueva Receta
          </Button>
        </Link>
      </BackofficePageHeader>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 rounded border border-border bg-surface px-4 py-3 md:flex-row md:items-center justify-between shadow-sm">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={filters.search}
              onChange={(event) => onFiltersChange({ search: event.target.value, page: 1 })}
              placeholder="Buscar por nombre o identificador..."
              className="pl-9 bg-surface-raised h-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2 text-muted-foreground h-9"
              onClick={() => onFiltersChange({ direction: filters.direction === 'asc' ? 'desc' : 'asc' })}
            >
              <ArrowUpDown className="size-3.5" />
              Orden {filters.direction === 'asc' ? 'A-Z' : 'Z-A'}
            </Button>
          </div>
        </div>

        {recipesQuery.isLoading ? <LoadingState title="Consultando recetario" description="Recuperando fichas técnicas y estados de producción..." /> : null}
        
        {recipesQuery.isError ? (
          <ErrorState
            title="Error de sincronización"
            description="No se ha podido acceder al recetario centralizado. Reintente la operación en unos instantes."
            onRetry={() => recipesQuery.refetch()}
          />
        ) : null}
        
        {recipesQuery.isSuccess && recipesQuery.data.data.length === 0 ? (
          <EmptyState 
            title="Recetario sin datos" 
            description="No se han detectado fichas técnicas registradas. Inicie el proceso de escandallo creando su primera receta." 
            action={
              <Link to="/backoffice/recipes/create">
                <Button className="font-bold">Crear primera receta</Button>
              </Link>
            }
          />
        ) : null}
        
        {recipesQuery.isSuccess && recipesQuery.data.data.length > 0 ? (
          <div className="rounded-[var(--ds-radius-lg)] border border-border bg-surface-raised overflow-hidden shadow-sm">
            <DataTable table={table} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
