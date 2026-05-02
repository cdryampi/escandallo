import { Link } from '@tanstack/react-router'
import { Plus, TableProperties, FileText } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const actions = [
  { label: 'Alta de Ingrediente', to: '/backoffice/ingredients/create', icon: Plus, variant: 'primary' },
  { label: 'Control de Catálogo', to: '/backoffice/ingredients', icon: TableProperties, variant: 'outline' },
  { label: 'Nueva Ficha Técnica', to: '/backoffice/recipes/create', icon: Plus, variant: 'primary' },
  { label: 'Libro de Recetas', to: '/backoffice/recipes', icon: TableProperties, variant: 'outline' },
  { label: 'Gestión de Contenidos', to: '/backoffice/cms/pages', icon: FileText, variant: 'outline' },
]

export const QuickActionsCard = () => (
  <Card className="h-full border-border shadow-sm">
    <CardHeader className="pb-4">
      <CardTitle className="type-headline-sm">Acciones Directas</CardTitle>
      <CardDescription className="type-body-sm">Accesos rápidos para la gestión diaria del inventario y escandallos.</CardDescription>
    </CardHeader>
    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {actions.map((action) => (
        <Link
          key={action.to}
          to={action.to as '/backoffice/ingredients'}
          className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 transition-all hover:border-brand/40 hover:bg-brand-muted/5 group"
        >
          <div className="size-8 rounded bg-surface-subtle flex items-center justify-center text-muted-foreground group-hover:text-brand transition-colors">
            <action.icon className="size-4" />
          </div>
          <span className="type-body-md font-medium text-foreground">{action.label}</span>
        </Link>
      ))}
    </CardContent>
  </Card>
)
