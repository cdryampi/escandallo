import type {
  Block,
  ContactFormBlockData,
  FeatureListBlockData,
  HeroBlockData,
  MenuHighlightsBlockData,
  RichTextBlockData,
} from '@/types/cms'
import { ContactFormBlockForm } from './ContactFormBlockForm'
import { FeatureListBlockForm } from './FeatureListBlockForm'
import { HeroBlockForm } from './HeroBlockForm'
import { MenuHighlightsBlockForm } from './MenuHighlightsBlockForm'
import { RichTextBlockForm } from './RichTextBlockForm'

interface Props {
  block: Block
  onSubmit: (data: Block['data']) => void
  onCancel: () => void
}

export const BlockFormSwitcher = ({ block, onSubmit, onCancel }: Props) => {
  switch (block.type) {
    case 'HeroBlock':
      return <HeroBlockForm defaultValues={block.data as HeroBlockData} onSubmit={onSubmit} onCancel={onCancel} />
    case 'RichTextBlock':
      return <RichTextBlockForm defaultValues={block.data as RichTextBlockData} onSubmit={onSubmit} onCancel={onCancel} />
    case 'FeatureListBlock':
      return <FeatureListBlockForm defaultValues={block.data as FeatureListBlockData} onSubmit={onSubmit} onCancel={onCancel} />
    case 'ContactFormBlock':
      return <ContactFormBlockForm defaultValues={block.data as ContactFormBlockData} onSubmit={onSubmit} onCancel={onCancel} />
    case 'MenuHighlightsBlock':
      return <MenuHighlightsBlockForm defaultValues={block.data as MenuHighlightsBlockData} onSubmit={onSubmit} onCancel={onCancel} />
  }
}
