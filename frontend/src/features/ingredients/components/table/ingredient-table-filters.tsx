import { useEffect, useRef, useState } from 'react'
import { Search, ArrowUpDown, X } from 'lucide-react'
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
    <div className="flex flex-col gap-3 rounded-[var(--ds-radius-lg)] border border-border bg-surface px-4 py-3 md:flex-row md:items-center justify-between shadow-sm">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input 
          value={search} 
          onChange={(event) => setSearch(event.target.value)} 
          placeholder="Filtrar por nombre o SKU..." 
          className="pl-9 bg-surface-raised" 
        />
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2 text-muted-foreground"
          onClick={() => onFiltersChange({ direction: filters.direction === 'asc' ? 'desc' : 'asc' })}
        >
          <ArrowUpDown className="size-3.5" />
          Orden {filters.direction === 'asc' ? 'ascendente' : 'descendente'}
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => onFiltersChange({ search: '', page: 1 })}
        >
          <X className="size-3.5" />
          Limpiar
        </Button>
      </div>
    </div>
  )
}
