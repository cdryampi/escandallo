import type { Block } from '@/types/cms'
import { ContactFormBlock } from '@/features/public-site/components/blocks/contact-form-block'
import { FeatureListBlock } from '@/features/public-site/components/blocks/feature-list-block'
import { HeroBlock } from '@/features/public-site/components/blocks/hero-block'
import { MenuHighlightsBlock } from '@/features/public-site/components/blocks/menu-highlights-block'
import { RichTextBlock } from '@/features/public-site/components/blocks/rich-text-block'
import { useCmsEditorStore } from '../stores/cms-editor-store'
import { cn } from '@/lib/utils'

interface Props {
  blocks: Block[]
  pageId?: number
}

export const EditorCanvasRenderer = ({ blocks, pageId }: Props) => {
  const { selectedBlockId, setSelectedBlockId } = useCmsEditorStore()

  if (blocks.length === 0) {
    return (
      <div className="bg-surface-container-lowest py-20 text-center">
        <p className="font-body italic text-on-surface-variant">Esta pagina no tiene contenido todavia.</p>
      </div>
    )
  }

  return (
    <div className="cms-content relative">
      {blocks.map((block) => {
        const isSelected = selectedBlockId === block.id
        const isHidden = !block.is_visible

        return (
          <div
            key={block.id}
            className={cn(
              'group relative cursor-pointer transition-all',
              isSelected && 'ring-4 ring-primary ring-inset z-10',
              !isSelected && 'hover:ring-2 hover:ring-primary/40 hover:ring-inset',
              isHidden && 'opacity-40 grayscale-[0.5]'
            )}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedBlockId(block.id)
            }}
          >
            {/* Overlay to intercept clicks and show selection */}
            <div className={cn(
              "absolute inset-0 z-20 transition-colors",
              isSelected ? "bg-primary/5" : "group-hover:bg-primary/5"
            )} />
            
            {/* Label for selected block */}
            {isSelected && (
              <div className="absolute top-0 right-0 z-30 rounded-bl-lg bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                {block.type.replace('Block', '')}
              </div>
            )}

            {/* Actual Block Content */}
            <div className="pointer-events-none">
              {renderBlock(block, pageId)}
            </div>
            
            {isHidden && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 pointer-events-none">
                <span className="rounded-full bg-black/60 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm">
                  BLOQUE OCULTO EN PRODUCCIÓN
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const renderBlock = (block: Block, pageId?: number) => {
  switch (block.type) {
    case 'HeroBlock':
      return <HeroBlock data={block.data} />
    case 'RichTextBlock':
      return <RichTextBlock data={block.data} />
    case 'FeatureListBlock':
      return <FeatureListBlock data={block.data} />
    case 'ContactFormBlock':
      return <ContactFormBlock data={block.data} pageId={pageId} />
    case 'MenuHighlightsBlock':
      return <MenuHighlightsBlock data={block.data} />
    default:
      return null
  }
}
