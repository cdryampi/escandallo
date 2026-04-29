import type { UseFormReturn } from 'react-hook-form'
import type { z } from 'zod'
import { FormSection } from '@/components/forms/form-section'
import { Input } from '@/components/ui/input'
import { recipeSchema, type RecipeFormValues } from '@/features/recipes/schemas/recipe.schema'

interface RecipeGeneralPanelProps {
  form: UseFormReturn<z.input<typeof recipeSchema>, unknown, RecipeFormValues>
}

export const RecipeGeneralPanel = ({ form }: RecipeGeneralPanelProps) => (
  <FormSection title="Datos generales" description="El formulario vive separado del editor de líneas.">
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <label className="ui-field-label" htmlFor="recipe-name">
          Nombre
        </label>
        <Input id="recipe-name" {...form.register('name')} />
      </div>
      <div className="space-y-2">
        <label className="ui-field-label" htmlFor="recipe-slug">
          Slug
        </label>
        <Input id="recipe-slug" {...form.register('slug')} />
      </div>
    </div>
  </FormSection>
)
