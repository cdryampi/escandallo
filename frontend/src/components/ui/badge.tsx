import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 type-label-md transition-colors',
  {
    variants: {
      variant: {
        default: 'border-border bg-surface text-muted-foreground',
        brand: 'border-brand/10 bg-brand/5 text-brand-strong',
        success: 'border-success/20 bg-success-soft/30 text-success-foreground',
        warning: 'border-warning/20 bg-warning-soft/30 text-warning-foreground',
        danger: 'border-danger/20 bg-danger-soft/30 text-danger-foreground',
        info: 'border-info/20 bg-info-soft/30 text-info-foreground',
        outline: 'border-border bg-transparent text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
)
