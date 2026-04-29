import { FormSection } from '@/components/forms/form-section'

export const RecipeVersionPanel = () => (
  <FormSection title="Versionado" description="Hueco reservado para versionado, aprobación y snapshots.">
    <p className="type-body-sm text-muted-foreground">
      La arquitectura del feature ya separa versiones e items para crecer sin refactor traumático.
    </p>
  </FormSection>
)
