import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '@/features/dashboard/api/dashboard.api'

export const dashboardKeys = {
  all: ['dashboard'] as const,
  metrics: () => [...dashboardKeys.all, 'metrics'] as const,
}

export const useDashboardMetricsQuery = () =>
  useQuery({
    queryKey: dashboardKeys.metrics(),
    queryFn: () => dashboardApi.getMetrics(),
  })
