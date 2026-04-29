import { Outlet } from '@tanstack/react-router'
import { PublicHeader } from '@/components/layout/public-header'
import { PublicFooter } from '@/components/layout/public-footer'

export const PublicLayout = () => (
  <div className="min-h-screen bg-background text-foreground">
    <PublicHeader />
    <main>
      <Outlet />
    </main>
    <PublicFooter />
  </div>
)
