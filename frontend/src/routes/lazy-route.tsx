import { Suspense, lazy, type ComponentType } from 'react'
import { LoadingState } from '@/components/feedback/loading-state'

interface RouteLoadingFallback {
  title?: string
  description?: string
}

export const lazyNamedRouteComponent = <TProps extends object = Record<string, never>>(
  loader: () => Promise<Record<string, unknown>>,
  exportName: string,
  fallback?: RouteLoadingFallback,
) => {
  const LazyComponent = lazy(async () => {
    const module = await loader()

    return {
      default: module[exportName] as ComponentType<TProps>,
    }
  })

  const RouteComponent = (props: TProps) => (
    <Suspense fallback={<LoadingState {...fallback} />}>
      <LazyComponent {...props} />
    </Suspense>
  )

  RouteComponent.displayName = `LazyRoute(${exportName})`

  return RouteComponent
}
