import type { Block } from '@/types/cms'
import { ContactFormBlock } from '@/features/public-site/components/blocks/contact-form-block'
import { FeatureListBlock } from '@/features/public-site/components/blocks/feature-list-block'
import { GalleryBlock } from '@/features/public-site/components/blocks/gallery-block'
import { HeroBlock } from '@/features/public-site/components/blocks/hero-block'
import { MenuHighlightsBlock } from '@/features/public-site/components/blocks/menu-highlights-block'
import { ReservationCtaBlock } from '@/features/public-site/components/blocks/reservation-cta-block'
import { RichTextBlock } from '@/features/public-site/components/blocks/rich-text-block'
import { TestimonialsBlock } from '@/features/public-site/components/blocks/testimonials-block'
import { VisitInfoBlock } from '@/features/public-site/components/blocks/visit-info-block'
import { useLandingData } from '@/api/cms'
import { buildPublicThemeVars } from '@/features/public-site/lib/public-theme'
import { useCmsEditorStore } from '../stores/cms-editor-store'
import { cn } from '@/lib/utils'

interface Props {
  blocks: Block[]
  pageId?: number
}

export const EditorCanvasRenderer = ({ blocks, pageId }: Props) => {
  const { selectedBlockId, setSelectedBlockId } = useCmsEditorStore()
  const { data: landing } = useLandingData()

  if (blocks.length === 0) {
    return (
      <div className="bg-surface-container-lowest py-20 text-center">
        <p className="font-body italic text-on-surface-variant">Esta pagina no tiene contenido todavia.</p>
      </div>
    )
  }

  return (
    <div
      className="cms-content relative bg-background text-foreground"
      style={buildPublicThemeVars(landing?.branding?.palette)}
    >
      {blocks.map((block) => {
        const isSelected = selectedBlockId === block.id
        const isHidden = !block.is_visible

        return (
          <div
            key={block.id}
            className={cn(
              '@container group relative cursor-pointer transition-all',
              isSelected && 'z-10 shadow-[0_0_0_1px_var(--ds-color-brand)]',
              !isSelected && 'hover:shadow-[0_0_0_1px_rgba(10,46,31,0.3)]',
              isHidden && 'opacity-40 grayscale-[0.5]'
            )}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedBlockId(block.id)
            }}
          >
            {/* Overlay to intercept clicks and show selection - Extremely subtle */}
            <div className={cn(
              "absolute inset-0 z-20 transition-colors pointer-events-none",
              isSelected ? "bg-brand/[0.02]" : "group-hover:bg-brand/[0.01]"
            )} />
            
            {/* Handle for selected block */}
            {isSelected && (
              <>
                <div className="absolute -top-3 left-4 z-40 flex items-center gap-2 rounded-full bg-brand px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white shadow-lg animate-in fade-in slide-in-from-bottom-1 duration-200">
                  <div className="size-1.5 rounded-full bg-accent animate-pulse" />
                  {block.type.replace('Block', '')}
                </div>
                {/* Corner indicators */}
                <div className="absolute -top-[1px] -left-[1px] size-2 border-l-2 border-t-2 border-brand z-30" />
                <div className="absolute -top-[1px] -right-[1px] size-2 border-r-2 border-t-2 border-brand z-30" />
                <div className="absolute -bottom-[1px] -left-[1px] size-2 border-l-2 border-b-2 border-brand z-30" />
                <div className="absolute -bottom-[1px] -right-[1px] size-2 border-r-2 border-b-2 border-brand z-30" />
              </>
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
    case 'GalleryBlock':
      return <GalleryBlock data={block.data} />
    case 'ContactFormBlock':
      return <ContactFormBlock data={block.data} pageId={pageId} />
    case 'MenuHighlightsBlock':
      return <MenuHighlightsBlock data={block.data} />
    case 'TestimonialsBlock':
      return <TestimonialsBlock data={block.data} />
    case 'VisitInfoBlock':
      return <VisitInfoBlock data={block.data} />
    case 'ReservationCtaBlock':
      return <ReservationCtaBlock data={block.data} />
    default:
      return null
  }
}
