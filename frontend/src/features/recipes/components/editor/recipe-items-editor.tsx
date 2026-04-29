import { Button } from '@/components/ui/button'
import { FormSection } from '@/components/forms/form-section'
import { RecipeItemRow } from '@/features/recipes/components/editor/recipe-item-row'
import { useRecipeEditorStore } from '@/features/recipes/stores/recipe-editor.store'

export const RecipeItemsEditor = () => {
  const items = useRecipeEditorStore((state) => state.items)
  const addItem = useRecipeEditorStore((state) => state.addItem)
  const removeItem = useRecipeEditorStore((state) => state.removeItem)
  const updateItem = useRecipeEditorStore((state) => state.updateItem)

  return (
    <FormSection title="Items de receta" description="Estado temporal local del editor, no caché global del backend.">
      <div className="space-y-3">
        {items.map((item) => (
          <RecipeItemRow
            key={item.id}
            item={item}
            onChange={(patch) => updateItem(item.id, patch)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>
      <Button variant="outline" onClick={addItem}>
        Añadir línea
      </Button>
    </FormSection>
  )
}
