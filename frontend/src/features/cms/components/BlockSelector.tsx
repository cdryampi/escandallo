import { type BlockType } from '@/types/cms'
import {
  Layout,
  Type,
  List,
  Mail,
  Star,
  Plus,
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
        description: 'Cabecera con imagen y título principal.',
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
        description: 'Bloque de texto libre con formato Tiptap.',
      },
      {
        type: 'FeatureListBlock',
        label: 'Lista de Características',
        icon: <List className="size-4" />,
        description: 'Cuadrícula de servicios o iconos destacados.',
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
        description: 'Selector visual de recetas del catálogo.',
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
          Añadir Bloque
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        {BLOCK_CATEGORIES.map((category, idx) => (
          <DropdownMenuGroup key={category.label}>
            {idx > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1.5">
              {category.label}
            </DropdownMenuLabel>
            {category.blocks.map((block) => (
              <DropdownMenuItem
                key={block.type}
                onClick={() => onAddBlock(block.type)}
                className="flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-primary/5 transition-colors group/item"
              >
                <div className="flex items-center gap-2.5 font-bold text-sm">
                  <span className="text-primary/70 group-hover/item:text-primary transition-colors">{block.icon}</span>
                  <span className="text-on-surface group-hover/item:text-primary transition-colors">{block.label}</span>
                </div>
                <span className="text-[10px] text-muted-foreground leading-normal pl-6.5">
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
