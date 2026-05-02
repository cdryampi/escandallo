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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
      <div className="space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 border-b border-border/50 pb-4">Configuración del Catálogo</h4>
        
        <div className="space-y-4">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Título de la sección</label>
          <Input {...form.register('title')} placeholder="Platos destacados" className="type-headline-sm h-12 bg-white shadow-inner" />
          {form.formState.errors.title ? <p className="ui-field-error mt-2">{form.formState.errors.title.message}</p> : null}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Seleccionar platos técnicos</label>
            <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
              {selectedRecipeIds.length} seleccionados
            </span>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto rounded-xl border border-border bg-white shadow-inner custom-scrollbar">
            {isLoading ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground italic animate-pulse">Cargando catálogo de recetas activas...</div>
            ) : error ? (
              <div className="px-4 py-8 text-center text-sm text-error bg-error/5 border-b border-error/10 font-medium">No se pudo cargar catálogo de recetas para este bloque.</div>
            ) : recipes.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground italic">No hay recetas técnicas activas disponibles para mostrar.</div>
            ) : (
              <div className="divide-y divide-border/30">
                {recipes.map((recipe) => {
                  const recipeId = Number(recipe.id)
                  const isSelected = selectedRecipeIds.includes(recipeId)

                  return (
                    <label
                      key={recipe.id}
                      className={`flex cursor-pointer items-center gap-4 px-4 py-3 transition-all hover:bg-surface-container-low ${
                        isSelected ? 'bg-primary/5' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="size-4 rounded border-border text-primary focus:ring-primary/20"
                        checked={isSelected}
                        onChange={() => toggleRecipe(recipeId)}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className={`text-sm font-bold truncate ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                          {recipe.name}
                        </span>
                        {recipe.category && (
                           <span className="text-[10px] text-muted-foreground uppercase tracking-tight">{recipe.category}</span>
                        )}
                      </div>
                    </label>
                  )
                })}
              </div>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">Solo las recetas marcadas como "Activas" en el módulo de cocina están disponibles para su publicación editorial.</p>
          {form.formState.errors.recipe_ids ? (
            <p className="ui-field-error mt-2">{form.formState.errors.recipe_ids.message}</p>
          ) : null}
        </div>
      </div>

      <div className="sticky bottom-[-40px] -mx-10 px-10 py-6 bg-white/95 backdrop-blur-md border-t border-border flex justify-end gap-4 z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <Button type="button" variant="outline" onClick={onCancel} className="px-8 h-11 text-sm font-semibold">Cancelar</Button>
        <Button type="submit" className="px-10 h-11 text-sm font-bold shadow-primary/20 shadow-lg">Aplicar cambios</Button>
      </div>
    </form>
  )
}
