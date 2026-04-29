import { toast } from 'sonner'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { ErrorState } from '@/components/feedback/error-state'
import { LoadingState } from '@/components/feedback/loading-state'
import { IngredientForm } from '@/features/ingredients/components/ingredient-form'
import { useIngredientQuery } from '@/features/ingredients/hooks/use-ingredient'
import { useUpdateIngredientMutation } from '@/features/ingredients/hooks/use-ingredient-mutations'

interface IngredientEditPageProps {
  ingredientId: string
}

export const IngredientEditPage = ({ ingredientId }: IngredientEditPageProps) => {
  const ingredientQuery = useIngredientQuery(ingredientId)
  const updateIngredientMutation = useUpdateIngredientMutation(ingredientId)

  return (
    <div className="space-y-6">
      <BackofficePageHeader title="Editar ingrediente" description="La página orquesta; el formulario vive en componente propio." />

      {ingredientQuery.isLoading ? <LoadingState /> : null}
      {ingredientQuery.isError ? (
        <ErrorState
          title="No se pudo cargar el ingrediente"
          description="El backend aún puede no exponer detalle de ingredientes."
          onRetry={() => ingredientQuery.refetch()}
        />
      ) : null}
      {ingredientQuery.data ? (
        <IngredientForm
          defaultValues={{
            name: ingredientQuery.data.data.name,
            sku: ingredientQuery.data.data.sku ?? '',
            notes: ingredientQuery.data.data.notes ?? '',
            default_waste_percentage: Number(ingredientQuery.data.data.default_waste_percentage ?? 0),
            default_yield_percentage: Number(ingredientQuery.data.data.default_yield_percentage ?? 100),
            is_active: ingredientQuery.data.data.is_active,
          }}
          isSubmitting={updateIngredientMutation.isPending}
          onSubmit={(values) =>
            updateIngredientMutation.mutate(values, {
              onSuccess: () => toast.success('Ingrediente actualizado.'),
              onError: () => toast.error('No se pudo actualizar el ingrediente.'),
            })
          }
        />
      ) : null}
    </div>
  )
}
