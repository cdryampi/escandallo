import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatMoney } from '@/lib/format-money'
import type { RecipeCostPreview } from '@/features/recipes/types/recipe.types'

interface RecipeCostSummaryProps {
  cost: RecipeCostPreview | null
}

export const RecipeCostSummary = ({ cost }: RecipeCostSummaryProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Resumen de coste</CardTitle>
      <CardDescription>Panel desacoplado para snapshot o preview de cálculo.</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-3 md:grid-cols-3">
      <div>
        <p className="type-label-md text-muted-foreground">Coste total</p>
        <p className="mt-1 text-foreground type-headline-sm type-tabular">{cost ? formatMoney(cost.totalCost) : '—'}</p>
      </div>
      <div>
        <p className="type-label-md text-muted-foreground">Coste por ración</p>
        <p className="mt-1 text-foreground type-headline-sm type-tabular">{cost ? formatMoney(cost.costPerServing) : '—'}</p>
      </div>
      <div>
        <p className="type-label-md text-muted-foreground">Precio venta</p>
        <p className="mt-1 text-foreground type-headline-sm type-tabular">
          {cost?.sellingPrice != null ? formatMoney(cost.sellingPrice) : '—'}
        </p>
      </div>
    </CardContent>
  </Card>
)
