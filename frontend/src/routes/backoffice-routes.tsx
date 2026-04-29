import { createRoute } from '@tanstack/react-router'
import type { AnyRoute } from '@tanstack/react-router'
import { BackofficeLayout } from '@/layouts/backoffice-layout'
import { DashboardPage } from '@/features/dashboard'
import { CmsPagesPage } from '@/features/cms'
import { SettingsPage } from '@/features/settings'
import { UsersPage } from '@/features/users'
import {
  IngredientCreatePage,
  IngredientEditPage,
  IngredientListPage,
  ingredientFiltersSchema,
} from '@/features/ingredients'
import type { IngredientFiltersValues } from '@/features/ingredients/schemas/ingredient.schema'
import { UnitsPage } from '@/features/units'
import { SuppliersPage } from '@/features/suppliers'
import { PricesPage } from '@/features/prices'
import {
  RecipeCostPage,
  RecipeCreatePage,
  RecipeDetailPage,
  RecipeEditPage,
  RecipeListPage,
  recipesFiltersSchema,
} from '@/features/recipes'
import type { RecipesFiltersValues } from '@/features/recipes/schemas/recipe.schema'
import { AllergensPage } from '@/features/allergens'
import { ReportsPage } from '@/features/reports'

type SearchUpdater<TSearch> = (previous: TSearch) => TSearch

export const buildBackofficeRoutes = (rootRoute: AnyRoute) => {
  const backofficeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/backoffice',
    component: BackofficeLayout,
  })

  const backofficeIndexRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: '/',
    component: DashboardPage,
  })

  const settingsRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'settings',
    component: SettingsPage,
  })

  const cmsPagesRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'cms/pages',
    component: CmsPagesPage,
  })

  const cmsCreateRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'cms/pages/create',
    component: CmsPagesPage,
  })

  const cmsEditRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'cms/pages/$pageId/edit',
    component: CmsPagesPage,
  })

  const usersRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'users',
    component: UsersPage,
  })

  const ingredientsRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'ingredients',
    validateSearch: ingredientFiltersSchema,
    component: () => {
      const search = ingredientsRoute.useSearch()
      const navigate = ingredientsRoute.useNavigate()

      return (
        <IngredientListPage
          filters={search}
          onFiltersChange={(patch) =>
            void navigate({
              search: ((previous: IngredientFiltersValues) => ({
                ...previous,
                ...patch,
              })) as SearchUpdater<IngredientFiltersValues>,
            })
          }
        />
      )
    },
  })

  const ingredientCreateRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'ingredients/create',
    component: IngredientCreatePage,
  })

  const ingredientEditRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'ingredients/$ingredientId/edit',
    component: () => {
      const params = ingredientEditRoute.useParams()
      return <IngredientEditPage ingredientId={params.ingredientId} />
    },
  })

  const ingredientCategoriesRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'ingredient-categories',
    component: UnitsPage,
  })

  const unitsRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'units',
    component: UnitsPage,
  })

  const suppliersRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'suppliers',
    component: SuppliersPage,
  })

  const supplierCreateRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'suppliers/create',
    component: SuppliersPage,
  })

  const supplierEditRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'suppliers/$supplierId/edit',
    component: SuppliersPage,
  })

  const pricesRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'prices',
    component: PricesPage,
  })

  const recipesRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'recipes',
    validateSearch: recipesFiltersSchema,
    component: () => {
      const search = recipesRoute.useSearch()
      const navigate = recipesRoute.useNavigate()

      return (
        <RecipeListPage
          filters={search}
          onFiltersChange={(patch) =>
            void navigate({
              search: ((previous: RecipesFiltersValues) => ({
                ...previous,
                ...patch,
              })) as SearchUpdater<RecipesFiltersValues>,
            })
          }
        />
      )
    },
  })


  const recipeCreateRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'recipes/create',
    component: RecipeCreatePage,
  })

  const recipeDetailRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'recipes/$recipeId',
    component: () => {
      const params = recipeDetailRoute.useParams()
      return <RecipeDetailPage recipeId={params.recipeId} />
    },
  })

  const recipeEditRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'recipes/$recipeId/edit',
    component: () => {
      const params = recipeEditRoute.useParams()
      return <RecipeEditPage recipeId={params.recipeId} />
    },
  })

  const recipeCostRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'recipes/$recipeId/cost',
    component: () => {
      const params = recipeCostRoute.useParams()
      return <RecipeCostPage versionId={params.recipeId} />
    },
  })

  const allergensRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'allergens',
    component: AllergensPage,
  })

  const reportsRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'reports',
    component: ReportsPage,
  })

  return backofficeRoute.addChildren([
    backofficeIndexRoute,
    settingsRoute,
    cmsPagesRoute,
    cmsCreateRoute,
    cmsEditRoute,
    usersRoute,
    ingredientsRoute,
    ingredientCreateRoute,
    ingredientEditRoute,
    ingredientCategoriesRoute,
    unitsRoute,
    suppliersRoute,
    supplierCreateRoute,
    supplierEditRoute,
    pricesRoute,
    recipesRoute,
    recipeCreateRoute,
    recipeDetailRoute,
    recipeEditRoute,
    recipeCostRoute,
    allergensRoute,
    reportsRoute,
  ])
}
