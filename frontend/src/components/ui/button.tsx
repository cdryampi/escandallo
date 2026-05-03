import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent text-[13px] font-semibold transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:[stroke-width:var(--ds-icon-stroke)]',
  {
    variants: {
      variant: {
        default: 'bg-brand text-brand-foreground hover:bg-brand-strong',
        secondary: 'bg-surface text-foreground border-border hover:bg-surface-elevated hover:border-border-strong',
        outline:
          'border-border bg-transparent text-foreground hover:border-brand/40 hover:text-brand',
        ghost: 'text-foreground hover:bg-surface',
        danger: 'border-danger/30 text-danger hover:bg-danger/5',
        link: 'text-brand underline-offset-4 hover:underline font-semibold tracking-tight',
      },
      size: {
        default: 'h-10 px-5',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-sm',
        icon: 'size-10 p-0',
        'icon-sm': 'size-8 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'button'

    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  },
)

Button.displayName = 'Button'
