import { type BlockType } from '@/types/cms'
import {
  CalendarHeart,
  Images,
  Layout,
  List,
  Mail,
  MapPinned,
  Plus,
  Quote,
  Star,
  Type,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props {
  onAddBlock: (type: BlockType) => void
}

interface BlockCategory {
  label: string
  blocks: {
    type: BlockType
    label: string
    icon: React.ReactNode
    description: string
  }[]
}

const BLOCK_CATEGORIES: BlockCategory[] = [
  {
    label: 'Estructura',
    blocks: [
      {
        type: 'HeroBlock',
        label: 'Imagen Hero',
        icon: <Layout className="size-4" />,
        description: 'Cabecera principal con imagen, titulo y CTA.',
      },
    ],
  },
  {
    label: 'Contenido',
    blocks: [
      {
        type: 'RichTextBlock',
        label: 'Texto Enriquecido',
        icon: <Type className="size-4" />,
        description: 'Bloque editorial libre con formato Tiptap.',
      },
      {
        type: 'FeatureListBlock',
        label: 'Lista de Caracteristicas',
        icon: <List className="size-4" />,
        description: 'Capacidades, atributos o servicios destacados.',
      },
      {
        type: 'GalleryBlock',
        label: 'Galeria Editorial',
        icon: <Images className="size-4" />,
        description: 'Recorrido visual de sala, producto o ambiente.',
      },
    ],
  },
  {
    label: 'Marketing y Especiales',
    blocks: [
      {
        type: 'MenuHighlightsBlock',
        label: 'Platos Destacados',
        icon: <Star className="size-4" />,
        description: 'Selector visual de recetas del catalogo.',
      },
      {
        type: 'TestimonialsBlock',
        label: 'Testimonios',
        icon: <Quote className="size-4" />,
        description: 'Resenas, citas o prueba social de la casa.',
      },
      {
        type: 'VisitInfoBlock',
        label: 'Como Visitarnos',
        icon: <MapPinned className="size-4" />,
        description: 'Direccion, horarios, mapa y CTA de visita.',
      },
      {
        type: 'ReservationCtaBlock',
        label: 'CTA de Reserva',
        icon: <CalendarHeart className="size-4" />,
        description: 'Llamada fuerte a reserva o eventos privados.',
      },
      {
        type: 'ContactFormBlock',
        label: 'Formulario de Contacto',
        icon: <Mail className="size-4" />,
        description: 'Formulario directo para reservas o consultas.',
      },
    ],
  },
]

export const BlockSelector = ({ onAddBlock }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary/5">
          <Plus className="size-4" />
          Anadir Bloque
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end">
        {BLOCK_CATEGORIES.map((category, idx) => (
          <DropdownMenuGroup key={category.label}>
            {idx > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {category.label}
            </DropdownMenuLabel>
            {category.blocks.map((block) => (
              <DropdownMenuItem
                key={block.type}
                onClick={() => onAddBlock(block.type)}
                className="group/item flex cursor-pointer flex-col items-start gap-1 p-3 transition-colors focus:bg-primary/5"
              >
                <div className="flex items-center gap-2.5 text-sm font-bold">
                  <span className="text-primary/70 transition-colors group-hover/item:text-primary">{block.icon}</span>
                  <span className="text-on-surface transition-colors group-hover/item:text-primary">{block.label}</span>
                </div>
                <span className="pl-6.5 text-[10px] leading-normal text-muted-foreground">
                  {block.description}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
