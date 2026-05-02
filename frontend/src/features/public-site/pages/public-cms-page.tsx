import { ApiError } from '@/api/api-error'
import { useCmsPage } from '@/api/cms'
import { Button } from '@/components/ui/button'
import { CmsRenderer } from '@/features/public-site/components/cms-renderer'
import { resolveMediaUrl } from '@/lib/resolve-media-url'
import { Link, useParams } from '@tanstack/react-router'
import { AlertCircle, FileQuestion } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

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
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <div className="text-lg text-on-surface-variant font-body animate-pulse">Preparando experiencia editorial...</div>
      </div>
    )
  }

  if (error) {
    const isNotFound = error instanceof ApiError && error.status === 404

    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4 text-center">
        {isNotFound ? (
          <>
            <div className="mb-6 rounded-full bg-surface-container p-4 text-on-surface-variant">
              <FileQuestion className="h-16 w-16" />
            </div>
            <h1 className="mb-2 text-4xl font-bold text-on-surface font-display">Pagina no encontrada</h1>
            <p className="mb-8 max-w-md text-lg text-on-surface-variant font-body">
              Pagina no existe o aun no fue publicada por equipo editorial.
            </p>
          </>
        ) : (
          <>
            <div className="mb-6 rounded-full bg-error/10 p-4 text-error">
              <AlertCircle className="h-16 w-16" />
            </div>
            <h1 className="mb-2 text-4xl font-bold text-on-surface font-display">Error inesperado</h1>
            <p className="mb-8 max-w-md text-lg text-on-surface-variant font-body">
              No pudimos cargar contenido ahora mismo. Intenta de nuevo mas tarde.
            </p>
          </>
        )}
        <Link to="/">
          <Button size="lg" className="font-semibold">
            Volver al inicio
          </Button>
        </Link>
      </div>
    )
  }

  if (!data) {
    return null
  }

  const metaImageUrl = resolveMediaUrl(data.meta_image_url)
  const metaDescription = data.meta_description || 'Contenido gastronómico y eventos.'
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
