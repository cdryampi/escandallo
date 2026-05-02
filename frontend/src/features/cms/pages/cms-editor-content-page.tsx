import { useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
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
import { CmsRenderer } from '@/features/public-site/components/cms-renderer'
import type { BlockType } from '@/types/cms'
import { createDefaultBlock } from '@/types/cms'
import { BlockSelector } from '../components/BlockSelector'
import { SortableBlockItem } from '../components/SortableBlockItem'
import { useCmsEditorStore } from '../stores/cms-editor-store'

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
    viewMode,
    setViewMode,
    deviceMode,
  } = useCmsEditorStore()

  const updateVersion = useUpdatePageVersion()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    if (!draft) return

    setWorkingBlocks(draft.blocks)

    const nextSelectedBlockId = draft.blocks.some((block) => block.id === selectedBlockId)
      ? selectedBlockId
      : (draft.blocks[0]?.id ?? null)

    setSelectedBlockId(nextSelectedBlockId)
  }, [draft, selectedBlockId, setSelectedBlockId, setWorkingBlocks])

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

    const nextBlocks = workingBlocks.filter((block) => block.id !== id)
    setWorkingBlocks(nextBlocks)
    setSelectedBlockId(nextBlocks[0]?.id ?? null)
  }

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= workingBlocks.length) return

    setWorkingBlocks(arrayMove(workingBlocks, index, targetIndex))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = workingBlocks.findIndex((block) => block.id === active.id)
    const newIndex = workingBlocks.findIndex((block) => block.id === over.id)

    setWorkingBlocks(arrayMove(workingBlocks, oldIndex, newIndex))
  }

  const handleAddBlock = (type: BlockType) => {
    const newBlock = createDefaultBlock(type)
    setWorkingBlocks([...workingBlocks, newBlock])
    setSelectedBlockId(newBlock.id)
  }

  const handleSave = () => {
    updateVersion.mutate(
      { versionId: draft.id, data: { blocks: workingBlocks } },
      { onSuccess: () => toast.success('Contenido guardado correctamente.') }
    )
  }

  const canvasWidths = {
    mobile: 'max-w-[375px]',
    tablet: 'max-w-[768px]',
    desktop: 'max-w-none',
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
          {updateVersion.isPending ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>

      <div className="flex-1">
        {viewMode === 'structure' ? (
          <div className="mx-auto max-w-3xl space-y-4">
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
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
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
                </DndContext>

                <div className="fixed bottom-10 left-1/2 z-30 -translate-x-1/2 lg:relative lg:bottom-0 lg:left-auto lg:right-auto lg:flex lg:translate-x-0 lg:justify-center">
                  <BlockSelector onAddBlock={handleAddBlock} />
                </div>
              </>
            )}
          </div>
        ) : (
          <div
            className={`mx-auto overflow-hidden bg-white shadow-2xl ring-1 ring-border transition-all duration-300 ${canvasWidths[deviceMode]}`}
          >
            <div className="flex items-center justify-between border-b border-border bg-surface-container-lowest px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <span>Viewport: {deviceMode}</span>
              <span>Draft actual</span>
            </div>
            <div className="origin-top pointer-events-none">
              <CmsRenderer blocks={workingBlocks} pageId={page.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
