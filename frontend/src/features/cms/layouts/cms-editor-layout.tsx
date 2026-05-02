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
  PanelLeft,
  PanelRight,
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

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useState } from 'react'
import { SortableBlockItem } from '../components/SortableBlockItem'
import { cn } from '@/lib/utils'

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
    setWorkingBlocks,
    updateWorkingBlock,
    deviceMode,
    setDeviceMode,
    showSidebar,
    setShowSidebar,
    showInspector,
    setShowInspector,
  } = useCmsEditorStore()

  const [activeId, setActiveId] = useState<string | null>(null)

  const publishVersion = usePublishPageVersion()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = workingBlocks.findIndex((block) => block.id === active.id)
    const newIndex = workingBlocks.findIndex((block) => block.id === over.id)

    setWorkingBlocks(arrayMove(workingBlocks, oldIndex, newIndex))
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

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
  const activeBlock = workingBlocks.find((b) => b.id === activeId)

  // Dynamic grid column template
  const gridCols = cn(
    'grid h-full grid-cols-1 overflow-hidden transition-all duration-300',
    showSidebar && showInspector && 'xl:grid-cols-[280px_minmax(0,1fr)_360px]',
    showSidebar && !showInspector && 'xl:grid-cols-2',
    !showSidebar && showInspector && 'xl:grid-cols-2',
    !showSidebar && !showInspector && 'xl:grid-cols-1'
  )

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col overflow-hidden bg-surface-container-lowest antialiased">
      <header className="z-40 flex h-14 shrink-0 items-center justify-between border-b border-border bg-white px-4 shadow-sm md:px-6">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            to="/backoffice/cms/pages"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary active:scale-95"
            title="Volver a páginas"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div className="flex min-w-0 flex-col">
            <h1 className="max-w-[200px] truncate text-sm font-bold tracking-tight text-on-surface lg:max-w-[300px]">
              {page.name}
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="flex h-1.5 w-1.5 rounded-full bg-success" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                {page.slug === 'home' ? '/' : `/${page.slug}`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-border/50 bg-surface-container-low p-1 shadow-inner">
          <Button
            variant={showSidebar ? 'secondary' : 'ghost'}
            size="icon"
            className={cn("h-8 w-10 rounded-lg transition-all", showSidebar && 'shadow-sm')}
            onClick={() => setShowSidebar(!showSidebar)}
            title={showSidebar ? 'Ocultar Navegación' : 'Mostrar Navegación'}
          >
            <PanelLeft className="size-4" />
          </Button>

          <div className="mx-1 h-4 w-px bg-border/60" />

          <Button
            variant={deviceMode === 'mobile' ? 'secondary' : 'ghost'}
            size="icon"
            className={`h-8 w-10 rounded-lg transition-all ${deviceMode === 'mobile' ? 'shadow-sm' : ''}`}
            onClick={() => setDeviceMode('mobile')}
            title="Vista Móvil (375px)"
          >
            <Smartphone className="size-4" />
          </Button>
          <Button
            variant={deviceMode === 'tablet' ? 'secondary' : 'ghost'}
            size="icon"
            className={`h-8 w-10 rounded-lg transition-all ${deviceMode === 'tablet' ? 'shadow-sm' : ''}`}
            onClick={() => setDeviceMode('tablet')}
            title="Vista Tablet (768px)"
          >
            <TabletIcon className="size-4" />
          </Button>
          <Button
            variant={deviceMode === 'desktop' ? 'secondary' : 'ghost'}
            size="icon"
            className={`h-8 w-10 rounded-lg transition-all ${deviceMode === 'desktop' ? 'shadow-sm' : ''}`}
            onClick={() => setDeviceMode('desktop')}
            title="Vista Escritorio (Ancho completo)"
          >
            <Monitor className="size-4" />
          </Button>

          <div className="mx-1 h-4 w-px bg-border/60" />

          <Button
            variant={showInspector ? 'secondary' : 'ghost'}
            size="icon"
            className={cn("h-8 w-10 rounded-lg transition-all", showInspector && 'shadow-sm')}
            onClick={() => setShowInspector(!showInspector)}
            title={showInspector ? 'Ocultar Inspector' : 'Mostrar Inspector'}
          >
            <PanelRight className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExternalPreview}
            className="h-9 gap-2 rounded-xl border-dashed px-4 font-medium transition-all hover:border-solid hover:bg-surface-container-low"
          >
            <ExternalLink className="size-4" />
            <span className="hidden sm:inline">Previsualizar</span>
          </Button>
          <div className="hidden h-6 w-px bg-border sm:block" />
          <Button
            size="sm"
            onClick={handlePublish}
            disabled={publishVersion.isPending}
            className="h-9 gap-2 rounded-xl px-5 font-bold shadow-md transition-all active:scale-95"
          >
            <Send className="size-4" />
            {publishVersion.isPending ? 'Publicando...' : 'Publicar'}
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className={gridCols}>
            {showSidebar && (
              <aside className="hidden min-h-0 border-r border-border bg-white p-4 animate-in slide-in-from-left duration-300 xl:block xl:w-full">
                <CmsEditorSidebar />
              </aside>
            )}

            <main className="min-h-0 overflow-y-auto bg-surface-container-low custom-scrollbar">
              <div className="mx-auto h-full p-4 md:p-6 xl:p-8">
                <Outlet />
              </div>
            </main>

            {showInspector && (
              <aside className="hidden min-h-0 border-l border-border bg-white animate-in slide-in-from-right duration-300 xl:flex xl:flex-col xl:overflow-hidden xl:w-full">
                {selectedBlock ? (
                  <div className="flex h-full flex-col animate-in fade-in duration-300 ease-out">
                    <div className="flex items-center justify-between border-b border-border bg-surface-container-lowest p-4 px-5">
                      <div className="flex flex-col gap-0.5">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                          Propiedades del Bloque
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="rounded-md border border-primary/30 bg-primary/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                            {selectedBlock.type.replace('Block', '')}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-surface-container"
                        onClick={() => setSelectedBlockId(null)}
                        title="Cerrar inspector"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>

                    <div className="custom-scrollbar flex-1 overflow-y-auto p-6 pb-24">
                      <BlockFormSwitcher
                        block={selectedBlock}
                        onSubmit={(data) => {
                          updateWorkingBlock(selectedBlock.id, data)
                          toast.success('Cambios aplicados', {
                            description: 'La vista previa se ha actualizado.',
                            duration: 2000,
                          })
                        }}
                        onCancel={() => setSelectedBlockId(null)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-8 text-center bg-surface-container-lowest/40">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 scale-150 animate-pulse rounded-full bg-primary/5 blur-xl" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-border/50 bg-white shadow-sm transition-transform hover:scale-105">
                        <Layout className="size-10 text-muted-foreground/20" />
                      </div>
                    </div>
                    <div className="max-w-[240px] space-y-3">
                      <h4 className="text-sm font-bold text-on-surface">Configuración de Bloques</h4>
                      <p className="text-[11px] leading-relaxed text-muted-foreground">
                        Selecciona cualquier bloque del canvas o de la estructura lateral para ajustar su contenido y apariencia.
                      </p>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-primary/30" />
                      <span>Editor en tiempo real</span>
                    </div>
                  </div>
                )}
              </aside>
            )}
          </div>

          <DragOverlay dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: {
                  opacity: '0.5',
                },
              },
            }),
          }}>
            {activeId && activeBlock ? (
              <div className="w-[400px] opacity-90 shadow-2xl ring-2 ring-primary rounded-xl overflow-hidden pointer-events-none">
                <SortableBlockItem
                  block={activeBlock}
                  isActive={true}
                  onEdit={() => {}}
                  onToggleVisibility={() => {}}
                  onDelete={() => {}}
                  onMoveUp={() => {}}
                  onMoveDown={() => {}}
                  isFirst={false}
                  isLast={false}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}
