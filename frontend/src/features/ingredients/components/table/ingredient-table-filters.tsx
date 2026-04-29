import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { IngredientFilters } from '@/features/ingredients/types/ingredient.types'

interface IngredientTableFiltersProps {
  filters: IngredientFilters
  onFiltersChange: (patch: Partial<IngredientFilters>) => void
}

export const IngredientTableFilters = ({ filters, onFiltersChange }: IngredientTableFiltersProps) => {
  const [search, setSearch] = useState(filters.search)
  const lastAppliedSearch = useRef(filters.search)

  useEffect(() => {
    if (filters.search !== lastAppliedSearch.current) {
      setSearch(filters.search)
      lastAppliedSearch.current = filters.search
    }
  }, [filters.search])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (search !== lastAppliedSearch.current) {
        onFiltersChange({ search, page: 1 })
        lastAppliedSearch.current = search
      }
    }, 300)

    return () => window.clearTimeout(timeout)
  }, [onFiltersChange, search])

  return (
    <div className="flex flex-col gap-3 rounded-[var(--ds-radius-lg)] border border-border bg-surface-raised p-4 md:flex-row md:items-center">
      <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar ingrediente..." className="md:max-w-sm" />
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => onFiltersChange({ direction: filters.direction === 'asc' ? 'desc' : 'asc' })}>
          Orden {filters.direction === 'asc' ? 'ascendente' : 'descendente'}
        </Button>
        <Button variant="outline" onClick={() => onFiltersChange({ search: '', page: 1 })}>
          Limpiar
        </Button>
      </div>
    </div>
  )
}
