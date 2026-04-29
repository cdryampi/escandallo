import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'

type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

interface StatusBadgeProps {
  children: ReactNode
  tone?: StatusTone
}

const toneToVariant: Record<StatusTone, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  neutral: 'default',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
}

export const StatusBadge = ({ children, tone = 'neutral' }: StatusBadgeProps) => (
  <Badge variant={toneToVariant[tone]}>{children}</Badge>
)
