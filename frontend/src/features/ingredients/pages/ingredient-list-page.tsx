import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
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
    <div className="space-y-8">
      <BackofficePageHeader
        title="Catálogo de Ingredientes"
        description="Gestión centralizada de materias primas, alérgenos y precios de compra."
      >
        <Link to="/backoffice/ingredients/create">
          <Button className="gap-2">
            <Plus className="size-4" />
            Añadir Ingrediente
          </Button>
        </Link>
      </BackofficePageHeader>

      <div className="space-y-4">
        <IngredientTableFilters filters={filters} onFiltersChange={onFiltersChange} />

        {ingredientsQuery.isLoading ? <LoadingState title="Consultando catálogo" description="Sincronizando registros de materias primas y precios..." /> : null}
        
        {ingredientsQuery.isError ? (
          <ErrorState
            title="Fallo de conexión"
            description="No se ha podido sincronizar el catálogo de ingredientes. Verifique su acceso a la red de datos."
            onRetry={() => ingredientsQuery.refetch()}
          />
        ) : null}
        
        {ingredientsQuery.isSuccess && ingredientsQuery.data.data.length === 0 ? (
          <EmptyState 
            title="Catálogo sin existencias" 
            description="No se han detectado ingredientes registrados. Es necesario dar de alta las materias primas para iniciar la gestión operativa." 
            action={
              <Link to="/backoffice/ingredients/create">
                <Button className="font-bold">Registrar primer ingrediente</Button>
              </Link>
            }
          />
        ) : null}
        
        {ingredientsQuery.isSuccess && ingredientsQuery.data.data.length > 0 ? (
          <div className="rounded-[var(--ds-radius-lg)] border border-border bg-surface-raised overflow-hidden shadow-sm">
            <IngredientTable rows={ingredientsQuery.data.data} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
