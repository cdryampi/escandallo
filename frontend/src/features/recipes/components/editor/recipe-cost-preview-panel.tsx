import { FormSection } from '@/components/forms/form-section'
import { RecipeCostSummary } from '@/features/recipes/components/recipe-cost-summary'
import type { RecipeCostPreview } from '@/features/recipes/types/recipe.types'

interface RecipeCostPreviewPanelProps {
  cost: RecipeCostPreview | null
}

export const RecipeCostPreviewPanel = ({ cost }: RecipeCostPreviewPanelProps) => (
  <FormSection title="Preview de coste" description="Panel preparado para usar cálculo persistente o preview no persistido.">
    <RecipeCostSummary cost={cost} />
  </FormSection>
)
