import { Button } from '@/components/ui/button'
import type { Block } from '@/types/cms'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ChevronDown, ChevronUp, Eye, EyeOff, GripVertical, Settings, Trash2 } from 'lucide-react'

interface Props {
  block: Block
  isActive?: boolean
  onEdit: () => void
  onToggleVisibility: () => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
}

const getBlockLabel = (block: Block) => {
  switch (block.type) {
    case 'HeroBlock':
    case 'FeatureListBlock':
    case 'MenuHighlightsBlock':
      return block.data.title || 'Sin titulo'
    case 'ContactFormBlock':
      return block.data.heading || 'Sin titulo'
    case 'RichTextBlock':
      return block.data.content.replace(/<[^>]*>/g, '').slice(0, 60) || 'Contenido de texto'
  }
}

export const SortableBlockItem = ({
  block,
  isActive,
  onEdit,
  onToggleVisibility,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-4 rounded-xl border bg-white p-3 shadow-sm transition-all hover:border-primary/30 hover:shadow-md ${
        !block.is_visible ? 'border-dashed bg-surface-container-low/50 opacity-60' : 'border-border'
      } ${isActive ? 'ring-2 ring-primary border-primary shadow-lg bg-primary/[0.02]' : ''} ${isDragging ? 'opacity-50 ring-2 ring-primary shadow-2xl scale-[1.01]' : ''}`}
    >
      <div className="flex items-center gap-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab p-1.5 text-muted-foreground/40 transition-colors hover:text-primary active:cursor-grabbing group-hover:text-muted-foreground"
          title="Arrastrar para reordenar"
        >
          <GripVertical className="h-5 w-5" />
        </div>

        <div className="flex flex-col gap-0.5 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-md hover:bg-surface-container"
            onClick={(event) => {
              event.stopPropagation()
              onMoveUp()
            }}
            disabled={isFirst}
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-md hover:bg-surface-container"
            onClick={(event) => {
              event.stopPropagation()
              onMoveDown()
            }}
            disabled={isLast}
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="min-w-0 flex-1 cursor-pointer py-1" onClick={onEdit}>
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
            {block.type.replace('Block', '')}
          </span>
          {!block.is_visible ? (
            <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              <EyeOff className="h-3 w-3" /> Oculto
            </span>
          ) : null}
        </div>
        <h4 className={`truncate pr-4 text-sm font-bold transition-colors group-hover:text-primary ${
          !block.is_visible ? 'text-muted-foreground line-through decoration-muted-foreground/30' : 'text-on-surface'
        }`}>
          {getBlockLabel(block)}
        </h4>
      </div>

      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100 group-[.isActive]:opacity-100">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
          onClick={onEdit} 
          title="Configurar bloque"
        >
          <Settings className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-surface-container"
          onClick={onToggleVisibility}
          title={block.is_visible ? 'Ocultar' : 'Mostrar'}
        >
          {block.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-error/60 hover:bg-error/10 hover:text-error"
          onClick={onDelete}
          title="Eliminar"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
