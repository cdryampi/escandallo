import { usePublicRecipeHighlights } from '@/api/cms'
import { resolveMediaUrl } from '@/lib/resolve-media-url'
import type { MenuHighlightsBlockData } from '@/types/cms'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Utensils } from 'lucide-react'

interface Props {
  data: MenuHighlightsBlockData
}

export const MenuHighlightsBlock = ({ data }: Props) => {
  const { data: recipes = [], isLoading, error } = usePublicRecipeHighlights(data.recipe_ids)

  if (!data.title && data.recipe_ids.length === 0) {
    return null
  }

  return (
    <section className="overflow-hidden bg-surface-container-lowest py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl text-left">
            <span className="mb-4 inline-block border-b-2 border-accent/20 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-accent font-display">
              Seleccion del chef
            </span>
            {data.title ? <h2 className="text-4xl font-bold text-on-surface font-display">{data.title}</h2> : null}
          </div>
          <Link to="/carta" className="group flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary-container">
            Ver carta completa
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((placeholder) => (
              <div key={placeholder} className="h-[450px] rounded-2xl bg-surface-container-low animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-danger/20 bg-danger-soft/10 px-6 py-10 text-center">
            <p className="text-sm text-danger">No se pudieron cargar recetas publicas para este bloque editorial.</p>
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => {
              const imageUrl = resolveMediaUrl(recipe.image_url)

              return (
                <div
                  key={recipe.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-white transition-all duration-300 hover:border-primary/20 hover:shadow-2xl"
                >
                  <div className="relative h-72 overflow-hidden bg-surface-container">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={recipe.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-surface-container-low text-on-surface-variant opacity-40">
                        <Utensils className="mb-2 size-12" />
                        <span className="text-xs font-bold uppercase">Sin imagen</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="mb-4 text-2xl font-bold text-on-surface font-display transition-colors group-hover:text-primary">
                      {recipe.name}
                    </h3>
                    <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-on-surface-variant font-body">
                      {recipe.description ||
                        'Una de nuestras especialidades seleccionadas cuidadosamente por su equilibrio de sabores y tecnica.'}
                    </p>
                    <div className="mt-auto">
                      <Link
                        to="/carta"
                        className="group/link inline-flex items-center text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-container"
                      >
                        Ver carta
                        <div className="ml-2 h-px w-8 bg-primary transition-all group-hover/link:w-12" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-border bg-surface-container-low py-20 text-center">
            <Utensils className="mx-auto mb-4 size-12 text-on-surface-variant opacity-20" />
            <p className="text-on-surface-variant font-body italic">
              Las sugerencias del dia se estan preparando. Consulta carta completa.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
