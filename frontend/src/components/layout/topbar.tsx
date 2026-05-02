import { LogOut } from 'lucide-react'
import type { PermissionUser } from '@/types/common'
import { Button } from '@/components/ui/button'

interface TopbarProps {
  user: PermissionUser
  onLogout: () => void
}

export const Topbar = ({ user, onLogout }: TopbarProps) => (
  <header className="h-16 border-b border-border bg-surface-raised px-8 flex items-center justify-between sticky top-0 z-30">
    <div className="flex items-center gap-4">
      <div className="size-8 rounded-full bg-brand-muted/20 border border-brand/10 flex items-center justify-center">
        <span className="type-label-md text-brand font-bold">{user.name.charAt(0)}</span>
      </div>
      <div className="flex flex-col">
        <p className="type-body-md font-semibold text-foreground leading-none">
          {user.name}
        </p>
        <p className="type-body-sm text-muted-foreground">
          {user.email}
        </p>
      </div>
    </div>
    
    <div className="flex items-center gap-6">
      <div className="hidden md:flex flex-col items-end border-r border-border pr-6">
        <p className="type-label-md text-muted-foreground leading-none mb-1.5 opacity-80 tracking-wider">ROL DE ACCESO</p>
        <p className="type-body-sm font-semibold text-foreground uppercase tracking-tight">Administrador de Sistema</p>
      </div>
      
      <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground hover:text-danger hover:bg-danger/5 gap-2 px-3 h-9 transition-colors">
        <LogOut className="size-4" />
        <span className="hidden sm:inline font-medium">Cerrar sesión</span>
      </Button>
    </div>
  </header>
)
