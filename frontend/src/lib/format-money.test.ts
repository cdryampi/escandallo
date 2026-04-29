import { describe, expect, it } from 'vitest'
import { formatMoney } from '@/lib/format-money'

describe('formatMoney', () => {
  it('formats EUR values with two decimals', () => {
    expect(formatMoney(12.5)).toBe('12,50 €')
  })

  it('supports custom currency', () => {
    expect(formatMoney(10, {}, 'en-US', 'USD')).toBe('$10.00')
  })
})
