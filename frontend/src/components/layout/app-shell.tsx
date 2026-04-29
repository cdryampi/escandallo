import type { PropsWithChildren, ReactNode } from 'react'

interface AppShellProps extends PropsWithChildren {
  sidebar: ReactNode
  topbar: ReactNode
  breadcrumbs?: ReactNode
}

export const AppShell = ({ sidebar, topbar, breadcrumbs, children }: AppShellProps) => (
  <div className="min-h-screen bg-background text-foreground lg:flex">
    {sidebar}
    <div className="flex min-h-screen flex-1 flex-col">
      {topbar}
      <main className="flex-1 px-6 py-6 xl:px-8">
        <div className="mx-auto flex w-full max-w-[96rem] flex-col gap-6">
          {breadcrumbs}
          {children}
        </div>
      </main>
    </div>
  </div>
)
