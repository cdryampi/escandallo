import { toast } from 'sonner'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { IngredientForm } from '@/features/ingredients/components/ingredient-form'
import { useCreateIngredientMutation } from '@/features/ingredients/hooks/use-ingredient-mutations'

export const IngredientCreatePage = () => {
  const createIngredientMutation = useCreateIngredientMutation()

  return (
    <div className="space-y-8">
      <BackofficePageHeader 
        title="Nuevo Ingrediente" 
        description="Registra una nueva materia prima en el catálogo central para su uso en escandallos." 
      />
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
