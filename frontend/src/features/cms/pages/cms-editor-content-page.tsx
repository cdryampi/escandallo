import { useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Eye, Layout, Save, Settings2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  useAdminPage,
  useAdminPageDraft,
  useUpdatePageVersion,
} from '@/api/cms'
import { ErrorState } from '@/components/feedback/error-state'
import { LoadingState } from '@/components/feedback/loading-state'
import { Button } from '@/components/ui/button'
import type { BlockType } from '@/types/cms'
import { createDefaultBlock } from '@/types/cms'
import { BlockSelector } from '../components/BlockSelector'
import { SortableBlockItem } from '../components/SortableBlockItem'
import { useCmsEditorStore } from '../stores/cms-editor-store'
import { EditorCanvasRenderer } from '../components/EditorCanvasRenderer'

export const CmsEditorContentPage = () => {
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
    removeWorkingBlock,
    viewMode,
    setViewMode,
    deviceMode,
    customWidth,
    setCustomWidth,
  } = useCmsEditorStore()

  const updateVersion = useUpdatePageVersion()

  useEffect(() => {
    if (!draft) return

    setWorkingBlocks(draft.blocks)

    const currentSelectedBlockId = useCmsEditorStore.getState().selectedBlockId
    const nextSelectedBlockId = draft.blocks.some((block) => block.id === currentSelectedBlockId)
      ? currentSelectedBlockId
      : draft.blocks[0]?.id ?? null
    setSelectedBlockId(nextSelectedBlockId)
  }, [draft, setSelectedBlockId, setWorkingBlocks])

  if (isPageLoading || isDraftLoading) {
    return (
      <div className="flex h-full items-center justify-center py-20">
        <LoadingState
          title="Cargando contenido"
          description="Recuperando bloques editoriales..."
        />
      </div>
    )
  }

  if (pageError || draftError || !page || !draft) {
    return (
      <div className="flex h-full items-center justify-center py-20">
        <ErrorState
          title="Error en el canvas"
          description="No se pudo cargar la estructura de bloques en el area de trabajo."
          onRetry={() => {
            void refetchPage()
            void refetchDraft()
          }}
        />
      </div>
    )
  }

  const handleToggleVisibility = (id: string) => {
    setWorkingBlocks(
      workingBlocks.map((block) =>
        block.id === id ? { ...block, is_visible: !block.is_visible } : block
      )
    )
  }

  const handleDeleteBlock = (id: string) => {
    if (!window.confirm('Eliminar este bloque?')) return

    removeWorkingBlock(id)
    toast.success('Bloque eliminado del borrador', {
      description: 'Guarda la pagina o publica para persistir este cambio.',
    })
  }

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= workingBlocks.length) return

    setWorkingBlocks(arrayMove(workingBlocks, index, targetIndex))
  }

  const handleAddBlock = (type: BlockType) => {
    const newBlock = createDefaultBlock(type)
    setWorkingBlocks([...workingBlocks, newBlock])
    setSelectedBlockId(newBlock.id)
  }

  const handleSave = () => {
    // Explicitly use the latest workingBlocks from the store/state
    updateVersion.mutate(
      { versionId: draft.id, data: { blocks: workingBlocks } },
      { 
        onSuccess: () => {
          toast.success('Cambios guardados', {
            description: 'El contenido de la página se ha actualizado en el servidor.',
          })
        },
        onError: (error) => {
          toast.error('Error al guardar', {
            description: error instanceof Error ? error.message : 'No se pudo persistir el contenido.',
          })
        }
      }
    )
  }

  const canvasWidths: Record<string, string> = {
    mobile: '375px',
    tablet: '768px',
    desktop: '100%',
  }

  const handleResize = (e: React.MouseEvent | MouseEvent) => {
    const container = document.getElementById('canvas-container')
    if (!container) return

    const rect = container.getBoundingClientRect()
    // Calculate width relative to the center of the viewport
    const newWidth = Math.abs((e.clientX - (rect.left + rect.width / 2)) * 2)
    const constrainedWidth = Math.min(Math.max(newWidth, 320), rect.width)
    setCustomWidth(constrainedWidth)
  }

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleResize)
    document.addEventListener('mouseup', stopResizing)
  }

  const stopResizing = () => {
    document.removeEventListener('mousemove', handleResize)
    document.removeEventListener('mouseup', stopResizing)
  }

  return (
    <div className="flex h-full flex-col space-y-6">
      <div className="sticky top-0 z-20 flex items-center justify-between bg-surface-container-low/90 px-1 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-white p-1 shadow-sm">
          <Button
            variant={viewMode === 'structure' ? 'secondary' : 'ghost'}
            size="sm"
            className="h-8 gap-2"
            onClick={() => setViewMode('structure')}
          >
            <Settings2 className="size-3.5" />
            Estructura
          </Button>
          <Button
            variant={viewMode === 'preview' ? 'secondary' : 'ghost'}
            size="sm"
            className="h-8 gap-2"
            onClick={() => setViewMode('preview')}
          >
            <Eye className="size-3.5" />
            Vista previa
          </Button>
        </div>

        <Button
          onClick={handleSave}
          disabled={updateVersion.isPending}
          className="h-9 gap-2 shadow-md"
        >
          <Save className="size-4" />
          {updateVersion.isPending ? 'Guardando...' : 'Guardar página'}
        </Button>
      </div>

      <div className="flex-1 min-h-0 flex flex-col" id="canvas-container">
        {viewMode === 'structure' ? (
          <div className="mx-auto w-full max-w-3xl space-y-4">
            {workingBlocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-white/50 py-32 text-center">
                <div className="mb-4 rounded-full bg-surface-container p-6">
                  <Layout className="size-12 text-muted-foreground/20" />
                </div>
                <h3 className="text-sm font-bold text-on-surface">Pagina sin contenido</h3>
                <p className="mb-6 text-xs text-muted-foreground">
                  Anade tu primer bloque para empezar.
                </p>
                <BlockSelector onAddBlock={handleAddBlock} />
              </div>
            ) : (
              <>
                <SortableContext
                  items={workingBlocks.map((block) => block.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3 pb-20">
                    {workingBlocks.map((block, index) => (
                      <SortableBlockItem
                        key={block.id}
                        block={block}
                        isActive={selectedBlockId === block.id}
                        onEdit={() => setSelectedBlockId(block.id)}
                        onToggleVisibility={() => handleToggleVisibility(block.id)}
                        onDelete={() => handleDeleteBlock(block.id)}
                        onMoveUp={() => handleMove(index, 'up')}
                        onMoveDown={() => handleMove(index, 'down')}
                        isFirst={index === 0}
                        isLast={index === workingBlocks.length - 1}
                      />
                    ))}
                  </div>
                </SortableContext>

                <div className="fixed bottom-10 left-1/2 z-30 -translate-x-1/2 lg:relative lg:bottom-0 lg:left-auto lg:right-auto lg:flex lg:translate-x-0 lg:justify-center">
                  <BlockSelector onAddBlock={handleAddBlock} />
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="relative flex-1 flex flex-col items-center group/canvas overflow-hidden bg-surface-container/30">
            {/* Subtle Workspace Background - Grid/Dots */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                 style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
            />

            <div
              className="relative mx-auto h-full flex flex-col overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-1 ring-border/50 transition-[width] duration-300 ease-out my-8 rounded-sm"
              style={{ width: customWidth ? `${customWidth}px` : canvasWidths[deviceMode] }}
            >
              <div className="flex items-center justify-between border-b border-border bg-surface-container-lowest px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 shrink-0 select-none">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-border" />
                    <span className="h-1.5 w-1.5 rounded-full bg-border" />
                    <span className="h-1.5 w-1.5 rounded-full bg-border" />
                  </div>
                  <div className="h-3 w-px bg-border/50" />
                  <div className="flex items-center gap-2">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    <span>Viewport: {customWidth ? `${Math.round(customWidth)}px` : deviceMode}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded-sm bg-surface-container text-[8px] border border-border/40">Canvas v2.0</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden bg-background">
                <div className="origin-top">
                  <EditorCanvasRenderer blocks={workingBlocks} pageId={page.id} />
                </div>
              </div>

              {/* Resize Handles - Improved Visuals */}
              <div 
                className="absolute inset-y-0 -right-1.5 w-3 cursor-ew-resize group/handle z-50 lg:block hidden"
                onMouseDown={startResizing}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-1 rounded-full bg-border/40 group-hover/handle:bg-brand/40 group-hover/handle:h-16 transition-all duration-300" />
                <div className="absolute inset-y-0 left-0 w-[1px] bg-border opacity-0 group-hover/handle:opacity-100 transition-opacity" />
              </div>
              <div 
                className="absolute inset-y-0 -left-1.5 w-3 cursor-ew-resize group/handle z-50 lg:block hidden"
                onMouseDown={startResizing}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-1 rounded-full bg-border/40 group-hover/handle:bg-brand/40 group-hover/handle:h-16 transition-all duration-300" />
                <div className="absolute inset-y-0 right-0 w-[1px] bg-border opacity-0 group-hover/handle:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Resize Indicator overlay (only during custom resize) */}
            {customWidth && (
              <div className="absolute bottom-8 right-8 rounded-full bg-brand px-4 py-1.5 text-[10px] font-bold tracking-wider text-white shadow-xl backdrop-blur-md pointer-events-none animate-in zoom-in-95 duration-200">
                LARGURA: {Math.round(customWidth)}px
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
