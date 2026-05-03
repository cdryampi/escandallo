import { Link, useParams } from '@tanstack/react-router'
import { AlertCircle, FileQuestion } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { ApiError } from '@/api/api-error'
import { useCmsPage } from '@/api/cms'
import { Button } from '@/components/ui/button'
import { CmsRenderer } from '@/features/public-site/components/cms-renderer'
import { resolveMediaUrl } from '@/lib/resolve-media-url'

interface Props {
  slug?: string
}

export const PublicCmsPage = ({ slug: propSlug }: Props) => {
  const params = useParams({ strict: false }) as Record<string, string | undefined>
  const slug = propSlug ?? params['_splat'] ?? ''
  const search = new URLSearchParams(window.location.search)
  const isPreview = search.get('preview') === 'true'
  const { data, isLoading, error } = useCmsPage(slug, isPreview)

  if (isLoading) {
    return (
      <div className="flex min-h-[68vh] items-center justify-center bg-background px-6 text-foreground">
        <div className="relative flex max-w-lg flex-col items-center text-center">
          <div className="public-chip px-4">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            <span className="type-label-md text-[10px] text-foreground/62">Cargando pagina</span>
          </div>
          <div className="mt-8 h-14 w-14 animate-spin rounded-full border-2 border-border border-t-brand" />
          <h2 className="mt-8 font-heading text-4xl tracking-[-0.03em] text-brand-strong dark:text-foreground">Preparando contenido</h2>
          <p className="mt-4 max-w-md type-body-lg text-muted-foreground">
            Cargando bloques e imagenes de la pagina publica.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    const isNotFound = error instanceof ApiError && error.status === 404

    return (
      <div className="flex min-h-[74vh] items-center justify-center bg-surface px-6 text-foreground">
        <div className="relative max-w-xl text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full border border-border/70 bg-background text-brand-strong/76 dark:text-white/76">
            {isNotFound ? <FileQuestion className="size-10" /> : <AlertCircle className="size-10" />}
          </div>

          <p className="mt-8 ui-kicker">Aviso de sistema</p>
          <h1 className="mt-5 font-heading text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.96] tracking-[-0.04em] text-brand-strong dark:text-foreground">
            {isNotFound ? 'Pagina no encontrada' : 'Error inesperado'}
          </h1>
          <p className="mx-auto mt-5 max-w-lg type-body-lg text-muted-foreground">
            {isNotFound
              ? 'La direccion solicitada no existe o aun no ha sido publicada por el equipo editorial.'
              : 'No pudimos cargar el contenido solicitado. Por favor, intenta refrescar la pagina en unos instantes.'}
          </p>

          <div className="mt-10">
            <Link to="/">
              <Button className="public-solid-button min-h-14 px-8 text-[11px]">
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return null
  }

  const metaImageUrl = resolveMediaUrl(data.meta_image_url)
  const metaDescription = data.meta_description || 'Contenido gastronomico y editorial.'
  const title = data.meta_title || `${data.name}`

  return (
    <div className="flex min-h-screen flex-col bg-background animate-in fade-in duration-500">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        {metaImageUrl ? <meta property="og:image" content={metaImageUrl} /> : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDescription} />
        {metaImageUrl ? <meta name="twitter:image" content={metaImageUrl} /> : null}
      </Helmet>

      <CmsRenderer blocks={data.blocks || []} pageId={data.id} />
    </div>
  )
}
