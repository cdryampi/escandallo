import { useCmsRecipeOptions } from '@/api/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { MenuHighlightsBlockSchema, type MenuHighlightsBlockData } from '../schemas/cms.schema'

interface Props {
  defaultValues: MenuHighlightsBlockData
  onSubmit: (values: MenuHighlightsBlockData) => void
  onCancel: () => void
}

export const MenuHighlightsBlockForm = ({ defaultValues, onSubmit, onCancel }: Props) => {
  const form = useForm<MenuHighlightsBlockData>({
    resolver: zodResolver(MenuHighlightsBlockSchema),
    defaultValues: {
      ...defaultValues,
      recipe_ids: defaultValues.recipe_ids ?? [],
    },
  })

  const { data: recipes = [], isLoading, error } = useCmsRecipeOptions()

  const toggleRecipe = (id: number) => {
    const currentRecipeIds = form.getValues('recipe_ids')

    form.setValue(
      'recipe_ids',
      currentRecipeIds.includes(id)
        ? currentRecipeIds.filter((recipeId) => recipeId !== id)
        : [...currentRecipeIds, id],
      { shouldValidate: true },
    )
  }

  const selectedRecipeIds = useWatch({
    control: form.control,
    name: 'recipe_ids',
    defaultValue: defaultValues.recipe_ids ?? [],
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="ui-field-label">Titulo de la seccion</label>
        <Input {...form.register('title')} placeholder="Platos destacados" />
        {form.formState.errors.title ? <p className="ui-field-error">{form.formState.errors.title.message}</p> : null}
      </div>

      <div className="space-y-2">
        <label className="ui-field-label">Seleccionar recetas</label>
        <div className="max-h-[300px] overflow-y-auto rounded border border-border bg-surface-container-lowest p-2">
          {isLoading ? (
            <p className="px-2 py-3 text-sm text-muted-foreground">Cargando recetas activas...</p>
          ) : error ? (
            <p className="px-2 py-3 text-sm text-danger">No se pudo cargar catalogo de recetas para este bloque.</p>
          ) : recipes.length === 0 ? (
            <p className="px-2 py-3 text-sm text-muted-foreground">No hay recetas activas disponibles.</p>
          ) : (
            <div className="grid gap-2">
              {recipes.map((recipe) => {
                const recipeId = Number(recipe.id)

                return (
                  <label
                    key={recipe.id}
                    className="flex cursor-pointer items-center gap-3 rounded p-2 transition-colors hover:bg-surface-container"
                  >
                    <input
                      type="checkbox"
                      className="ui-checkbox"
                      checked={selectedRecipeIds.includes(recipeId)}
                      onChange={() => toggleRecipe(recipeId)}
                    />
                    <span className="text-sm font-medium">{recipe.name}</span>
                  </label>
                )
              })}
            </div>
          )}
        </div>
        {form.formState.errors.recipe_ids ? (
          <p className="ui-field-error">{form.formState.errors.recipe_ids.message}</p>
        ) : null}
      </div>

      <div className="flex justify-end gap-3 border-t border-border pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar bloque</Button>
      </div>
    </form>
  )
}
