import { useAdminPages } from '@/api/cms'
import { EmptyState } from '@/components/feedback/empty-state'
import { ErrorState } from '@/components/feedback/error-state'
import { LoadingState } from '@/components/feedback/loading-state'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Edit2, Globe, Inbox } from 'lucide-react'

export const CmsPagesPage = () => {
  const { data: pages = [], isLoading, error, refetch } = useAdminPages()

  return (
    <div className="space-y-6">
      <BackofficePageHeader
        title="Gestion de Contenido (CMS)"
        description="Administra paginas publicas y secciones editoriales del sitio."
      />

      <div className="flex justify-end">
        <Button asChild variant="outline" size="sm">
          <Link to="/backoffice/cms/inbox">
            <Inbox className="size-4" />
            Abrir buzon
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <LoadingState
          title="Cargando paginas CMS"
          description="Recuperando estructura editorial, versiones y estado de publicacion."
        />
      ) : error ? (
        <ErrorState
          title="No se pudo cargar listado CMS"
          description="Backend devolvio error o payload inesperado. Reintenta para refrescar estado real del modulo."
          actionLabel="Reintentar carga"
          onRetry={() => void refetch()}
        />
      ) : pages.length === 0 ? (
        <EmptyState
          title="No hay paginas CMS"
          description="Cuando existan paginas base o nuevas plantillas editoriales, apareceran aqui."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex h-full flex-col rounded-[var(--ds-radius-lg)] border border-border bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="type-headline-sm truncate font-bold text-foreground">{page.name}</h3>
                  <p className="type-body-sm text-muted-foreground">{page.slug === 'home' ? '/' : `/${page.slug}`}</p>
                </div>
                <span
                  className={
                    page.is_active
                      ? 'rounded-sm bg-[#DCF2E2] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1E4D2B]'
                      : 'rounded-sm bg-danger-soft/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-danger'
                  }
                >
                  {page.is_active ? 'Activa' : 'Inactiva'}
                </span>
              </div>

              <div className="space-y-2 pb-4 text-xs text-muted-foreground">
                <p>
                  Borrador: {page.draft_version ? `v${page.draft_version.version_number}` : 'sin borrador'}
                </p>
                <p>
                  Publicada:{' '}
                  {page.published_version ? `v${page.published_version.version_number}` : 'sin version publicada'}
                </p>
                <p>Menu principal: {page.show_in_menu ? 'visible' : 'oculta'}</p>
              </div>

              <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                <Link
                  to="/backoffice/cms/pages/$pageId/content"
                  params={{ pageId: page.id.toString() }}
                  className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-container"
                >
                  <Edit2 className="size-4" />
                  Editar
                </Link>
                <a
                  href={page.slug === 'home' ? '/' : `/${page.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded bg-surface-container px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-container-high"
                >
                  <Globe className="size-4" />
                  Ver publica
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
