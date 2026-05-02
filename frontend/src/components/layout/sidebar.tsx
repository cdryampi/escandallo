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
        'hidden shrink-0 border-r border-brand-strong/10 bg-brand-strong text-brand-foreground lg:flex lg:flex-col',
        sidebarOpen ? 'lg:w-72' : 'lg:w-20',
        'transition-[width] duration-300 ease-in-out'
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-brand-foreground/10">
        <div className={cn('overflow-hidden transition-all duration-300', sidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0')}>
          <div className="flex flex-col">
            <span className="type-label-md text-brand-muted leading-tight">Escandallo</span>
            <span className="type-headline-sm text-brand-foreground font-semibold tracking-tight">OPERACIONES</span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-brand-foreground hover:bg-brand-foreground/10 active:bg-brand-foreground/20 px-2" 
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <PanelLeftClose className="size-5" /> : <PanelLeftOpen className="size-5" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1.5 px-3 py-6 overflow-y-auto">
        {backofficeNavigation.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === '/backoffice' }}
            activeProps={{ className: 'bg-brand-foreground/15 text-brand-foreground shadow-sm border-l-4 border-brand-muted' }}
            className={cn(
              'flex items-center gap-3 border-l-4 border-transparent px-3 py-2.5 type-body-md text-brand-muted transition-all hover:bg-brand-foreground/10 hover:text-brand-foreground group',
              !sidebarOpen && 'justify-center px-0'
            )}
          >
            <item.icon className={cn('size-5 shrink-0 transition-transform group-hover:scale-110', !sidebarOpen && 'size-6')} />
            <span className={cn(
              'transition-all duration-300 whitespace-nowrap', 
              sidebarOpen ? 'opacity-100' : 'absolute left-20 hidden opacity-0'
            )}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {sidebarOpen && (
        <div className="p-4 border-t border-brand-foreground/10">
          <div className="rounded border border-brand-muted/20 bg-brand-foreground/5 p-3">
            <p className="type-label-md text-brand-muted mb-1 opacity-70">SISTEMA</p>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-brand-muted" />
              <p className="type-body-sm text-brand-foreground font-medium">Entorno Local</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
