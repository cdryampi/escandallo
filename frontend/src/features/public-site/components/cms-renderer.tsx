import { motion } from 'motion/react'
import type { Block } from '@/types/cms'
import { ContactFormBlock } from './blocks/contact-form-block'
import { FeatureListBlock } from './blocks/feature-list-block'
import { GalleryBlock } from './blocks/gallery-block'
import { HeroBlock } from './blocks/hero-block'
import { MenuHighlightsBlock } from './blocks/menu-highlights-block'
import { ReservationCtaBlock } from './blocks/reservation-cta-block'
import { RichTextBlock } from './blocks/rich-text-block'
import { TestimonialsBlock } from './blocks/testimonials-block'
import { VisitInfoBlock } from './blocks/visit-info-block'

interface Props {
  blocks: Block[]
  pageId?: number
}

export const CmsRenderer = ({ blocks, pageId }: Props) => {
  const visibleBlocks = blocks.filter((block) => block.is_visible)

  if (visibleBlocks.length === 0) {
    return (
      <div className="bg-background py-24 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <p className="type-label-md text-[10px] tracking-[0.14em] text-brand/40">Estado Editorial</p>
          <p className="font-heading text-lg italic text-muted-foreground">
            Esta pagina no tiene contenido publicado todavia.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="cms-content overflow-x-clip bg-background">
      {visibleBlocks.map((block, index) => {
        const content = (() => {
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
        })()

        if (!content) {
          return null
        }

        return (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 1,
              delay: index === 0 ? 0 : 0.1,
              ease: [0.21, 0.45, 0.32, 0.9],
            }}
          >
            {content}
          </motion.div>
        )
      })}
    </div>
  )
}
