import { zodResolver } from '@hookform/resolvers/zod'
import { Palette } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { useLandingData, useUpdateLandingModule } from '@/api/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { buildPublicThemeVars, DEFAULT_PALETTE } from '@/features/public-site/lib/public-theme'
import {
  SiteStylesSettingsSchema,
  type SiteStylesSettingsValues,
} from '@/features/settings/schemas/settings.schema'

const resolvePalette = (palette?: Partial<{ brand: string; brand_strong: string; accent: string }> | null) => ({
  brand: palette?.brand ?? DEFAULT_PALETTE.brand,
  brand_strong: palette?.brand_strong ?? DEFAULT_PALETTE.brand_strong,
  accent: palette?.accent ?? DEFAULT_PALETTE.accent,
})

export const SettingsStylesPage = () => {
  const { data: landing } = useLandingData()
  const updateBranding = useUpdateLandingModule<{
    name?: string
    tagline?: string
    logo_url?: string
    palette: {
      brand: string
      brand_strong: string
      accent: string
    }
  }>('branding')

  const form = useForm<SiteStylesSettingsValues>({
    resolver: zodResolver(SiteStylesSettingsSchema),
    values: {
      palette: resolvePalette(landing?.branding?.palette),
    },
  })

  const watchedPalette = useWatch({
    control: form.control,
    name: 'palette',
  }) ?? DEFAULT_PALETTE

  const previewStyle = buildPublicThemeVars(watchedPalette)

  const onSubmit = async (values: SiteStylesSettingsValues) => {
    try {
      await updateBranding.mutateAsync({
        name: landing?.branding?.name,
        tagline: landing?.branding?.tagline,
        logo_url: landing?.branding?.logo_url,
        palette: values.palette,
      })

      toast.success('Estilos guardados.')
    } catch {
      toast.error('No pudimos guardar los estilos.')
    }
  }

  const colorFields = [
    {
      name: 'palette.brand' as const,
      label: 'Marca base',
      help: 'Botones principales, enlaces activos y tono de firma.',
      error: form.formState.errors.palette?.brand?.message,
      value: watchedPalette.brand,
    },
    {
      name: 'palette.brand_strong' as const,
      label: 'Marca profunda',
      help: 'Bloques oscuros, header superior y fondo de footer.',
      error: form.formState.errors.palette?.brand_strong?.message,
      value: watchedPalette.brand_strong,
    },
    {
      name: 'palette.accent' as const,
      label: 'Acento',
      help: 'Highlights, chips y llamadas secundarias.',
      error: form.formState.errors.palette?.accent?.message,
      value: watchedPalette.accent,
    },
  ]

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_360px]">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-brand/10 p-2 text-brand">
            <Palette className="size-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-on-surface">Estilos del sitio publico</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ajusta la paleta editorial base de la landing. Esto afecta hero, CTA, header, footer y bloques que usen tokens de marca.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {colorFields.map((field) => (
            <div key={field.name} className="space-y-2 rounded-2xl border border-border bg-surface-container-lowest p-4">
              <label className="ui-field-label">{field.label}</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={field.value}
                  onChange={(event) => form.setValue(field.name, event.target.value, { shouldValidate: true })}
                  className="h-11 w-14 cursor-pointer rounded-lg border border-border bg-white p-1"
                  aria-label={field.label}
                />
                <Input {...form.register(field.name)} className="font-mono uppercase" />
              </div>
              <p className="text-xs text-muted-foreground">{field.help}</p>
              <p className="ui-field-error">{field.error ?? ' '}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[1.5rem] border border-border/70 bg-white p-4" style={previewStyle}>
          <div className="overflow-hidden rounded-[1.25rem] border border-border/70 bg-background">
            <div className="border-b border-border/60 bg-brand-strong px-5 py-3 text-brand-foreground">
              <p className="type-label-md text-brand-muted">Vista previa</p>
              <p className="mt-1 font-display text-xl font-semibold">
                Asi respira la landing con esta paleta.
              </p>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="type-label-md text-accent-foreground">Acento editorial</span>
                </div>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-brand-strong">
                  Color con jerarquia, no color por decorar.
                </h3>
                <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                  La paleta debe guiar lectura, contraste y personalidad. Aqui vemos CTA, bloques profundos y acentos trabajando juntos.
                </p>
                <div className="mt-5 flex gap-3">
                  <span className="inline-flex rounded-full bg-brand px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-foreground">
                    CTA principal
                  </span>
                  <span className="inline-flex rounded-full border border-brand/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                    Secundario
                  </span>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-2xl border border-border/70 bg-surface-raised p-4">
                  <p className="type-label-md text-muted-foreground">Marca</p>
                  <div className="mt-3 h-10 rounded-xl bg-brand" />
                </div>
                <div className="rounded-2xl border border-border/70 bg-surface-raised p-4">
                  <p className="type-label-md text-muted-foreground">Profundidad</p>
                  <div className="mt-3 h-10 rounded-xl bg-brand-strong" />
                </div>
                <div className="rounded-2xl border border-border/70 bg-surface-raised p-4">
                  <p className="type-label-md text-muted-foreground">Acento</p>
                  <div className="mt-3 h-10 rounded-xl bg-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-border pt-4">
          <Button type="submit" disabled={updateBranding.isPending}>
            {updateBranding.isPending ? 'Guardando...' : 'Guardar estilos'}
          </Button>
        </div>
      </form>

      <aside className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h3 className="text-sm font-bold text-on-surface">Que toca esta paleta</h3>
        <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
          <li>`Marca base`: enlaces, botones y elementos de interacción.</li>
          <li>`Marca profunda`: secciones oscuras, franja superior y footer.</li>
          <li>`Acento`: indicadores, chips y focos secundarios.</li>
        </ul>
      </aside>
    </div>
  )
}
