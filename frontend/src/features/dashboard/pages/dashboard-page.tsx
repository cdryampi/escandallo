import { Link } from '@tanstack/react-router'
import {
  AlertTriangle,
  BadgePercent,
  BookOpenText,
  Euro,
  FileText,
  History,
  Inbox,
  TrendingUp,
} from 'lucide-react'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/data-display/stat-card'
import { QuickActionsCard } from '@/features/dashboard/components/quick-actions-card'
import { useDashboardMetricsQuery } from '@/features/dashboard/hooks/use-dashboard-metrics'
import { RecipeStatusBadge } from '@/features/recipes/components/recipe-status-badge'

export const DashboardPage = () => {
  const { data: metrics, isLoading } = useDashboardMetricsQuery()

  return (
    <div className="space-y-8">
      <BackofficePageHeader
        title="Dashboard de Gestion"
        description="Analisis integral de costes, rentabilidad y actividad operativa del CMS."
      />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
        <StatCard
          title="Total de Recetas"
          value={isLoading ? '...' : metrics?.data.total_recipes.toString() ?? '0'}
          description={`${metrics?.data.recipes_by_status.active ?? 0} fichas tecnicas activas`}
          icon={BookOpenText}
        />
        <StatCard
          title="Coste Medio / Plato"
          value={isLoading ? '...' : `${metrics?.data.avg_cost_per_plate.toFixed(2)} €`}
          description="Basado en escandallos activos"
          icon={Euro}
        />
        <StatCard
          title="Ingredientes en Alerta"
          value={isLoading ? '...' : metrics?.data.ingredients_in_alert_count.toString() ?? '0'}
          description="Posible subida de precios detectada"
          icon={AlertTriangle}
        />
        <StatCard
          title="Margen de Ganancia"
          value={isLoading ? '...' : `${metrics?.data.avg_profit_margin.toFixed(1)} %`}
          description="Promedio de rentabilidad bruta"
          icon={BadgePercent}
        />
        <StatCard
          title="Paginas CMS"
          value={isLoading ? '...' : metrics?.data.cms.active_pages.toString() ?? '0'}
          description={`${metrics?.data.cms.pages_with_draft ?? 0} con borrador activo`}
          icon={FileText}
        />
        <StatCard
          title="Consultas Nuevas"
          value={isLoading ? '...' : metrics?.data.cms.contact_submissions.new.toString() ?? '0'}
          description="Mensajes pendientes de revisar"
          icon={Inbox}
        />
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="type-body-lg font-bold">Evolucion de Costes</CardTitle>
                <p className="mt-1 type-body-sm text-muted-foreground">Variacion mensual de la materia prima principal</p>
              </div>
              <div className="flex items-center gap-2 text-success">
                <TrendingUp className="size-4" />
                <span className="type-label-sm font-bold">+5.2%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative flex h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-[var(--ds-radius-lg)] border-2 border-dashed border-border bg-muted/30">
                <div className="absolute inset-x-0 bottom-0 flex h-32 items-end justify-between px-8 pb-4 opacity-5">
                  <div className="h-16 w-12 rounded-t-md bg-brand" />
                  <div className="h-24 w-12 rounded-t-md bg-brand" />
                  <div className="h-20 w-12 rounded-t-md bg-brand" />
                  <div className="h-32 w-12 rounded-t-md bg-brand" />
                  <div className="h-28 w-12 rounded-t-md bg-brand" />
                </div>
                <p className="type-body-sm font-medium text-muted-foreground">Cargando grafico de tendencias...</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <QuickActionsCard />

          <Card>
            <CardHeader>
              <CardTitle className="type-body-lg font-bold">Alertas de Alergenos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 rounded-[var(--ds-radius-lg)] border border-warning/20 bg-warning/10 p-4">
                <AlertTriangle className="size-5 shrink-0 text-warning" />
                <div className="space-y-1">
                  <p className="type-body-sm font-bold text-warning-foreground">Cambio en Proveedor</p>
                  <p className="type-body-xs text-warning-foreground/80">Nueva traza de frutos secos en Aceite de Oliva.</p>
                </div>
              </div>
              <div className="space-y-3 border-t border-border pt-4">
                <p className="type-label-sm font-black uppercase tracking-widest text-muted-foreground">Estado del Sistema</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-success" />
                    <span className="type-body-sm font-medium">Servidor API</span>
                  </div>
                  <span className="type-label-sm text-success">ONLINE</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-success" />
                    <span className="type-body-sm font-medium">Base de Datos</span>
                  </div>
                  <span className="type-label-sm text-success">OPTIMIZADA</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="type-body-lg font-bold">Estado CMS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="type-body-sm text-muted-foreground">Publicadas</span>
                <span className="font-semibold">{metrics?.data.cms.published_pages ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="type-body-sm text-muted-foreground">Con borrador</span>
                <span className="font-semibold">{metrics?.data.cms.pages_with_draft ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="type-body-sm text-muted-foreground">Consultas resueltas</span>
                <span className="font-semibold">{metrics?.data.cms.contact_submissions.resolved ?? 0}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <Link
                  to="/backoffice/cms/pages"
                  className="inline-flex items-center rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-container-low"
                >
                  Abrir paginas
                </Link>
                <Link
                  to="/backoffice/cms/inbox"
                  className="inline-flex items-center rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-container-low"
                >
                  Abrir buzon
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-brand/10 p-2 text-brand">
              <History className="size-5" />
            </div>
            <div>
              <CardTitle className="type-body-lg font-bold">Ultimas Recetas Modificadas</CardTitle>
              <p className="type-body-sm text-muted-foreground">Acceso rapido a los ajustes de costes mas recientes</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  <th className="px-4 py-4">Receta</th>
                  <th className="px-4 py-4 text-center">Coste</th>
                  <th className="px-4 py-4 text-center">Margen</th>
                  <th className="px-4 py-4 text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={4} className="rounded-lg bg-muted/10 px-4 py-6" />
                    </tr>
                  ))
                ) : (
                  metrics?.data.latest_recipes.map((recipe) => (
                    <tr key={recipe.id} className="transition-colors hover:bg-muted/30">
                      <td className="px-4 py-4 font-bold text-foreground">{recipe.name}</td>
                      <td className="px-4 py-4 text-center font-medium tabular-nums">{recipe.cost.toFixed(2)} €</td>
                      <td className="px-4 py-4 text-center">
                        <span className="type-label-sm rounded bg-success-soft px-2 py-1 font-bold text-success-foreground">
                          {recipe.margin}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <RecipeStatusBadge status={recipe.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
