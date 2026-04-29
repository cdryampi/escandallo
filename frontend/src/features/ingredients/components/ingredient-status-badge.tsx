import { StatusBadge } from '@/components/data-display/status-badge'

interface IngredientStatusBadgeProps {
  active: boolean
}

export const IngredientStatusBadge = ({ active }: IngredientStatusBadgeProps) => (
  <StatusBadge tone={active ? 'success' : 'warning'}>{active ? 'Activo' : 'Inactivo'}</StatusBadge>
)
