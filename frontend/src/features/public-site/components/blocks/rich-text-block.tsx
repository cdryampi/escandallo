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
    <section className="public-section bg-background">
      <div className="public-container">
        <div className="public-surface-card relative overflow-hidden px-6 py-10 md:px-12 md:py-16 lg:px-16 lg:py-20">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-brand/[0.04] blur-3xl" />
          <div className="relative">
            <div className="mb-10 flex items-center gap-6">
              <div className="public-stat-rule" />
              <span className="ui-kicker text-[10px]">Narrativa de Casa</span>
            </div>

            <div
              className="cms-content prose prose-sm max-w-none @md:prose-base @lg:prose-lg prose-headings:font-heading prose-headings:font-semibold prose-headings:tracking-[-0.03em] prose-headings:text-brand-strong dark:prose-headings:text-foreground prose-h1:text-[clamp(2.7rem,5vw,4.8rem)] prose-h1:leading-[0.96] prose-h2:text-[clamp(2rem,4vw,3.4rem)] prose-h2:leading-[1] prose-h3:text-[clamp(1.45rem,2.5vw,2.2rem)] prose-p:font-sans prose-p:text-muted-foreground prose-p:leading-8 prose-a:text-brand prose-a:no-underline prose-a:border-b prose-a:border-brand/25 hover:prose-a:border-brand prose-strong:text-brand-strong dark:prose-strong:text-foreground prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:bg-surface/55 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:font-heading prose-blockquote:text-[1.6rem] prose-blockquote:italic prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
