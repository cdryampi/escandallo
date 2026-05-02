import { Link } from '@tanstack/react-router'
import { Database } from 'lucide-react'
import { MediaThumb } from '@/components/media/media-thumb'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ErrorState } from '@/components/feedback/error-state'
import { LoadingState } from '@/components/feedback/loading-state'
import { Table, TableCell, TableContainer, TableHeadCell } from '@/components/ui/table'
import { RecipeStatusBadge } from '@/features/recipes/components/recipe-status-badge'
import { useRecipeQuery } from '@/features/recipes/hooks/use-recipe'

interface RecipeDetailPageProps {
  recipeId: string
}

export const RecipeDetailPage = ({ recipeId }: RecipeDetailPageProps) => {
  const recipeQuery = useRecipeQuery(recipeId)

  if (recipeQuery.isLoading) return <LoadingState title="Cargando ficha técnica" description="Recuperando composición e ingredientes..." />
  if (recipeQuery.isError) {
    return (
      <ErrorState
        title="Error al cargar la receta"
        description="No se ha podido recuperar la información técnica de esta receta. Por favor, inténtalo de nuevo."
        onRetry={() => recipeQuery.refetch()}
      />
    )
  }

  const recipe = recipeQuery.data?.data

  if (!recipe) return null

  return (
    <div className="space-y-8 pb-12">
      <BackofficePageHeader 
        title={recipe.name} 
        description={recipe.description || 'Sin descripción técnica registrada.'}
      >
        <div className="flex items-center gap-3">
          <Link to="/backoffice/recipes/$recipeId/edit" params={{ recipeId }}>
            <Button variant="outline">Editar Ficha</Button>
          </Link>
          <Link to="/backoffice/recipes/$recipeId/cost" params={{ recipeId }}>
            <Button className="bg-accent hover:bg-accent/90">Análisis de Costes</Button>
          </Link>
        </div>
      </BackofficePageHeader>

      <div className="grid gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1 space-y-6">
          <div className="rounded border border-border bg-surface-raised overflow-hidden shadow-sm">
            <div className="aspect-square bg-surface-muted flex items-center justify-center border-b border-border/30">
              <MediaThumb
                src={recipe.image_url}
                alt={recipe.name}
                className="size-full rounded-none border-none object-cover"
              />
            </div>
            <div className="p-5 space-y-5">
              <div className="flex items-center justify-between">
                <span className="type-label-md text-muted-foreground opacity-80">ESTADO OPERATIVO</span>
                <RecipeStatusBadge status={recipe.status} />
              </div>
              <div className="pt-4 border-t border-border/30 space-y-5">
                <div className="flex flex-col">
                  <span className="type-label-md text-muted-foreground opacity-80 mb-1.5">IDENTIFICADOR (SLUG)</span>
                  <code className="type-body-sm font-mono bg-surface-muted px-2 py-1 rounded border border-border/30 text-foreground truncate">
                    {recipe.slug}
                  </code>
                </div>
                <div className="flex flex-col">
                  <span className="type-label-md text-muted-foreground opacity-80 mb-1">CATEGORÍA DE PRODUCTO</span>
                  <p className="type-body-md font-bold text-foreground">{recipe.category ?? 'General'}</p>
                </div>
                <div className="flex flex-col">
                  <span className="type-label-md text-muted-foreground opacity-80 mb-1">RENDIMIENTO ESPERADO</span>
                  <div className="flex items-baseline gap-1">
                    <p className="type-display-md text-foreground tabular-nums">{recipe.yield_portions ?? '—'}</p>
                    <span className="type-body-sm text-muted-foreground font-medium uppercase tracking-tight">Raciones</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded border border-brand/10 bg-brand/5 p-5 space-y-3">
             <h4 className="type-label-md text-brand font-bold">CONTROL DE CALIDAD</h4>
             <p className="type-body-sm text-brand/80 leading-relaxed">
               Cada actualización en la ficha técnica impacta directamente en el margen bruto. Revise los gramajes operativos periódicamente.
             </p>
          </div>
        </aside>

        <div className="lg:col-span-3 space-y-6">
          <Card className="border-border shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-surface-muted/50 py-3 border-b border-border/50">
              <CardTitle className="type-headline-sm">Composición de Producción</CardTitle>
              <span className="type-label-md bg-brand-strong text-brand-foreground px-2.5 py-1 rounded font-bold">
                {recipe.items?.length ?? 0} {recipe.items?.length === 1 ? 'MATERIA PRIMA' : 'MATERIAS PRIMAS'}
              </span>
            </CardHeader>
            <CardContent className="p-0">
              {recipe.items && recipe.items.length > 0 ? (
                <TableContainer className="border-none rounded-none">
                  <Table>
                    <thead>
                      <tr>
                        <TableHeadCell className="bg-surface/50 border-b border-border/50">Ingrediente</TableHeadCell>
                        <TableHeadCell className="bg-surface/50 border-b border-border/50 text-right">Cantidad Operativa</TableHeadCell>
                        <TableHeadCell className="bg-surface/50 border-b border-border/50 text-right">Notas de Cocina</TableHeadCell>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {recipe.items.map((item) => (
                        <tr key={item.id} className="transition-colors hover:bg-table-hover/50">
                          <TableCell className="font-semibold py-3">{item.ingredient_name ?? '—'}</TableCell>
                          <TableCell className="text-right py-3">
                            <span className="type-tabular font-bold">{item.quantity}</span>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground ml-1.5 opacity-70 tracking-tight">
                              {item.unit?.symbol ?? ''}
                            </span>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground type-body-sm py-3">
                            {item.notes ?? <span className="opacity-30">—</span>}
                          </TableCell>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </TableContainer>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                  <div className="size-12 rounded-full bg-surface-muted flex items-center justify-center text-muted-foreground mb-4">
                    <Database className="size-6" />
                  </div>
                  <h4 className="type-body-lg font-semibold text-foreground">Sin ingredientes registrados</h4>
                  <p className="type-body-md text-muted-foreground mt-1 max-w-sm">
                    Esta receta aún no tiene componentes asociados. Es necesario añadirlos para calcular el escandallo.
                  </p>
                  <Link to="/backoffice/recipes/$recipeId/edit" params={{ recipeId }} className="mt-6">
                    <Button variant="outline">Gestionar Composición</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="rounded-[var(--ds-radius-lg)] border border-border border-dashed p-8 flex flex-col items-center justify-center text-center bg-surface-muted/10">
             <p className="type-body-sm text-muted-foreground max-w-lg">
               La ficha técnica es el documento base para la estandarización de procesos y el control de mermas en cocina. 
               Asegúrate de que las cantidades operativas reflejen la realidad de la producción.
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}
