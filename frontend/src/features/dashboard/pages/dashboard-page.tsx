import { BookOpenText, Package, ShoppingBasket, WalletCards } from 'lucide-react'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { StatCard } from '@/components/data-display/stat-card'
import { QuickActionsCard } from '@/features/dashboard/components/quick-actions-card'

export const DashboardPage = () => (
  <div className="space-y-6">
    <BackofficePageHeader
      title="Dashboard"
      description="Resumen operativo inicial. Los datos vivos de negocio se irán conectando por feature sin romper la shell."
    />

    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Ingredientes" value="0" description="Lista conectable a backend vía Query." icon={Package} />
      <StatCard title="Recetas" value="0" description="Editor modular preparado para crecer." icon={BookOpenText} />
      <StatCard title="Proveedores" value="0" description="Módulo shell funcional en ruta propia." icon={ShoppingBasket} />
      <StatCard title="Coste medio" value="€0,00" description="Placeholder operativo hasta conectar reportes." icon={WalletCards} />
    </section>

    <QuickActionsCard />
  </div>
)
