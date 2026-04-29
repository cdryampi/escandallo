import { describe, expect, it } from 'vitest'
import { ingredientFiltersSchema, ingredientSchema } from '@/features/ingredients/schemas/ingredient.schema'

describe('ingredient schemas', () => {
  it('coerces numeric fields into numbers', () => {
    const result = ingredientSchema.parse({
      name: 'Tomate',
      base_unit_id: '1',
      default_waste_percentage: '5',
      default_yield_percentage: '95',
      is_active: true,
    })

    expect(result.base_unit_id).toBe(1)
    expect(result.default_waste_percentage).toBe(5)
    expect(result.default_yield_percentage).toBe(95)
  })

  it('provides default list filters', () => {
    const result = ingredientFiltersSchema.parse({})

    expect(result.page).toBe(1)
    expect(result.perPage).toBe(15)
    expect(result.sort).toBe('name')
  })
})
