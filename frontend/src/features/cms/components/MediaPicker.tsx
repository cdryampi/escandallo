import { useAdminMedia, useUploadCmsMedia } from '@/api/cms'
import { resolveMediaUrl } from '@/lib/resolve-media-url'
import { Plus, Check, Loader2 } from 'lucide-react'
import { useRef } from 'react'
import { toast } from 'sonner'

interface Props {
  onSelect: (url: string) => void
  currentUrl?: string
}

export const MediaPicker = ({ onSelect, currentUrl }: Props) => {
  const { data: media, isLoading, refetch } = useAdminMedia()
  const uploadMedia = useUploadCmsMedia()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const result = await uploadMedia.mutateAsync(file)
      onSelect(result.url)
      void refetch()
      toast.success('Imagen subida y seleccionada.')
    } catch {
      toast.error('Error al subir imagen.')
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {/* Botón de subida */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex aspect-square flex-col items-center justify-center rounded-lg border-2 border-dashed border-border transition-colors hover:border-primary hover:bg-primary/5"
        >
          <Plus className="size-6 text-muted-foreground group-hover:text-primary" />
          <span className="mt-1 text-[10px] font-bold uppercase text-muted-foreground group-hover:text-primary">
            Subir
          </span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            className="hidden"
            accept="image/*"
          />
        </button>

        {/* Galería de imágenes */}
        {media?.map((item) => {
          const isSelected = item.url === currentUrl
          const fullUrl = resolveMediaUrl(item.url)
          
          return (
            <button
              key={item.url}
              type="button"
              onClick={() => onSelect(item.url)}
              className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-border'
              }`}
            >
              <img
                src={fullUrl ?? ''}
                alt="CMS Media"
                className="h-full w-full object-cover"
              />
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                  <div className="rounded-full bg-primary p-1 shadow-lg">
                    <Check className="size-3 text-white" />
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {!media?.length && !isLoading && (
        <p className="py-4 text-center text-xs text-muted-foreground">
          No hay imágenes subidas aún.
        </p>
      )}
    </div>
  )
}
