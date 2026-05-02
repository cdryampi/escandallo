import { useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import {
  useAdminPage,
  useAdminPageDraft,
  useUpdatePageVersion,
} from '@/api/cms'
import { Button } from '@/components/ui/button'
import type { BlockType } from '@/types/cms'
import { createDefaultBlock } from '@/types/cms'
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
import {
  Layout,
  Save,
  Eye,
  Settings2,
} from 'lucide-react'
import { toast } from 'sonner'
import { SortableBlockItem } from '../components/SortableBlockItem'
import { BlockSelector } from '../components/BlockSelector'
import { useCmsEditorStore } from '../stores/cms-editor-store'
import { CmsRenderer } from '@/features/public-site/components/cms-renderer'

export const CmsEditorContentPage = () => {
  const { pageId } = useParams({ from: '/backoffice/cms/pages/$pageId' })
  const parsedPageId = Number(pageId)

  const { data: page } = useAdminPage(parsedPageId)
  const { data: draft } = useAdminPageDraft(parsedPageId)

  const { 
    selectedBlockId, 
    setSelectedBlockId, 
    workingBlocks, 
    setWorkingBlocks,
    viewMode,
    setViewMode,
    deviceMode
  } = useCmsEditorStore()

  const updateVersion = useUpdatePageVersion()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Sincronizar bloques del store cuando el draft carga por primera vez
  useEffect(() => {
    if (draft?.blocks && workingBlocks.length === 0) {
      setWorkingBlocks(draft.blocks)
    }
  }, [draft?.blocks, setWorkingBlocks, workingBlocks.length])

  if (!page || !draft) return null

  const handleToggleVisibility = (id: string) => {
    setWorkingBlocks(
      workingBlocks.map((b) => (b.id === id ? { ...b, is_visible: !b.is_visible } : b))
    )
  }

  const handleDeleteBlock = (id: string) => {
    if (!window.confirm('¿Eliminar este bloque?')) return
    setWorkingBlocks(workingBlocks.filter((b) => b.id !== id))
    if (selectedBlockId === id) setSelectedBlockId(null)
  }

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= workingBlocks.length) return
    setWorkingBlocks(arrayMove(workingBlocks, index, targetIndex))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = workingBlocks.findIndex((b) => b.id === active.id)
    const newIndex = workingBlocks.findIndex((b) => b.id === over.id)
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
    <div className="space-y-6 h-full flex flex-col">
      {/* Barra de control del Canvas */}
      <div className="flex items-center justify-between sticky top-0 z-20 bg-surface-container-low/90 backdrop-blur-sm py-2 px-1">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-white p-1 shadow-sm">
          <Button 
            variant={viewMode === 'structure' ? 'secondary' : 'ghost'} 
            size="sm" 
            className="gap-2 h-8"
            onClick={() => setViewMode('structure')}
          >
            <Settings2 className="size-3.5" />
            Estructura
          </Button>
          <Button 
            variant={viewMode === 'preview' ? 'secondary' : 'ghost'} 
            size="sm" 
            className="gap-2 h-8"
            onClick={() => setViewMode('preview')}
          >
            <Eye className="size-3.5" />
            Vista Previa
          </Button>
        </div>

        <Button onClick={handleSave} disabled={updateVersion.isPending} className="gap-2 shadow-md h-9">
          <Save className="size-4" />
          {updateVersion.isPending ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>

      <div className="flex-1">
        {viewMode === 'structure' ? (
          <div className="max-w-3xl mx-auto space-y-4">
            {workingBlocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center rounded-2xl border-2 border-dashed border-border bg-white/50">
                <div className="rounded-full bg-surface-container p-6 mb-4">
                   <Layout className="size-12 text-muted-foreground/20" />
                </div>
                <h3 className="text-sm font-bold text-on-surface">Página sin contenido</h3>
                <p className="text-xs text-muted-foreground mb-6">Añade tu primer bloque para empezar.</p>
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
                    items={workingBlocks.map((b) => b.id)}
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
                
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 lg:left-auto lg:right-auto lg:relative lg:bottom-0 lg:translate-x-0 lg:flex lg:justify-center">
                   <BlockSelector onAddBlock={handleAddBlock} />
                </div>
              </>
            )}
          </div>
        ) : (
          /* Vista Previa Real */
          <div className={`mx-auto bg-white shadow-2xl transition-all duration-300 overflow-hidden ring-1 ring-border ${canvasWidths[deviceMode]}`}>
             <div className="bg-surface-container-lowest border-b border-border py-1 px-4 flex justify-between items-center text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                <span>Viewport: {deviceMode}</span>
                <span>Draft Actual</span>
             </div>
             <div className="pointer-events-none origin-top">
                <CmsRenderer blocks={workingBlocks} />
             </div>
          </div>
        )}
      </div>
    </div>
  )
}
