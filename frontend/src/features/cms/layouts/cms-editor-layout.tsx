import { Link, Outlet, useParams } from '@tanstack/react-router'
import {
  ArrowLeft,
  ExternalLink,
  Layout,
  Monitor,
  Send,
  Smartphone,
  Tablet as TabletIcon,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  useAdminPage,
  useAdminPageDraft,
  usePublishPageVersion,
} from '@/api/cms'
import { ErrorState } from '@/components/feedback/error-state'
import { LoadingState } from '@/components/feedback/loading-state'
import { Button } from '@/components/ui/button'
import { BlockFormSwitcher } from '../components/BlockFormSwitcher'
import { CmsEditorSidebar } from '../components/CmsEditorSidebar'
import { useCmsEditorStore } from '../stores/cms-editor-store'

export const CmsEditorLayout = () => {
  const { pageId } = useParams({ from: '/backoffice/cms/pages/$pageId' })
  const parsedPageId = Number(pageId)

  const {
    data: page,
    isLoading: isPageLoading,
    error: pageError,
    refetch: refetchPage,
  } = useAdminPage(parsedPageId)

  const {
    data: draft,
    isLoading: isDraftLoading,
    error: draftError,
    refetch: refetchDraft,
  } = useAdminPageDraft(parsedPageId)

  const {
    selectedBlockId,
    setSelectedBlockId,
    workingBlocks,
    updateWorkingBlock,
    deviceMode,
    setDeviceMode,
  } = useCmsEditorStore()

  const publishVersion = usePublishPageVersion()

  if (isPageLoading || isDraftLoading) {
    return (
      <LoadingState
        title="Cargando editor CMS"
        description="Preparando bloques, SEO y estado de publicacion..."
      />
    )
  }

  if (pageError || draftError || !page || !draft) {
    return (
      <ErrorState
        title="Error al cargar el editor"
        description="No se pudo recuperar la informacion de la pagina."
        onRetry={() => {
          void refetchPage()
          void refetchDraft()
        }}
      />
    )
  }

  const handleExternalPreview = () => {
    const url = page.slug === 'home' ? '/?preview=true' : `/${page.slug}?preview=true`
    window.open(url, '_blank')
  }

  const handlePublish = () => {
    if (!window.confirm('Publicar esta version?')) return

    publishVersion.mutate(draft.id, {
      onSuccess: () => toast.success('Pagina publicada con exito.'),
      onError: () => toast.error('Error al publicar.'),
    })
  }

  const selectedBlock = workingBlocks.find((block) => block.id === selectedBlockId)

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col overflow-hidden bg-surface-container-lowest">
      <header className="z-30 flex h-14 shrink-0 items-center justify-between border-b border-border bg-white px-4 shadow-sm md:px-6">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            to="/backoffice/cms/pages"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-muted-foreground transition-colors hover:bg-surface-container-low hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div className="flex min-w-0 flex-col">
            <h1 className="max-w-[220px] truncate text-sm font-bold">{page.name}</h1>
            <span className="text-[10px] text-muted-foreground">
              {page.slug === 'home' ? '/' : `/${page.slug}`}
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-1 rounded-lg border border-border/50 bg-surface-container-low p-1 md:flex">
          <Button
            variant={deviceMode === 'mobile' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setDeviceMode('mobile')}
          >
            <Smartphone className="size-4" />
          </Button>
          <Button
            variant={deviceMode === 'tablet' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setDeviceMode('tablet')}
          >
            <TabletIcon className="size-4" />
          </Button>
          <Button
            variant={deviceMode === 'desktop' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setDeviceMode('desktop')}
          >
            <Monitor className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExternalPreview}
            className="h-9 gap-2 border-dashed"
          >
            <ExternalLink className="size-4" />
            <span className="hidden sm:inline">Ver sitio</span>
          </Button>
          <div className="hidden h-6 w-px bg-border sm:block" />
          <Button
            size="sm"
            onClick={handlePublish}
            disabled={publishVersion.isPending}
            className="h-9 gap-2 px-4 shadow-sm"
          >
            <Send className="size-4" />
            {publishVersion.isPending ? 'Publicando...' : 'Publicar'}
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <div className="grid h-full grid-cols-1 overflow-hidden xl:grid-cols-[280px_minmax(0,1fr)_360px]">
          <aside className="hidden min-h-0 border-r border-border bg-white p-4 xl:block">
            <CmsEditorSidebar />
          </aside>

          <main className="min-h-0 overflow-y-auto bg-surface-container-low custom-scrollbar">
            <div className="mx-auto h-full p-4 md:p-6 xl:p-8">
              <Outlet />
            </div>
          </main>

          <aside className="hidden min-h-0 border-l border-border bg-white xl:flex xl:flex-col xl:overflow-hidden">
            {selectedBlock ? (
              <div className="flex h-full flex-col animate-in slide-in-from-right duration-200">
                <div className="flex items-center justify-between border-b border-border bg-surface-container-lowest p-4">
                  <div>
                    <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Inspector de bloque
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="rounded border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold uppercase text-primary">
                        {selectedBlock.type}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setSelectedBlockId(null)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>

                <div className="custom-scrollbar flex-1 overflow-y-auto p-6 pb-24">
                  <BlockFormSwitcher
                    block={selectedBlock}
                    onSubmit={(data) => {
                      updateWorkingBlock(selectedBlock.id, data)
                      toast.success('Cambios aplicados a la preview.', {
                        description: 'Recuerda guardar la pagina para persistir los cambios.',
                        duration: 2000,
                      })
                    }}
                    onCancel={() => setSelectedBlockId(null)}
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center space-y-4 bg-surface-container-lowest/30 p-8 text-center">
                <div className="rounded-full border border-border/50 bg-surface-container p-6">
                  <Layout className="size-8 text-muted-foreground/30" />
                </div>
                <div className="max-w-[220px]">
                  <h4 className="text-sm font-bold text-on-surface">Panel de propiedades</h4>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                    Selecciona un bloque del arbol o de la estructura central para editar su contenido.
                  </p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
