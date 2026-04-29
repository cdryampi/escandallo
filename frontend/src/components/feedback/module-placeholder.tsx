import { Hammer } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ModulePlaceholderProps {
  title: string
  description: string
}

export const ModulePlaceholder = ({ title, description }: ModulePlaceholderProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Hammer className="size-4 text-brand" />
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="type-body-sm text-muted-foreground">
        Estructura preparada para crecer dentro de su feature sin mezclar lógica con otros dominios.
      </p>
    </CardContent>
  </Card>
)
