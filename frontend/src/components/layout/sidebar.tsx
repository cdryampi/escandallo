import { Link } from '@tanstack/react-router'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { backofficeNavigation } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { useAppUiStore } from '@/stores/app-ui-store'
import { Button } from '@/components/ui/button'

export const Sidebar = () => {
  const sidebarOpen = useAppUiStore((state) => state.sidebarOpen)
  const toggleSidebar = useAppUiStore((state) => state.toggleSidebar)

  return (
    <aside
      className={cn(
        'hidden shrink-0 border-r border-brand bg-brand-strong text-brand-foreground lg:flex lg:flex-col',
        sidebarOpen ? 'lg:w-72' : 'lg:w-24',
      )}
    >
      <div className="flex items-center justify-between border-b border-brand px-4 py-4">
        <div className={cn('overflow-hidden transition-all', sidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0')}>
          <p className="type-label-md text-brand-muted">Escandallo</p>
          <p className="type-headline-sm text-brand-foreground">Backoffice</p>
        </div>
        <Button variant="ghost" className="text-brand-foreground hover:bg-brand hover:text-brand-foreground" onClick={toggleSidebar}>
          {sidebarOpen ? <PanelLeftClose className="size-4" /> : <PanelLeftOpen className="size-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {backofficeNavigation.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="block"
            activeProps={{ className: 'rounded-lg bg-brand text-brand-foreground' }}
          >
            <div className="flex items-center gap-3 rounded-lg px-3 py-3 type-body-md text-brand-muted transition-colors hover:bg-brand hover:text-brand-foreground">
              <item.icon className="size-4 shrink-0" />
              <span className={cn('transition-all', sidebarOpen ? 'opacity-100' : 'hidden opacity-0')}>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
