import { Outlet, Link, useParams } from '@tanstack/react-router'
import {
  useAdminPage,
  useAdminPageDraft,
  usePublishPageVersion,
} from '@/api/cms'
import { LoadingState } from '@/components/feedback/loading-state'
import { ErrorState } from '@/components/feedback/error-state'
import { Button } from '@/components/ui/button'
import {
  Send,
  ArrowLeft,
  Smartphone,
  Tablet as TabletIcon,
  Monitor,
  Layout,
  X,
  ExternalLink,
} from 'lucide-react'
import { toast } from 'sonner'
import { CmsEditorSidebar } from '../components/CmsEditorSidebar'
import { useCmsEditorStore } from '../stores/cms-editor-store'
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable'
import { BlockFormSwitcher } from '../components/BlockFormSwitcher'

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
        description="Preparando bloques, SEO y estado de publicación..."
      />
    )
  }

  if (pageError || draftError || !page || !draft) {
    return (
      <ErrorState
        title="Error al cargar el editor"
        description="No se pudo recuperar la información de la página."
        onRetry={() => {
          void refetchPage()
          void refetchDraft()
        }}
      />
    )
  }

  const handleExternalPreview = () => {
    const url = `/${page.slug}?preview=true`
    window.open(url, '_blank')
  }

  const handlePublish = () => {
    if (!window.confirm('¿Publicar esta versión?')) return
    publishVersion.mutate(draft.id, {
      onSuccess: () => toast.success('Página publicada con éxito.'),
      onError: () => toast.error('Error al publicar.'),
    })
  }

  const selectedBlock = workingBlocks.find((b) => b.id === selectedBlockId)

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] -m-6 overflow-hidden bg-surface-container-lowest">
      {/* Barra de Herramientas Superior */}
      <header className="flex h-14 items-center justify-between border-b border-border bg-white px-6 shadow-sm shrink-0 z-30">
        <div className="flex items-center gap-4">
          <Link
            to="/backoffice/cms/pages"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-muted-foreground transition-colors hover:bg-surface-container-low hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold truncate max-w-[200px]">{page.name}</h1>
            <span className="text-[10px] text-muted-foreground">/{page.slug}</span>
          </div>
        </div>

        {/* Device Toggles */}
        <div className="hidden md:flex items-center gap-1 rounded-lg bg-surface-container-low p-1 border border-border/50">
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

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExternalPreview} className="gap-2 h-9 border-dashed">
            <ExternalLink className="size-4" />
            <span className="hidden sm:inline">Ver Sitio</span>
          </Button>
          <div className="h-6 w-px bg-border" />
          <Button
            size="sm"
            onClick={handlePublish}
            disabled={publishVersion.isPending}
            className="gap-2 h-9 px-4 shadow-sm"
          >
            <Send className="size-4" />
            {publishVersion.isPending ? 'Publicando...' : 'Publicar'}
          </Button>
        </div>
      </header>

      {/* Área Principal con Paneles Resizables */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup orientation="horizontal">
          {/* Columna 1: Navegación y Árbol */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25} className="bg-white border-r border-border p-4">
            <CmsEditorSidebar />
          </ResizablePanel>

          <ResizableHandle className="w-1 bg-transparent hover:bg-primary/10 transition-colors" />

          {/* Columna 2: Canvas / Área de Trabajo */}
          <ResizablePanel defaultSize={50} minSize={30} className="bg-surface-container-low overflow-y-auto relative custom-scrollbar">
             <div className="p-8 mx-auto h-full">
                <Outlet />
             </div>
          </ResizablePanel>

          <ResizableHandle className="w-1 bg-transparent hover:bg-primary/10 transition-colors" />

          {/* Columna 3: Propiedades / Inspector */}
          <ResizablePanel defaultSize={30} minSize={20} maxSize={40} className="bg-white border-l border-border flex flex-col overflow-hidden shadow-2xl">
            {selectedBlock ? (
              <div className="flex flex-col h-full animate-in slide-in-from-right duration-200">
                <div className="p-4 border-b border-border bg-surface-container-lowest flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Inspector de Bloque</h3>
                    <div className="flex items-center gap-2">
                       <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold uppercase text-primary border border-primary/20">
                          {selectedBlock.type}
                       </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setSelectedBlockId(null)}>
                    <X className="size-4" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar pb-40">
                  <BlockFormSwitcher
                    block={selectedBlock}
                    onSubmit={(data) => {
                       updateWorkingBlock(selectedBlock.id, data)
                       toast.success('Cambios aplicados a la preview.', {
                         description: 'Recuerda guardar la página para persistir los cambios.',
                         duration: 2000
                       })
                    }}
                    onCancel={() => setSelectedBlockId(null)}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4 bg-surface-container-lowest/30">
                <div className="rounded-full bg-surface-container p-6 border border-border/50">
                  <Layout className="size-8 text-muted-foreground/30" />
                </div>
                <div className="max-w-[200px]">
                  <h4 className="text-sm font-bold text-on-surface">Panel de Propiedades</h4>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                    Selecciona un bloque del árbol de la izquierda o de la estructura central para editar su contenido y configuración.
                  </p>
                </div>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
