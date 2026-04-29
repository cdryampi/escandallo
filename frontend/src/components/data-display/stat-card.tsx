import type { LucideIcon } from 'lucide-react'
import { MetricCard } from '@/components/data-display/metric-card'

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
}

export const StatCard = ({ title, value, description, icon: Icon }: StatCardProps) => (
  <MetricCard title={title} value={value} description={description} icon={Icon} />
)
