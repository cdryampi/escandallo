import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const badgeVariants = cva('inline-flex items-center rounded-[var(--ds-radius-badge)] border px-2.5 py-1 type-label-md', {
  variants: {
    variant: {
      default: 'border-border bg-surface-subtle text-muted-foreground',
      success: 'border-success/20 bg-success-soft text-success-foreground',
      warning: 'border-warning/20 bg-warning-soft text-warning-foreground',
      danger: 'border-danger/20 bg-danger-soft text-danger-foreground',
      info: 'border-info/20 bg-info-soft text-info-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
)
