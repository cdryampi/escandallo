import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { resolveMediaUrl } from '@/lib/resolve-media-url'
import { ImageIcon, X, ImagePlus, ExternalLink } from 'lucide-react'
import { MediaPicker } from './MediaPicker'

interface Props {
  value?: string
  onChange: (url: string) => void
  label?: string
  description?: string
}

export const MediaField = ({ value, onChange, label, description }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const fullUrl = resolveMediaUrl(value)

  const handleSelect = (url: string) => {
    onChange(url)
    setIsOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange('')
  }

  return (
    <div className="space-y-4">
      {label && <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">{label}</label>}
      {description && <p className="text-[10px] text-muted-foreground leading-relaxed italic opacity-80">{description}</p>}

      <div className="relative group pt-1">
        {value ? (
          <div className="space-y-3">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface-container-low shadow-inner">
              <img
                src={fullUrl ?? ''}
                alt="Preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-black/15 to-transparent p-3">
                <div className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  Imagen seleccionada
                </div>
                <a
                  href={fullUrl ?? '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white/90 p-1.5 text-muted-foreground shadow-sm transition-colors hover:text-primary"
                  title="Ver original"
                >
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button type="button" variant="secondary" size="sm" className="gap-2">
                    <ImageIcon className="size-4" />
                    Cambiar imagen
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Biblioteca de Medios</DialogTitle>
                  </DialogHeader>
                  <MediaPicker onSelect={handleSelect} currentUrl={value} />
                </DialogContent>
              </Dialog>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleClear}
              >
                <X className="size-4" />
                Quitar imagen
              </Button>
              <p className="text-[10px] text-muted-foreground">
                Al cambiar la imagen, recuerda guardar el bloque para persistirla.
              </p>
            </div>
          </div>
        ) : (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="flex aspect-[21/9] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-surface-container-lowest transition-all hover:border-primary hover:bg-primary/5 group"
              >
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-surface-container group-hover:bg-primary/10 transition-colors">
                  <ImagePlus className="size-4 text-muted-foreground group-hover:text-primary" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary">
                  Seleccionar imagen
                </span>
                <p className="mt-1 text-[9px] text-muted-foreground/60">
                  Formatos: JPG, PNG, WEBP (Max 2MB)
                </p>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Biblioteca de Medios</DialogTitle>
              </DialogHeader>
              <MediaPicker onSelect={handleSelect} currentUrl={value} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
