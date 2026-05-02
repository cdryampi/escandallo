import { toast } from 'sonner'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { ErrorState } from '@/components/feedback/error-state'
import { LoadingState } from '@/components/feedback/loading-state'
import { RecipeEditorShell } from '@/features/recipes/components/editor/recipe-editor-shell'
import { useRecipeQuery } from '@/features/recipes/hooks/use-recipe'
import { useUpdateRecipeMutation } from '@/features/recipes/hooks/use-recipe-mutations'

interface RecipeEditPageProps {
  recipeId: string
}

export const RecipeEditPage = ({ recipeId }: RecipeEditPageProps) => {
  const recipeQuery = useRecipeQuery(recipeId)
  const updateRecipeMutation = useUpdateRecipeMutation(recipeId)

  return (
    <div className="space-y-8">
      <BackofficePageHeader 
        title="Editar Receta" 
        description="Modifica la información básica, categoría y estado de publicación de la receta." 
      />
      {recipeQuery.isLoading ? <LoadingState title="Cargando receta" description="Recuperando datos base del recetario..." /> : null}
      {recipeQuery.isError ? (
        <ErrorState
          title="Error al cargar receta"
          description="No se ha podido recuperar la información de la receta para su edición."
          onRetry={() => recipeQuery.refetch()}
        />
      ) : null}
      {recipeQuery.data ? (
        <RecipeEditorShell
          defaultValues={{
            name: recipeQuery.data.data.name,
            slug: recipeQuery.data.data.slug,
            code: recipeQuery.data.data.code ?? '',
            category: recipeQuery.data.data.category ?? '',
            description: recipeQuery.data.data.description ?? '',
            selling_price: recipeQuery.data.data.selling_price ?? undefined,
            status: recipeQuery.data.data.status,
            is_subrecipe: recipeQuery.data.data.is_subrecipe,
          }}
          preview={null}
          isSubmitting={updateRecipeMutation.isPending}
          onSubmit={(values) =>
            updateRecipeMutation.mutate(values, {
              onSuccess: () => toast.success('Receta actualizada.'),
              onError: () => toast.error('No se pudo actualizar la receta.'),
            })
          }
        />
      ) : null}
    </div>
  )
}
