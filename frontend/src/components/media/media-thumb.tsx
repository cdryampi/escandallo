import { ImageOff } from 'lucide-react'
import { cn } from '@/lib/cn'
import { resolveMediaUrl } from '@/lib/resolve-media-url'

interface MediaThumbProps {
  src?: string | null
  alt: string
  className?: string
}

export const MediaThumb = ({ src, alt, className }: MediaThumbProps) => {
  const resolvedSrc = resolveMediaUrl(src)

  if (resolvedSrc == null) {
    return (
      <div
        className={cn(
          'flex h-[44px] w-[44px] min-w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-[var(--ds-radius-md)] border border-border bg-surface-container text-muted-foreground',
          className,
        )}
      >
        <ImageOff className="size-4" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'h-[44px] w-[44px] min-w-[44px] shrink-0 overflow-hidden rounded-[var(--ds-radius-md)] border border-border bg-surface-container',
        className,
      )}
    >
      <img
        src={resolvedSrc}
        alt={alt}
        loading="lazy"
        className="block h-full w-full object-cover"
      />
    </div>
  )
}
