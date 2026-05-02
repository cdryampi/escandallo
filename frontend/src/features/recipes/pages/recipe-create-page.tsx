import { toast } from 'sonner'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { recipeItemsApi } from '@/features/recipes/api/recipe-items.api'
import { RecipeEditorShell } from '@/features/recipes/components/editor/recipe-editor-shell'
import { useCreateRecipeMutation } from '@/features/recipes/hooks/use-recipe-mutations'

export const RecipeCreatePage = () => {
  const createRecipeMutation = useCreateRecipeMutation()

  return (
    <div className="space-y-8">
      <BackofficePageHeader 
        title="Nueva Receta" 
        description="Define la información base de una nueva receta. Podrás añadir los ingredientes en el siguiente paso." 
      />
      <RecipeEditorShell
        preview={null}
        isSubmitting={createRecipeMutation.isPending}
        onSubmit={(values, items) =>
          createRecipeMutation.mutate(
            {
              ...values,
              description: values.description ?? '',
              category: values.category ?? '',
              code: values.code ?? '',
            },
            {
              onSuccess: () => toast.success(`Receta guardada con ${recipeItemsApi.normalize(items).length} líneas temporales.`),
              onError: () => toast.error('No se pudo guardar la receta.'),
            },
          )
        }
      />
    </div>
  )
}
