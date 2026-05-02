import { useCreateContactSubmission } from '@/api/cms'
import { ApiError, ValidationError } from '@/api/api-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { PublicContactSubmissionSchema, type PublicContactSubmissionValues } from '@/features/cms/schemas/cms.schema'
import type { ContactFormBlockData } from '@/types/cms'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  data: ContactFormBlockData
  pageId?: number
}

export const ContactFormBlock = ({ data, pageId }: Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const createContactSubmission = useCreateContactSubmission()
  const form = useForm<PublicContactSubmissionValues>({
    resolver: zodResolver(PublicContactSubmissionSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const heading = data.heading || 'Contacta con nosotros'
  const recipientEmail = data.recipient_email || 'info@restaurante.test'
  const successMessage = data.success_message || 'Gracias por contactar con nosotros.'

  const handleSubmit = form.handleSubmit(async (values) => {
    if (pageId == null) {
      setSubmitError('No pudimos identificar la pagina para guardar la consulta.')
      return
    }

    setSubmitError(null)

    try {
      await createContactSubmission.mutateAsync({
        page_id: pageId,
        ...values,
      })

      setIsSubmitted(true)
      form.reset()
    } catch (error) {
      if (error instanceof ValidationError) {
        setSubmitError('Revisa los campos marcados e intenta de nuevo.')
        return
      }

      setSubmitError(
        error instanceof ApiError
          ? error.message
          : 'No pudimos enviar tu mensaje ahora mismo. Intenta de nuevo en unos minutos.',
      )
    }
  })

  return (
    <section className="bg-surface-container-low py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap">
          <div className="mb-12 w-full px-4 lg:mb-0 lg:w-1/3">
            <div className="max-w-md">
              <h2 className="mb-6 text-4xl font-bold text-on-surface font-display">{heading}</h2>
              <p className="mb-10 text-lg leading-relaxed text-on-surface-variant font-body">
                Estamos aqui para escucharle. Nuestro equipo respondera en un plazo maximo de 24 horas laborables.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Email</p>
                    <p className="text-on-surface font-body">{recipientEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-accent/10 p-3 text-accent">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Telefono</p>
                    <p className="text-on-surface font-body">+34 900 000 000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-info/10 p-3 text-info">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Ubicacion</p>
                    <p className="text-on-surface font-body">Calle de la Gastronomia, 12, Madrid</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-4 lg:w-2/3">
            <div className="rounded-2xl border border-border/50 bg-white p-8 shadow-xl md:p-12">
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-body">Nombre completo</label>
                    <Input
                      id="contact-name"
                      {...form.register('name')}
                      className="h-12 rounded-xl bg-surface-container-lowest px-4"
                      placeholder="Ej. Juan Perez"
                    />
                    {form.formState.errors.name ? <p className="ui-field-error">{form.formState.errors.name.message}</p> : null}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-body">Correo electronico</label>
                    <Input
                      id="contact-email"
                      type="email"
                      {...form.register('email')}
                      className="h-12 rounded-xl bg-surface-container-lowest px-4"
                      placeholder="Ej. juan@ejemplo.com"
                    />
                    {form.formState.errors.email ? <p className="ui-field-error">{form.formState.errors.email.message}</p> : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-body">Asunto de consulta</label>
                  <Input
                    id="contact-subject"
                    {...form.register('subject')}
                    className="h-12 rounded-xl bg-surface-container-lowest px-4"
                    placeholder="En que podemos ayudarle hoy?"
                  />
                  {form.formState.errors.subject ? <p className="ui-field-error">{form.formState.errors.subject.message}</p> : null}
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-body">Mensaje detallado</label>
                  <Textarea
                    id="contact-message"
                    {...form.register('message')}
                    rows={6}
                    className="min-h-[144px] resize-y rounded-xl bg-surface-container-lowest px-4 py-4"
                    placeholder="Escriba aqui detalles de su solicitud..."
                  />
                  {form.formState.errors.message ? <p className="ui-field-error">{form.formState.errors.message.message}</p> : null}
                </div>

                {isSubmitted ? (
                  <p className="rounded-md bg-[#DCF2E2] px-4 py-3 text-sm text-[#1E4D2B]" aria-live="polite">
                    {successMessage}
                  </p>
                ) : null}
                {submitError ? (
                  <p className="rounded-md border border-danger/20 bg-danger-soft px-4 py-3 text-sm text-danger" aria-live="polite">
                    {submitError}
                  </p>
                ) : null}

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={createContactSubmission.isPending}
                    className="group h-12 w-full rounded-xl px-8 font-bold shadow-md md:w-auto"
                  >
                    <Send className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    {createContactSubmission.isPending ? 'Enviando...' : 'Enviar mensaje'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
