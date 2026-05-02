import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { ContactFormBlock } from './contact-form-block'

const mutateAsync = vi.fn()

vi.mock('@/api/cms', () => ({
  useCreateContactSubmission: () => ({
    mutateAsync,
    isPending: false,
  }),
}))

describe('ContactFormBlock', () => {
  beforeEach(() => {
    mutateAsync.mockReset()
    mutateAsync.mockResolvedValue({})
  })

  it('submits validated contact data with page id', async () => {
    render(
      <ContactFormBlock
        pageId={7}
        data={{
          heading: 'Escribenos',
          recipient_email: 'contacto@test.dev',
          success_message: 'Recibido',
        }}
      />,
    )

    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Ada Lovelace' },
    })
    fireEvent.change(screen.getByLabelText(/correo electronico/i), {
      target: { value: 'ada@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/asunto de consulta/i), {
      target: { value: 'Reserva de grupo' },
    })
    fireEvent.change(screen.getByLabelText(/mensaje detallado/i), {
      target: { value: 'Necesito informacion para una mesa grande.' },
    })

    fireEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    await waitFor(() =>
      expect(mutateAsync).toHaveBeenCalledWith({
        page_id: 7,
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        subject: 'Reserva de grupo',
        message: 'Necesito informacion para una mesa grande.',
      }),
    )

    expect(await screen.findByText('Recibido')).toBeDefined()
  })
})
