import { BookOpenText, Package, ShoppingBasket, WalletCards } from 'lucide-react'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { StatCard } from '@/components/data-display/stat-card'
import { QuickActionsCard } from '@/features/dashboard/components/quick-actions-card'
import { useDashboardMetricsQuery } from '@/features/dashboard/hooks/use-dashboard-metrics'

export const DashboardPage = () => {
  const { data: metrics, isLoading } = useDashboardMetricsQuery()

  return (
    <div className="space-y-8">
      <BackofficePageHeader
        title="Resumen Operativo"
        description="Monitorización centralizada de costes, disponibilidad de materias primas y estado del recetario."
      />

      <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Materias Primas"
          value={isLoading ? '...' : metrics?.data.total_ingredients.toString() ?? '0'}
          description={`${metrics?.data.active_ingredients ?? 0} ingredientes en catálogo activo`}
          icon={Package}
        />
        <StatCard
          title="Fichas Técnicas"
          value={isLoading ? '...' : metrics?.data.total_recipes.toString() ?? '0'}
          description={`${metrics?.data.recipes_by_status.active ?? 0} escandallos publicados`}
          icon={BookOpenText}
        />
        <StatCard
          title="Proveedores"
          value={isLoading ? '...' : metrics?.data.total_suppliers.toString() ?? '0'}
          description={`${metrics?.data.active_suppliers ?? 0} entidades con suministro`}
          icon={ShoppingBasket}
        />
        <StatCard
          title="Trazabilidad"
          value={isLoading ? '...' : `${(metrics?.data.ingredients_with_images ?? 0) + (metrics?.data.recipes_with_images ?? 0)}`}
          description={`${metrics?.data.ingredients_with_images ?? 0} ítems con registro visual`}
          icon={WalletCards}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <QuickActionsCard />
        </div>
        
        <div className="rounded-[var(--ds-radius-lg)] border border-border bg-surface-raised p-8 flex flex-col justify-center text-center space-y-6 shadow-sm">
          <div className="mx-auto size-14 rounded-full bg-brand/5 border border-brand/10 flex items-center justify-center text-brand">
            <Package className="size-7" />
          </div>
          <div className="space-y-2">
            <h4 className="type-body-lg font-bold text-foreground tracking-tight">Estado del Sistema</h4>
            <p className="type-body-sm text-muted-foreground leading-relaxed">Núcleo de gestión de costes y optimización de márgenes operativos.</p>
          </div>
          <div className="pt-2 flex flex-col items-center gap-2">
             <span className="type-label-md bg-brand-muted/10 text-brand px-3 py-1 rounded border border-brand/20 font-bold">Build v1.2.0-stable</span>
             <p className="type-body-sm text-brand-muted font-medium bg-brand-strong px-2 py-0.5 rounded">CONECTADO</p>
          </div>
        </div>
      </div>
    </div>
  )
}
