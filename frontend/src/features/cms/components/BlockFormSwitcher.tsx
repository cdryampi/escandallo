import type {
  Block,
  ContactFormBlockData,
  FeatureListBlockData,
  GalleryBlockData,
  HeroBlockData,
  MenuHighlightsBlockData,
  ReservationCtaBlockData,
  RichTextBlockData,
  TestimonialsBlockData,
  VisitInfoBlockData,
} from '@/types/cms'
import { ContactFormBlockForm } from './ContactFormBlockForm'
import { FeatureListBlockForm } from './FeatureListBlockForm'
import { GalleryBlockForm } from './GalleryBlockForm'
import { HeroBlockForm } from './HeroBlockForm'
import { MenuHighlightsBlockForm } from './MenuHighlightsBlockForm'
import { ReservationCtaBlockForm } from './ReservationCtaBlockForm'
import { RichTextBlockForm } from './RichTextBlockForm'
import { TestimonialsBlockForm } from './TestimonialsBlockForm'
import { VisitInfoBlockForm } from './VisitInfoBlockForm'

interface Props {
  block: Block
  onSubmit: (data: Block['data']) => void
  onChange: (data: Block['data']) => void
  onCancel: () => void
}

export const BlockFormSwitcher = ({ block, onSubmit, onChange, onCancel }: Props) => {
  switch (block.type) {
    case 'HeroBlock':
      return <HeroBlockForm defaultValues={block.data as HeroBlockData} onSubmit={onSubmit} onChange={onChange} onCancel={onCancel} />
    case 'RichTextBlock':
      return <RichTextBlockForm defaultValues={block.data as RichTextBlockData} onSubmit={onSubmit} onChange={onChange} onCancel={onCancel} />
    case 'FeatureListBlock':
      return <FeatureListBlockForm defaultValues={block.data as FeatureListBlockData} onSubmit={onSubmit} onChange={onChange} onCancel={onCancel} />
    case 'GalleryBlock':
      return <GalleryBlockForm defaultValues={block.data as GalleryBlockData} onSubmit={onSubmit} onChange={onChange} onCancel={onCancel} />
    case 'ContactFormBlock':
      return <ContactFormBlockForm defaultValues={block.data as ContactFormBlockData} onSubmit={onSubmit} onChange={onChange} onCancel={onCancel} />
    case 'MenuHighlightsBlock':
      return <MenuHighlightsBlockForm defaultValues={block.data as MenuHighlightsBlockData} onSubmit={onSubmit} onChange={onChange} onCancel={onCancel} />
    case 'TestimonialsBlock':
      return <TestimonialsBlockForm defaultValues={block.data as TestimonialsBlockData} onSubmit={onSubmit} onChange={onChange} onCancel={onCancel} />
    case 'VisitInfoBlock':
      return <VisitInfoBlockForm defaultValues={block.data as VisitInfoBlockData} onSubmit={onSubmit} onChange={onChange} onCancel={onCancel} />
    case 'ReservationCtaBlock':
      return <ReservationCtaBlockForm defaultValues={block.data as ReservationCtaBlockData} onSubmit={onSubmit} onChange={onChange} onCancel={onCancel} />
  }
}
