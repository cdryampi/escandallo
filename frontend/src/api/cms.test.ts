import { describe, expect, it } from 'vitest'
import { unwrapCmsData } from '@/api/cms'

describe('unwrapCmsData', () => {
  it('returns data from Laravel resource wrapper', () => {
    expect(unwrapCmsData({ data: [{ id: 1 }] })).toEqual([{ id: 1 }])
  })

  it('returns raw payload when endpoint has no wrapper', () => {
    expect(unwrapCmsData({ url: '/storage/images/cms/example.png' })).toEqual({
      url: '/storage/images/cms/example.png',
    })
  })
})
