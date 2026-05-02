import type { Block } from '@/types/cms'
import { ContactFormBlock } from './blocks/contact-form-block'
import { FeatureListBlock } from './blocks/feature-list-block'
import { HeroBlock } from './blocks/hero-block'
import { MenuHighlightsBlock } from './blocks/menu-highlights-block'
import { RichTextBlock } from './blocks/rich-text-block'

interface Props {
  blocks: Block[]
  pageId?: number
}

export const CmsRenderer = ({ blocks, pageId }: Props) => {
  const visibleBlocks = blocks.filter((block) => block.is_visible)

  if (visibleBlocks.length === 0) {
    return (
      <div className="bg-surface-container-lowest py-20 text-center">
        <p className="font-body italic text-on-surface-variant">Esta pagina no tiene contenido publicado todavia.</p>
      </div>
    )
  }

  return (
    <div className="cms-content">
      {visibleBlocks.map((block) => {
        switch (block.type) {
          case 'HeroBlock':
            return <HeroBlock key={block.id} data={block.data} />
          case 'RichTextBlock':
            return <RichTextBlock key={block.id} data={block.data} />
          case 'FeatureListBlock':
            return <FeatureListBlock key={block.id} data={block.data} />
          case 'ContactFormBlock':
            return <ContactFormBlock key={block.id} data={block.data} pageId={pageId} />
          case 'MenuHighlightsBlock':
            return <MenuHighlightsBlock key={block.id} data={block.data} />
        }
      })}
    </div>
  )
}
