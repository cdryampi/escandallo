import { Quote } from 'lucide-react'
import type { TestimonialsBlockData } from '@/types/cms'

interface Props {
  data: TestimonialsBlockData
}

export const TestimonialsBlock = ({ data }: Props) => {
  if (!data.title && data.testimonials.length === 0) {
    return null
  }

  const [leadTestimonial, ...otherTestimonials] = data.testimonials

  return (
    <section className="public-section bg-surface">
      <div className="public-container relative space-y-14">
        <div className="public-heading">
          <p className="ui-kicker">Confianza y recuerdo</p>
          {data.title ? <h2 className="mt-6 type-display-md text-brand-strong dark:text-foreground">{data.title}</h2> : null}
          <div className="public-divider" />
          <p className="public-intro type-body-lg">{data.intro}</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          {leadTestimonial ? (
            <article className="public-surface-card relative overflow-hidden p-8 md:p-12">
              <Quote className="size-10 text-brand/18" />
              <p className="mt-8 max-w-3xl font-heading text-[clamp(2rem,4.5vw,4rem)] leading-[1.06] tracking-[-0.04em] text-brand-strong dark:text-foreground">
                "{leadTestimonial.quote}"
              </p>
              <div className="mt-10 public-stat-rule" />
              <div className="mt-6">
                <p className="text-lg font-semibold text-brand-strong dark:text-foreground">{leadTestimonial.author}</p>
                <p className="mt-2 type-label-md text-[10px] tracking-[0.16em] text-brand/42">{leadTestimonial.source}</p>
              </div>
            </article>
          ) : null}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
            {otherTestimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.author}-${index}`}
                className="public-surface-card flex flex-col justify-between p-7"
              >
                <p className="font-heading text-[1.65rem] leading-[1.12] tracking-[-0.03em] text-brand-strong dark:text-foreground">
                  "{testimonial.quote}"
                </p>
                <div className="mt-8 border-t border-border/70 pt-5">
                  <p className="text-sm font-semibold text-brand-strong dark:text-foreground">{testimonial.author}</p>
                  <p className="mt-2 type-label-md text-[10px] tracking-[0.16em] text-brand/42">{testimonial.source}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
