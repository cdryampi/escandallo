import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { Button } from '@/components/ui/button'
import { recipeSchema, type RecipeFormValues } from '@/features/recipes/schemas/recipe.schema'
import { RecipeGeneralPanel } from '@/features/recipes/components/editor/recipe-general-panel'
import { RecipeVersionPanel } from '@/features/recipes/components/editor/recipe-version-panel'
import { RecipeItemsEditor } from '@/features/recipes/components/editor/recipe-items-editor'
import { RecipeCostPreviewPanel } from '@/features/recipes/components/editor/recipe-cost-preview-panel'
import { useRecipeEditorStore } from '@/features/recipes/stores/recipe-editor.store'
import type { RecipeCostPreview, RecipeItemDraft } from '@/features/recipes/types/recipe.types'

interface RecipeEditorShellProps {
  defaultValues?: Partial<RecipeFormValues>
  initialItems?: RecipeItemDraft[]
  preview: RecipeCostPreview | null
  onSubmit: (values: RecipeFormValues, items: RecipeItemDraft[]) => void
  isSubmitting?: boolean
}

export const RecipeEditorShell = ({
  defaultValues,
  initialItems = [],
  preview,
  onSubmit,
  isSubmitting,
}: RecipeEditorShellProps) => {
  const setItems = useRecipeEditorStore((state) => state.setItems)
  const reset = useRecipeEditorStore((state) => state.reset)
  const items = useRecipeEditorStore((state) => state.items)
  const form = useForm<z.input<typeof recipeSchema>, unknown, RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: '',
      slug: '',
      code: '',
      category: '',
      description: '',
      selling_price: undefined,
      status: 'draft',
      is_subrecipe: false,
      ...defaultValues,
    },
  })

  useEffect(() => {
    setItems(initialItems)

    return () => {
      reset()
    }
  }, [initialItems, reset, setItems])

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit((values) => onSubmit(values, items))}>
      <RecipeGeneralPanel form={form} />
      <RecipeVersionPanel />
      <RecipeItemsEditor />
      <RecipeCostPreviewPanel cost={preview} />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando receta...' : 'Guardar receta'}
      </Button>
    </form>
  )
}
