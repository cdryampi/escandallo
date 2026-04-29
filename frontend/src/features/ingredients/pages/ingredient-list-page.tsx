import { Link } from '@tanstack/react-router'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/feedback/empty-state'
import { ErrorState } from '@/components/feedback/error-state'
import { LoadingState } from '@/components/feedback/loading-state'
import { IngredientTable } from '@/features/ingredients/components/table/ingredient-table'
import { IngredientTableFilters } from '@/features/ingredients/components/table/ingredient-table-filters'
import { useIngredientsQuery } from '@/features/ingredients/hooks/use-ingredients'
import type { IngredientFilters } from '@/features/ingredients/types/ingredient.types'

interface IngredientListPageProps {
  filters: IngredientFilters
  onFiltersChange: (patch: Partial<IngredientFilters>) => void
}

export const IngredientListPage = ({ filters, onFiltersChange }: IngredientListPageProps) => {
  const ingredientsQuery = useIngredientsQuery(filters)

  return (
    <div className="space-y-6">
      <BackofficePageHeader
        title="Ingredientes"
        description="Ejemplo modelo de listado paginado con filtros en URL, Query como fuente de verdad y tabla desacoplada."
      >
        <Link to="/backoffice/ingredients/create">
          <Button>Nuevo ingrediente</Button>
        </Link>
      </BackofficePageHeader>

      <IngredientTableFilters filters={filters} onFiltersChange={onFiltersChange} />

      {ingredientsQuery.isLoading ? <LoadingState /> : null}
      {ingredientsQuery.isError ? (
        <ErrorState
          title="No se pudieron cargar los ingredientes"
          description="La arquitectura está lista; el backend de ingredientes todavía puede no estar disponible."
          onRetry={() => ingredientsQuery.refetch()}
        />
      ) : null}
      {ingredientsQuery.isSuccess && ingredientsQuery.data.data.length === 0 ? (
        <EmptyState title="Todavía no hay ingredientes" description="Cuando el backend exponga datos, aparecerán aquí con paginación remota." />
      ) : null}
      {ingredientsQuery.isSuccess && ingredientsQuery.data.data.length > 0 ? (
        <IngredientTable rows={ingredientsQuery.data.data} />
      ) : null}
    </div>
  )
}
