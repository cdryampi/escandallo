import { LogOut } from 'lucide-react'
import type { PermissionUser } from '@/types/common'
import { Button } from '@/components/ui/button'

interface TopbarProps {
  user: PermissionUser
  onLogout: () => void
}

export const Topbar = ({ user, onLogout }: TopbarProps) => (
  <header className="border-b border-border bg-surface-raised px-6 py-4">
    <div className="mx-auto flex max-w-[96rem] flex-wrap items-center justify-between gap-4">
      <div className="space-y-1">
        <p className="type-label-md text-muted-foreground">Sesión activa</p>
        <p className="type-body-md text-foreground">
          {user.name} · {user.email}
        </p>
      </div>
      <Button variant="outline" onClick={onLogout}>
        <LogOut className="size-4" />
        Cerrar sesión
      </Button>
    </div>
  </header>
)
