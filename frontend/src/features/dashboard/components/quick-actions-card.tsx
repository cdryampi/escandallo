import { Link } from '@tanstack/react-router'
import { FileText, Inbox, Plus, TableProperties } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const actions = [
  { label: 'Alta de Ingrediente', to: '/backoffice/ingredients/create', icon: Plus },
  { label: 'Control de Catalogo', to: '/backoffice/ingredients', icon: TableProperties },
  { label: 'Nueva Ficha Tecnica', to: '/backoffice/recipes/create', icon: Plus },
  { label: 'Libro de Recetas', to: '/backoffice/recipes', icon: TableProperties },
  { label: 'Gestion de Contenidos', to: '/backoffice/cms/pages', icon: FileText },
  { label: 'Buzon CMS', to: '/backoffice/cms/inbox', icon: Inbox },
]

export const QuickActionsCard = () => (
  <Card className="h-full border-border shadow-sm">
    <CardHeader className="pb-4">
      <CardTitle className="type-headline-sm">Acciones Directas</CardTitle>
      <CardDescription className="type-body-sm">Accesos rapidos para catalogo, recetas y supervision del CMS.</CardDescription>
    </CardHeader>
    <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {actions.map((action) => (
        <Link
          key={action.to}
          to={action.to as '/backoffice/ingredients'}
          className="group flex items-center gap-3 rounded-md border border-border bg-surface/30 px-4 py-3 transition-all hover:border-brand/40 hover:bg-surface-elevated"
        >
          <div className="flex size-8 items-center justify-center rounded-sm bg-surface-elevated text-muted-foreground transition-colors group-hover:text-brand border border-border/50 shadow-soft">
            <action.icon className="size-4" />
          </div>
          <span className="type-body-md font-semibold text-foreground tracking-tight">{action.label}</span>
        </Link>
      ))}
    </CardContent>
  </Card>
)
