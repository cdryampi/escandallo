import { Bell, LogOut, Search } from 'lucide-react'
import type { PermissionUser } from '@/types/common'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TopbarProps {
  user: PermissionUser
  onLogout: () => void
}

export const Topbar = ({ user, onLogout }: TopbarProps) => (
  <header className="h-16 border-b border-border bg-surface-raised px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm shadow-brand/5">
    <div className="flex items-center flex-1 gap-8">
      <div className="relative w-full max-w-md hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input 
          placeholder="Buscar ingredientes, recetas o proveedores..." 
          className="pl-10 h-10 bg-surface border-border/50 focus:bg-white focus:border-brand transition-all"
        />
      </div>
    </div>
    
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-brand/5 hover:text-brand transition-colors">
        <Bell className="size-5" />
        <span className="absolute top-2 right-2 size-2 bg-warning rounded-full ring-2 ring-white" />
      </Button>

      <div className="h-8 w-px bg-border/50 mx-2" />

      <div className="flex items-center gap-4 group cursor-pointer pr-2">
        <div className="hidden sm:flex flex-col items-end">
          <p className="type-body-md font-bold text-foreground leading-none group-hover:text-brand transition-colors">
            {user.name}
          </p>
          <p className="type-body-sm text-muted-foreground font-medium">
            Administrador
          </p>
        </div>
        <div className="size-10 rounded-full bg-brand-muted/20 border-2 border-brand/10 flex items-center justify-center overflow-hidden group-hover:border-brand transition-all">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1e4d2b&color=fff`} 
            alt="User avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="h-8 w-px bg-border/50 mx-2" />

      <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground hover:text-danger hover:bg-danger/5 gap-2 px-3 h-9 transition-colors font-semibold">
        <LogOut className="size-4" />
        <span className="hidden sm:inline">Cerrar sesión</span>
      </Button>
    </div>
  </header>
)
