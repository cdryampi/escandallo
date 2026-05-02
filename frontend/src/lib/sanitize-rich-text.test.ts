import { describe, expect, it } from 'vitest'
import { sanitizeRichText } from '@/lib/sanitize-rich-text'

describe('sanitizeRichText', () => {
  it('keeps allowed structural tags', () => {
    expect(sanitizeRichText('<h2>Titulo</h2><p><strong>Texto</strong></p>')).toBe(
      '<h2>Titulo</h2><p><strong>Texto</strong></p>',
    )
  })

  it('removes scripts and inline event handlers', () => {
    expect(sanitizeRichText('<p onclick="alert(1)">Hola</p><script>alert(1)</script>')).toBe('<p>Hola</p>')
  })

  it('drops unsafe javascript links but keeps safe local links', () => {
    expect(sanitizeRichText('<a href="javascript:alert(1)">Bad</a><a href="/contacto">Good</a>')).toBe(
      '<a>Bad</a><a href="/contacto">Good</a>',
    )
  })
})
