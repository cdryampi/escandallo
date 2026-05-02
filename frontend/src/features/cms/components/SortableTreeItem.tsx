import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ChevronRight, Eye, List as ListIcon, Phone, Star, Type, Layout, GripVertical } from 'lucide-react'
import type { Block } from '@/types/cms'

interface Props {
  block: Block
  isSelected: boolean
  onClick: () => void
}

const getBlockIcon = (type: string) => {
  switch (type) {
    case 'HeroBlock': return <Eye className="size-3.5" />
    case 'RichTextBlock': return <Type className="size-3.5" />
    case 'FeatureListBlock': return <ListIcon className="size-3.5" />
    case 'ContactFormBlock': return <Phone className="size-3.5" />
    case 'MenuHighlightsBlock': return <Star className="size-3.5" />
    default: return <Layout className="size-3.5" />
  }
}

const getBlockLabel = (block: Block) => {
  switch (block.type) {
    case 'HeroBlock': return block.data.title || 'Sección Hero'
    case 'RichTextBlock': return 'Contenido de Texto'
    case 'FeatureListBlock': return block.data.title || 'Lista de Características'
    case 'MenuHighlightsBlock': return block.data.title || 'Platos Destacados'
    case 'ContactFormBlock': return 'Formulario de Contacto'
    default: return (block as Block).type
  }
}

export const SortableTreeItem = ({ block, isSelected, onClick }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id })
  const isHidden = !block.is_visible

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-1 rounded-md transition-all ${
        isDragging ? 'opacity-50 ring-1 ring-primary bg-primary/5' : ''
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex h-8 w-6 cursor-grab items-center justify-center text-muted-foreground/30 hover:text-primary active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="size-3.5" />
      </div>

      <button
        onClick={onClick}
        className={`min-w-0 flex-1 flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-all text-left ${
          isSelected
            ? 'bg-primary/10 text-primary font-bold shadow-sm'
            : 'text-on-surface-variant hover:bg-surface-container-low'
        } ${isHidden ? 'opacity-50' : ''}`}
      >
        <div className={`flex h-5 w-5 items-center justify-center rounded bg-surface-container text-muted-foreground shrink-0 ${
          isSelected ? 'bg-primary/20 text-primary' : ''
        }`}>
          {getBlockIcon(block.type)}
        </div>
        <span className={`truncate flex-1 min-w-0 ${isHidden ? 'line-through decoration-muted-foreground/50' : ''}`}>
          {getBlockLabel(block)}
        </span>
        {isSelected && <ChevronRight className="size-3 shrink-0" />}
      </button>
    </div>
  )
}
