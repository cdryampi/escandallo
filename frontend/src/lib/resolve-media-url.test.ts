import { describe, expect, it } from 'vitest'
import { resolveMediaUrl } from '@/lib/resolve-media-url'

describe('resolveMediaUrl', () => {
  it('returns null for missing values', () => {
    expect(resolveMediaUrl()).toBeNull()
    expect(resolveMediaUrl(null)).toBeNull()
    expect(resolveMediaUrl('')).toBeNull()
  })

  it('keeps absolute urls as-is', () => {
    expect(resolveMediaUrl('https://cdn.example.com/photo.png')).toBe('https://cdn.example.com/photo.png')
  })

  it('expands backend relative storage paths', () => {
    expect(resolveMediaUrl('/storage/images/recipes/salsa-tomate-base.png')).toBe(
      'http://localhost:8080/storage/images/recipes/salsa-tomate-base.png',
    )
  })
})
