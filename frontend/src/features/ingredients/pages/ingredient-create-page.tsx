import { toast } from 'sonner'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { IngredientForm } from '@/features/ingredients/components/ingredient-form'
import { useCreateIngredientMutation } from '@/features/ingredients/hooks/use-ingredient-mutations'

export const IngredientCreatePage = () => {
  const createIngredientMutation = useCreateIngredientMutation()

  return (
    <div className="space-y-6">
      <BackofficePageHeader title="Nuevo ingrediente" description="Formulario modular con RHF + Zod dentro del feature." />
      <IngredientForm
        isSubmitting={createIngredientMutation.isPending}
        onSubmit={(values) =>
          createIngredientMutation.mutate(values, {
            onSuccess: () => toast.success('Ingrediente guardado.'),
            onError: () => toast.error('No se pudo guardar el ingrediente.'),
          })
        }
      />
    </div>
  )
}
