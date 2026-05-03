import { Link } from '@tanstack/react-router'
import { ArrowRight, Utensils } from 'lucide-react'
import { usePublicRecipeHighlights } from '@/api/cms'
import { resolveMediaUrl } from '@/lib/resolve-media-url'
import type { MenuHighlightsBlockData } from '@/types/cms'

interface Props {
  data: MenuHighlightsBlockData
}

export const MenuHighlightsBlock = ({ data }: Props) => {
  const { data: recipes = [], isLoading, error } = usePublicRecipeHighlights(data.recipe_ids)

  if (!data.title && data.recipe_ids.length === 0) {
    return null
  }

  const [leadRecipe, ...supportRecipes] = recipes

  return (
    <section className="public-section bg-background">
      <div className="public-container space-y-14">
        <div className="grid gap-10 xl:grid-cols-[0.8fr_1.2fr] xl:items-end">
          <div className="public-heading">
            <p className="ui-kicker">Seleccion de cocina</p>
            {data.title ? <h2 className="mt-6 type-display-md text-brand-strong dark:text-foreground">{data.title}</h2> : null}
            <div className="public-divider" />
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="type-body-lg max-w-2xl text-muted-foreground">
              Piezas mostradas con aire, imagen y una lectura mas serena. Menos catalogo. Mas presencia.
            </p>
            <Link to="/carta" className="public-outline-button w-fit">
              Consultar carta completa
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="public-surface-card h-[34rem] animate-pulse" />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
              {[1, 2].map((placeholder) => (
                <div key={placeholder} className="public-surface-card h-[16rem] animate-pulse" />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="rounded-[1.4rem] border border-danger/20 bg-danger-soft/10 p-12 text-center">
            <p className="type-body-sm font-medium text-danger-foreground">
              No se pudieron cargar las recetas seleccionadas. Por favor, consulte la carta directamente.
            </p>
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            {leadRecipe ? <RecipeCard recipe={leadRecipe} featured index={0} /> : null}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
              {supportRecipes.map((recipe, index) => (
                <RecipeCard key={recipe.id} recipe={recipe} index={index + 1} compact />
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-[1.4rem] border border-dashed border-border/60 bg-surface/40 py-24 text-center">
            <Utensils className="mx-auto size-12 opacity-10" />
            <p className="mt-6 type-body-sm text-muted-foreground">La seleccion se esta actualizando.</p>
          </div>
        )}
      </div>
    </section>
  )
}

interface RecipeCardProps {
  recipe: {
    id: number
    name: string
    description: string | null
    image_url: string | null
  }
  index: number
  featured?: boolean
  compact?: boolean
}

const RecipeCard = ({ recipe, index, featured = false, compact = false }: RecipeCardProps) => {
  const imageUrl = resolveMediaUrl(recipe.image_url)

  return (
    <article
      className={`public-surface-card group overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:shadow-overlay ${
        featured ? 'grid gap-0 xl:grid-cols-[0.58fr_0.42fr]' : compact ? 'grid gap-0 md:grid-cols-[0.45fr_0.55fr]' : ''
      }`}
    >
      <div className={`relative overflow-hidden bg-surface/10 ${featured ? 'min-h-[34rem]' : compact ? 'min-h-[16rem]' : 'aspect-[4/3]'}`}>
        <div className="absolute left-0 top-0 z-10 h-full w-1 bg-brand opacity-0 transition-opacity group-hover:opacity-100" />
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={recipe.name}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-brand/10">
            <Utensils className="size-10" />
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col justify-between ${featured ? 'p-10 md:p-12' : 'p-7'}`}>
        <div>
          <p className="type-label-md text-[10px] tracking-[0.16em] text-brand/42">
            Pieza {(index + 1).toString().padStart(2, '0')}
          </p>
          <h3 className={`mt-4 font-heading tracking-[-0.04em] text-brand-strong dark:text-foreground ${featured ? 'text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.94]' : 'text-[2rem] leading-[1.02]'}`}>
            {recipe.name}
          </h3>
          <div className="public-divider mt-6" />
          <p className={`mt-6 leading-relaxed text-muted-foreground ${featured ? 'type-body-lg max-w-md' : 'type-body-sm'}`}>
            {recipe.description || 'Una elaboracion seleccionada por equilibrio, claridad de producto y buena lectura de carta.'}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between gap-5">
          <span className="type-label-md text-[10px] tracking-[0.16em] text-brand/38">
            {featured ? 'Escaparate principal' : 'Tecnica y producto'}
          </span>
          <Link to="/carta" className="public-ghost-link">
            <span>Detalle</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
