import type { LucideIcon } from 'lucide-react'
import {
  BookOpenText,
  ChartColumnBig,
  FileText,
  LayoutDashboard,
  Package,
  Scale,
  Settings,
  ShieldCheck,
  ShoppingBasket,
  Users,
} from 'lucide-react'

export interface NavigationItem {
  label: string
  to: string
  icon: LucideIcon
}

export const backofficeNavigation: NavigationItem[] = [
  { label: 'Dashboard', to: '/backoffice', icon: LayoutDashboard },
  { label: 'Recetas', to: '/backoffice/recipes', icon: BookOpenText },
  { label: 'Ingredientes', to: '/backoffice/ingredients', icon: Package },
  { label: 'Proveedores', to: '/backoffice/suppliers', icon: ShoppingBasket },
  { label: 'Alérgenos', to: '/backoffice/allergens', icon: ShieldCheck },
  { label: 'Unidades', to: '/backoffice/units', icon: Scale },
  { label: 'CMS', to: '/backoffice/cms/pages', icon: FileText },
  { label: 'Usuarios', to: '/backoffice/users', icon: Users },
  { label: 'Reportes', to: '/backoffice/reports', icon: ChartColumnBig },
  { label: 'Ajustes', to: '/backoffice/settings', icon: Settings },
]
