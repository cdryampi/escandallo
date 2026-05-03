import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCreateContactSubmission } from '@/api/cms'
import { ApiError, ValidationError } from '@/api/api-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PublicContactSubmissionSchema, type PublicContactSubmissionValues } from '@/features/cms/schemas/cms.schema'
import type { ContactFormBlockData } from '@/types/cms'

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
    <section className="public-section bg-background">
      <div className="public-container grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
        <div className="public-surface-card relative overflow-hidden p-8 md:p-10">
          <div className="relative">
            <p className="ui-kicker">Atencion directa</p>
            <h2 className="mt-6 type-display-md text-brand-strong dark:text-foreground">{heading}</h2>
            <div className="public-divider" />
            <p className="public-intro type-body-lg">
              Si deseas reservar o preparar una visita especial, escribe con calma. Respuesta clara, tono sobrio.
            </p>

            <div className="mt-12 space-y-4">
              {[
                { icon: Mail, label: 'Correo Editorial', value: recipientEmail },
                { icon: Phone, label: 'Atencion Telefonica', value: '+34 915 200 480' },
                { icon: MapPin, label: 'Ubicacion', value: 'Calle Arenal, 14 - Madrid' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-[1.1rem] border border-border/70 bg-background px-5 py-5"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brand/10 bg-brand/[0.05] text-brand">
                    <item.icon className="size-5" />
                  </div>
                  <div>
                    <p className="type-label-md text-[10px] tracking-[0.14em] text-brand/38">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold text-brand-strong dark:text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="public-surface-card relative overflow-hidden p-8 md:p-10">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-brand/[0.04] blur-3xl" />
          <div className="relative">
            <div className="mb-10">
              <p className="ui-kicker">Formulario de Solicitud</p>
              <h3 className="mt-5 font-heading text-[2.5rem] tracking-[-0.04em] text-brand-strong dark:text-foreground">Reserva o consulta con detalle</h3>
              <p className="mt-4 max-w-2xl type-body-sm leading-relaxed text-muted-foreground">
                Cuentanos el contexto. Misma claridad funcional. Menos tono administrativo.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field label="Nombre" error={form.formState.errors.name?.message}>
                  <Input
                    id="contact-name"
                    {...form.register('name')}
                    className="h-12 rounded-[1rem] border-border/60 bg-background px-4 focus-visible:border-brand/40 focus-visible:ring-brand/5"
                    placeholder="Juan Perez"
                  />
                </Field>

                <Field label="Email" error={form.formState.errors.email?.message}>
                  <Input
                    id="contact-email"
                    type="email"
                    {...form.register('email')}
                    className="h-12 rounded-[1rem] border-border/60 bg-background px-4 focus-visible:border-brand/40 focus-visible:ring-brand/5"
                    placeholder="juan@ejemplo.com"
                  />
                </Field>
              </div>

              <Field label="Asunto" error={form.formState.errors.subject?.message}>
                <Input
                  id="contact-subject"
                  {...form.register('subject')}
                  className="h-12 rounded-[1rem] border-border/60 bg-background px-4 focus-visible:border-brand/40 focus-visible:ring-brand/5"
                  placeholder="Reserva privada o consulta general"
                />
              </Field>

              <Field label="Mensaje" error={form.formState.errors.message?.message}>
                <Textarea
                  id="contact-message"
                  {...form.register('message')}
                  rows={5}
                  className="min-h-[160px] rounded-[1rem] border-border/60 bg-background px-4 py-4 focus-visible:border-brand/40 focus-visible:ring-brand/5"
                  placeholder="Detalla tu solicitud aqui..."
                />
              </Field>

              {isSubmitted ? (
                <div className="animate-in slide-in-from-bottom-2 fade-in rounded-[1rem] border border-success/20 bg-success-soft/30 px-4 py-4 type-body-sm font-medium text-success-foreground" aria-live="polite">
                  {successMessage}
                </div>
              ) : null}

              {submitError ? (
                <div className="animate-in slide-in-from-bottom-2 fade-in rounded-[1rem] border border-danger/20 bg-danger-soft/30 px-4 py-4 type-body-sm font-medium text-danger-foreground" aria-live="polite">
                  {submitError}
                </div>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="type-label-md text-[10px] tracking-[0.14em] text-brand/36">Respuesta habitual en menos de 24 horas laborables</p>
                <Button
                  type="submit"
                  disabled={createContactSubmission.isPending}
                  className="group h-14 rounded-full bg-brand-strong px-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-brand hover:shadow-overlay active:scale-[0.98]"
                >
                  {createContactSubmission.isPending ? 'Enviando...' : (
                    <>
                      <span>Enviar solicitud</span>
                      <Send className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

interface FieldProps {
  label: string
  error?: string
  children: React.ReactNode
}

const Field = ({ label, error, children }: FieldProps) => (
  <div className="space-y-2">
    <label className="type-label-md text-[10px] tracking-[0.14em] text-brand-strong/56 dark:text-white/56">{label}</label>
    {children}
    {error ? <p className="mt-1 text-xs font-medium text-danger">{error}</p> : null}
  </div>
)
