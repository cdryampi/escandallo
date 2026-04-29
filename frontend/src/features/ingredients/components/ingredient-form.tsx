import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormSection } from '@/components/forms/form-section'
import {
  ingredientSchema,
  type IngredientFormValues,
} from '@/features/ingredients/schemas/ingredient.schema'

interface IngredientFormProps {
  defaultValues?: Partial<IngredientFormValues>
  onSubmit: (values: IngredientFormValues) => void
  isSubmitting?: boolean
}

export const IngredientForm = ({ defaultValues, onSubmit, isSubmitting }: IngredientFormProps) => {
  const form = useForm<z.input<typeof ingredientSchema>, unknown, IngredientFormValues>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name: '',
      sku: '',
      notes: '',
      base_unit_id: undefined,
      default_waste_percentage: 0,
      default_yield_percentage: 100,
      is_active: true,
      ...defaultValues,
    },
  })

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit((values) => onSubmit(values))}>
      <FormSection title="Datos generales" description="La validación de UX vive aquí; la autoridad final sigue en Laravel.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="ui-field-label" htmlFor="ingredient-name">
              Nombre
            </label>
            <Input id="ingredient-name" {...form.register('name')} />
            <p className="ui-field-error">{form.formState.errors.name?.message}</p>
          </div>
          <div className="space-y-2">
            <label className="ui-field-label" htmlFor="ingredient-sku">
              SKU
            </label>
            <Input id="ingredient-sku" {...form.register('sku')} />
            <p className="ui-field-error" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="ui-field-label" htmlFor="ingredient-waste">
              Merma por defecto
            </label>
            <Input id="ingredient-waste" type="number" step="0.01" {...form.register('default_waste_percentage')} />
          </div>
          <div className="space-y-2">
            <label className="ui-field-label" htmlFor="ingredient-yield">
              Rendimiento por defecto
            </label>
            <Input id="ingredient-yield" type="number" step="0.01" {...form.register('default_yield_percentage')} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="ui-field-label" htmlFor="ingredient-notes">
            Notas
          </label>
          <Textarea id="ingredient-notes" {...form.register('notes')} />
        </div>

        <label className="flex items-center gap-3 type-body-md font-medium text-foreground">
          <input type="checkbox" className="ui-checkbox size-4 rounded-[var(--ds-radius-default)] border border-border" {...form.register('is_active')} />
          Ingrediente activo
        </label>
      </FormSection>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Guardar ingrediente'}
      </Button>
    </form>
  )
}
