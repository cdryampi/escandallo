import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  CalendarHeart,
  ChevronRight,
  Eye,
  GripVertical,
  Images,
  Layout,
  List as ListIcon,
  MapPinned,
  Phone,
  Quote,
  Star,
  Trash2,
  Type,
} from 'lucide-react'
import type { Block } from '@/types/cms'

interface Props {
  block: Block
  isSelected: boolean
  onClick: () => void
  onDelete: () => void
}

const getBlockIcon = (type: string) => {
  switch (type) {
    case 'HeroBlock':
      return <Eye className="size-4" />
    case 'RichTextBlock':
      return <Type className="size-4" />
    case 'FeatureListBlock':
      return <ListIcon className="size-4" />
    case 'GalleryBlock':
      return <Images className="size-4" />
    case 'ContactFormBlock':
      return <Phone className="size-4" />
    case 'MenuHighlightsBlock':
      return <Star className="size-4" />
    case 'TestimonialsBlock':
      return <Quote className="size-4" />
    case 'VisitInfoBlock':
      return <MapPinned className="size-4" />
    case 'ReservationCtaBlock':
      return <CalendarHeart className="size-4" />
    default:
      return <Layout className="size-4" />
  }
}

const getBlockLabel = (block: Block) => {
  switch (block.type) {
    case 'HeroBlock':
      return block.data.title || 'Seccion Hero'
    case 'RichTextBlock':
      return 'Contenido de Texto'
    case 'FeatureListBlock':
      return block.data.title || 'Lista de Caracteristicas'
    case 'GalleryBlock':
      return block.data.title || 'Galeria Editorial'
    case 'MenuHighlightsBlock':
      return block.data.title || 'Platos Destacados'
    case 'ContactFormBlock':
      return 'Formulario de Contacto'
    case 'TestimonialsBlock':
      return block.data.title || 'Testimonios'
    case 'VisitInfoBlock':
      return block.data.title || 'Como Visitarnos'
    case 'ReservationCtaBlock':
      return block.data.title || 'CTA de Reserva'
    default:
      return 'Bloque CMS'
  }
}

export const SortableTreeItem = ({ block, isSelected, onClick, onDelete }: Props) => {
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
        isDragging ? 'bg-primary/5 opacity-50 ring-1 ring-primary' : ''
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex h-8 w-6 cursor-grab items-center justify-center text-muted-foreground/30 opacity-0 transition-opacity hover:text-primary group-hover:opacity-100 active:cursor-grabbing"
      >
        <GripVertical className="size-4" />
      </div>

      <button
        onClick={onClick}
        title={getBlockLabel(block)}
        className={`min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-all ${
          isSelected
            ? 'bg-primary/10 font-bold text-primary shadow-sm'
            : 'text-on-surface-variant hover:bg-surface-container-low'
        } ${isHidden ? 'opacity-50' : ''} flex`}
      >
        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded bg-surface-container-high text-on-surface-variant ${
          isSelected ? 'bg-brand/10 text-brand' : ''
        }`}>
          {getBlockIcon(block.type)}
        </div>
        <span className={`min-w-0 flex-1 truncate ${isHidden ? 'line-through decoration-muted-foreground/50' : ''}`}>
          {getBlockLabel(block)}
        </span>
        {isSelected ? <ChevronRight className="size-3 shrink-0" /> : null}
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onDelete()
        }}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-error/60 opacity-0 transition-all hover:bg-error/10 hover:text-error group-hover:opacity-100 focus:opacity-100"
        title="Eliminar bloque"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  )
}
