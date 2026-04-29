import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { ErrorState } from '@/components/feedback/error-state'
import { LoadingState } from '@/components/feedback/loading-state'
import { RecipeCostSummary } from '@/features/recipes/components/recipe-cost-summary'
import { useRecipeCostQuery } from '@/features/recipes/hooks/use-recipe-cost'

interface RecipeCostPageProps {
  versionId: string
}

export const RecipeCostPage = ({ versionId }: RecipeCostPageProps) => {
  const recipeCostQuery = useRecipeCostQuery(versionId)

  return (
    <div className="space-y-6">
      <BackofficePageHeader title="Coste de receta" description="Preview aislado y preparado para snapshots del backend." />
      {recipeCostQuery.isLoading ? <LoadingState /> : null}
      {recipeCostQuery.isError ? (
        <ErrorState
          title="No se pudo calcular el coste"
          description="El backend aún puede no exponer cálculo de receta, pero la página y su contrato ya están separados."
          onRetry={() => recipeCostQuery.refetch()}
        />
      ) : null}
      {recipeCostQuery.data ? <RecipeCostSummary cost={recipeCostQuery.data.data} /> : null}
    </div>
  )
}
