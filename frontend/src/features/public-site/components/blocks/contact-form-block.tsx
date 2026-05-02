import type { ContactFormBlockData } from '@/types/cms'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'

interface Props {
  data: ContactFormBlockData
}

export const ContactFormBlock = ({ data }: Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const heading = data.heading || 'Contacta con nosotros'
  const recipientEmail = data.recipient_email || 'info@escandallo.test'
  const successMessage = data.success_message || 'Gracias por contactar con nosotros.'

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
                onSubmit={(event) => {
                  event.preventDefault()
                  setIsSubmitted(true)
                }}
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-body">Nombre completo</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-4 text-on-surface transition-all font-body focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Ej. Juan Perez"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-body">Correo electronico</label>
                    <input
                      type="email"
                      className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-4 text-on-surface transition-all font-body focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Ej. juan@ejemplo.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-body">Asunto de consulta</label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-4 text-on-surface transition-all font-body focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="En que podemos ayudarle hoy?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-body">Mensaje detallado</label>
                  <textarea
                    rows={6}
                    className="w-full resize-y rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-4 text-on-surface transition-all font-body focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Escriba aqui detalles de su solicitud..."
                    required
                  />
                </div>

                {isSubmitted ? (
                  <p className="rounded-md bg-[#DCF2E2] px-4 py-3 text-sm text-[#1E4D2B]" aria-live="polite">
                    {successMessage}
                  </p>
                ) : null}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-md transition-all duration-200 font-body hover:bg-primary-container hover:shadow-lg active:scale-[0.98] md:w-auto"
                  >
                    <Send className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    Enviar mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
