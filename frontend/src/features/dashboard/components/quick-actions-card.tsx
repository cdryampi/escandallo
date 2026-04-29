import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const actions = [
  { label: 'Ir a ingredientes', to: '/backoffice/ingredients' },
  { label: 'Ir a recetas', to: '/backoffice/recipes' },
  { label: 'Ir a CMS', to: '/backoffice/cms/pages' },
]

export const QuickActionsCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Accesos rápidos</CardTitle>
      <CardDescription>Navegación base del backoffice preparada por módulos.</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <Link
          key={action.to}
          to={action.to}
          className="rounded-full border border-border bg-surface-raised px-4 py-2 type-body-md font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-muted"
        >
          {action.label}
        </Link>
      ))}
    </CardContent>
  </Card>
)
