import { Link } from '@tanstack/react-router'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ErrorState } from '@/components/feedback/error-state'
import { LoadingState } from '@/components/feedback/loading-state'
import { RecipeStatusBadge } from '@/features/recipes/components/recipe-status-badge'
import { useRecipeQuery } from '@/features/recipes/hooks/use-recipe'

interface RecipeDetailPageProps {
  recipeId: string
}

export const RecipeDetailPage = ({ recipeId }: RecipeDetailPageProps) => {
  const recipeQuery = useRecipeQuery(recipeId)

  return (
    <div className="space-y-6">
      <BackofficePageHeader title="Detalle de receta" description="Pantalla de detalle preparada para snapshots, versiones y coste.">
        <Link to="/backoffice/recipes/$recipeId/edit" params={{ recipeId }}>
          <Button variant="outline">Editar</Button>
        </Link>
        <Link to="/backoffice/recipes/$recipeId/cost" params={{ recipeId }}>
          <Button>Ver coste</Button>
        </Link>
      </BackofficePageHeader>

      {recipeQuery.isLoading ? <LoadingState /> : null}
      {recipeQuery.isError ? (
        <ErrorState
          title="No se pudo cargar la receta"
          description="La ruta existe y queda lista aunque el backend aún no responda detalle."
          onRetry={() => recipeQuery.refetch()}
        />
      ) : null}
      {recipeQuery.data ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {recipeQuery.data.data.name}
              <RecipeStatusBadge status={recipeQuery.data.data.status} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 type-body-md text-muted-foreground">
            <p>Slug: {recipeQuery.data.data.slug}</p>
            <p>Categoría: {recipeQuery.data.data.category ?? '—'}</p>
            <p>Descripción: {recipeQuery.data.data.description ?? '—'}</p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
