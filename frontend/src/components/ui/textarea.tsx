import * as React from 'react'
import { cn } from '@/lib/cn'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'min-h-28 w-full rounded-md border border-border bg-surface-elevated px-3 py-2 font-sans text-[13px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus-visible:border-brand/40 focus-visible:ring-2 focus-visible:ring-brand/5 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  ),
)

Textarea.displayName = 'Textarea'
