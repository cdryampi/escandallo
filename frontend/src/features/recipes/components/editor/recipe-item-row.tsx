import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { RecipeItemDraft } from '@/features/recipes/types/recipe.types'

interface RecipeItemRowProps {
  item: RecipeItemDraft
  onChange: (patch: Partial<RecipeItemDraft>) => void
  onRemove: () => void
}

export const RecipeItemRow = ({ item, onChange, onRemove }: RecipeItemRowProps) => (
  <div className="grid gap-3 rounded-[var(--ds-radius-lg)] border border-border bg-surface-raised p-4 md:grid-cols-[1.6fr_0.8fr_0.5fr_auto]">
    <Input value={item.name} onChange={(event) => onChange({ name: event.target.value })} placeholder="Nombre del item" />
    <Input
      type="number"
      step="0.01"
      value={item.quantity}
      onChange={(event) => onChange({ quantity: Number(event.target.value) })}
    />
    <Input value={item.unit} onChange={(event) => onChange({ unit: event.target.value })} placeholder="g" />
    <Button variant="ghost" onClick={onRemove}>
      <Trash2 className="size-4" />
    </Button>
  </div>
)
