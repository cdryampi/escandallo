import { sanitizeRichText } from '@/lib/sanitize-rich-text'
import type { RichTextBlockData } from '@/types/cms'

interface Props {
  data: RichTextBlockData
}

export const RichTextBlock = ({ data }: Props) => {
  const content = sanitizeRichText(data.content)

  if (content.length === 0) {
    return null
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div
          className="prose prose-lg max-w-none leading-relaxed text-on-surface-variant prose-headings:font-display prose-headings:font-bold prose-headings:text-on-surface prose-h1:mb-8 prose-h1:text-4xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-3xl prose-p:mb-6 prose-a:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:font-bold prose-strong:text-on-surface"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  )
}
