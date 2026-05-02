import type { ReactNode } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CmsInboxPage } from './cms-inbox-page'

const mutate = vi.fn()

const listState = {
  data: {
    data: [
      {
        id: 4,
        page_id: 2,
        page: { id: 2, slug: 'contacto', name: 'Contacto' },
        name: 'Ada',
        email: 'ada@example.com',
        subject: 'Reserva',
        message: 'Necesito una mesa.',
        status: 'new' as const,
        read_at: null,
        resolved_at: null,
        created_at: '2026-05-02T12:00:00Z',
        updated_at: '2026-05-02T12:00:00Z',
      },
    ],
    meta: {
      counts: {
        new: 1,
        read: 0,
        resolved: 0,
      },
    },
  },
  isLoading: false,
  error: null,
  refetch: vi.fn(),
}

vi.mock('@/api/cms', () => ({
  useAdminContactSubmissions: () => listState,
  useAdminContactSubmission: () => ({
    data: listState.data.data[0],
    isLoading: false,
  }),
  useUpdateContactSubmissionStatus: () => ({
    mutate,
    isPending: false,
  }),
}))

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-router')>('@tanstack/react-router')

  return {
    ...actual,
    Link: ({ children, to }: { children: ReactNode; to: string }) => <a href={to}>{children}</a>,
  }
})

describe('CmsInboxPage', () => {
  beforeEach(() => {
    mutate.mockReset()
  })

  it('renders inbox summary and detail', async () => {
    render(<CmsInboxPage />)

    expect(screen.getByText('Buzon CMS')).toBeDefined()
    expect(screen.getAllByText('Reserva').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contacto').length).toBeGreaterThan(0)
    expect(screen.getByText('Necesito una mesa.')).toBeDefined()
  })

  it('updates status from detail panel', async () => {
    render(<CmsInboxPage />)

    fireEvent.click(screen.getByRole('button', { name: 'Resuelta' }))

    await waitFor(() =>
      expect(mutate).toHaveBeenCalledWith({
        submissionId: 4,
        status: 'resolved',
      }),
    )
  })
})
