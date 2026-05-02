import { createRoute, Outlet } from '@tanstack/react-router'
import type { AnyRoute } from '@tanstack/react-router'
import { ingredientFiltersSchema } from '@/features/ingredients/schemas/ingredient.schema'
import type { IngredientFiltersValues } from '@/features/ingredients/schemas/ingredient.schema'
import { recipesFiltersSchema } from '@/features/recipes/schemas/recipe.schema'
import type { RecipesFiltersValues } from '@/features/recipes/schemas/recipe.schema'
import { lazyNamedRouteComponent } from '@/routes/lazy-route'

type SearchUpdater<TSearch> = (previous: TSearch) => TSearch

const BackofficeLayout = lazyNamedRouteComponent(
  () => import('@/layouts/backoffice-layout'),
  'BackofficeLayout',
  {
    title: 'Cargando backoffice',
    description: 'Preparando shell de trabajo, navegación y permisos.',
  },
)

const DashboardPage = lazyNamedRouteComponent(
  () => import('@/features/dashboard/pages/dashboard-page'),
  'DashboardPage',
  {
    title: 'Cargando dashboard',
    description: 'Preparando métricas, tarjetas y resumen operativo.',
  },
)

const SettingsPage = lazyNamedRouteComponent(
  () => import('@/features/settings/pages/settings-page'),
  'SettingsPage',
  {
    title: 'Cargando ajustes',
    description: 'Preparando configuración general del backoffice.',
  },
)

const CmsPagesPage = lazyNamedRouteComponent(
  () => import('@/features/cms/pages/cms-pages-page'),
  'CmsPagesPage',
  {
    title: 'Cargando páginas CMS',
    description: 'Preparando gestión de contenido editable.',
  },
)

const CmsInboxPage = lazyNamedRouteComponent(
  () => import('@/features/cms/pages/cms-inbox-page'),
  'CmsInboxPage',
  {
    title: 'Cargando buzÃ³n CMS',
    description: 'Preparando consultas, filtros y detalle del buzÃ³n web.',
  },
)

const CmsIndexPage = lazyNamedRouteComponent(
  () => import('@/features/cms/pages/cms-index-page'),
  'CmsIndexPage',
  {
    title: 'Cargando ayuda CMS',
    description: 'Preparando guía del editor de plantillas.',
  },
)

const CmsEditorLayout = lazyNamedRouteComponent(
  () => import('@/features/cms/layouts/cms-editor-layout'),
  'CmsEditorLayout',
  {
    title: 'Cargando editor CMS',
    description: 'Preparando el shell del editor y navegación interna.',
  },
)

const CmsEditorContentPage = lazyNamedRouteComponent(
  () => import('@/features/cms/pages/cms-editor-content-page'),
  'CmsEditorContentPage',
  {
    title: 'Cargando bloques',
    description: 'Preparando la estructura de bloques de la página.',
  },
)

const CmsEditorSeoPage = lazyNamedRouteComponent(
  () => import('@/features/cms/pages/cms-editor-seo-page'),
  'CmsEditorSeoPage',
  {
    title: 'Cargando SEO',
    description: 'Preparando metadatos y optimización para buscadores.',
  },
)

const CmsEditorHistoryPage = lazyNamedRouteComponent(
  () => import('@/features/cms/pages/cms-editor-history-page'),
  'CmsEditorHistoryPage',
  {
    title: 'Cargando historial',
    description: 'Preparando versiones anteriores de la página.',
  },
)

const CmsEditorSettingsPage = lazyNamedRouteComponent(
  () => import('@/features/cms/pages/cms-editor-settings-page'),
  'CmsEditorSettingsPage',
  {
    title: 'Cargando configuración',
    description: 'Preparando ajustes de ruta y visibilidad.',
  },
)

const UsersPage = lazyNamedRouteComponent(
  () => import('@/features/users/pages/users-page'),
  'UsersPage',
  {
    title: 'Cargando usuarios',
    description: 'Preparando permisos, roles y listado de usuarios.',
  },
)

const IngredientListPage = lazyNamedRouteComponent<{ filters: IngredientFiltersValues; onFiltersChange: (patch: Partial<IngredientFiltersValues>) => void }>(
  () => import('@/features/ingredients/pages/ingredient-list-page'),
  'IngredientListPage',
  {
    title: 'Cargando ingredientes',
    description: 'Preparando listado, filtros y acciones del catálogo.',
  },
)

const IngredientCreatePage = lazyNamedRouteComponent(
  () => import('@/features/ingredients/pages/ingredient-create-page'),
  'IngredientCreatePage',
  {
    title: 'Cargando alta de ingrediente',
    description: 'Preparando formulario para crear un ingrediente nuevo.',
  },
)

const IngredientEditPage = lazyNamedRouteComponent<{ ingredientId: string }>(
  () => import('@/features/ingredients/pages/ingredient-edit-page'),
  'IngredientEditPage',
  {
    title: 'Cargando edición de ingrediente',
    description: 'Preparando datos y formulario del ingrediente.',
  },
)

const UnitsPage = lazyNamedRouteComponent(
  () => import('@/features/units/pages/units-page'),
  'UnitsPage',
  {
    title: 'Cargando unidades',
    description: 'Preparando catálogo de unidades y equivalencias.',
  },
)

const SuppliersPage = lazyNamedRouteComponent(
  () => import('@/features/suppliers/pages/suppliers-page'),
  'SuppliersPage',
  {
    title: 'Cargando proveedores',
    description: 'Preparando listado y mantenimiento de proveedores.',
  },
)

const PricesPage = lazyNamedRouteComponent(
  () => import('@/features/prices/pages/prices-page'),
  'PricesPage',
  {
    title: 'Cargando precios',
    description: 'Preparando histórico y control de precios.',
  },
)

const RecipeListPage = lazyNamedRouteComponent<{ filters: RecipesFiltersValues; onFiltersChange: (patch: Partial<RecipesFiltersValues>) => void }>(
  () => import('@/features/recipes/pages/recipe-list-page'),
  'RecipeListPage',
  {
    title: 'Cargando recetas',
    description: 'Preparando filtros, tabla y resumen de recetas.',
  },
)

const RecipeCreatePage = lazyNamedRouteComponent(
  () => import('@/features/recipes/pages/recipe-create-page'),
  'RecipeCreatePage',
  {
    title: 'Cargando nueva receta',
    description: 'Preparando editor y estructura base de receta.',
  },
)

const RecipeDetailPage = lazyNamedRouteComponent<{ recipeId: string }>(
  () => import('@/features/recipes/pages/recipe-detail-page'),
  'RecipeDetailPage',
  {
    title: 'Cargando detalle de receta',
    description: 'Preparando ficha completa y trazabilidad de receta.',
  },
)

const RecipeEditPage = lazyNamedRouteComponent<{ recipeId: string }>(
  () => import('@/features/recipes/pages/recipe-edit-page'),
  'RecipeEditPage',
  {
    title: 'Cargando edición de receta',
    description: 'Preparando editor y costes de la receta.',
  },
)

const RecipeCostPage = lazyNamedRouteComponent<{ versionId: string }>(
  () => import('@/features/recipes/pages/recipe-cost-page'),
  'RecipeCostPage',
  {
    title: 'Cargando coste de receta',
    description: 'Preparando cálculo detallado y desglose de costes.',
  },
)

const AllergensPage = lazyNamedRouteComponent(
  () => import('@/features/allergens/pages/allergens-page'),
  'AllergensPage',
  {
    title: 'Cargando alérgenos',
    description: 'Preparando catálogo y vinculación de alérgenos.',
  },
)

const ReportsPage = lazyNamedRouteComponent(
  () => import('@/features/reports/pages/reports-page'),
  'ReportsPage',
  {
    title: 'Cargando informes',
    description: 'Preparando informes y paneles analíticos.',
  },
)

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

  const cmsLayoutRoute = createRoute({
    getParentRoute: () => backofficeRoute,
    path: 'cms',
    component: () => <Outlet />,
  })

  const cmsIndexRoute = createRoute({
    getParentRoute: () => cmsLayoutRoute,
    path: '/',
    component: CmsIndexPage,
  })

  const cmsPagesRoute = createRoute({
    getParentRoute: () => cmsLayoutRoute,
    path: 'pages',
    component: CmsPagesPage,
  })

  const cmsInboxRoute = createRoute({
    getParentRoute: () => cmsLayoutRoute,
    path: 'inbox',
    component: CmsInboxPage,
  })

  const cmsCreateRoute = createRoute({
    getParentRoute: () => cmsLayoutRoute,
    path: 'pages/create',
    component: CmsPagesPage,
  })

  const cmsEditorLayoutRoute = createRoute({
    getParentRoute: () => cmsLayoutRoute,
    path: 'pages/$pageId',
    component: CmsEditorLayout,
  })

  const cmsEditorIndexRoute = createRoute({
    getParentRoute: () => cmsEditorLayoutRoute,
    path: '/',
    component: () => {
      const { pageId } = cmsEditorLayoutRoute.useParams()
      const navigate = cmsEditorLayoutRoute.useNavigate()
      void navigate({
        to: '/backoffice/cms/pages/$pageId/content',
        params: { pageId },
        replace: true,
      })
      return null
    },
  })

  const cmsEditorContentRoute = createRoute({
    getParentRoute: () => cmsEditorLayoutRoute,
    path: 'content',
    component: CmsEditorContentPage,
  })

  const cmsEditorSeoRoute = createRoute({
    getParentRoute: () => cmsEditorLayoutRoute,
    path: 'seo',
    component: CmsEditorSeoPage,
  })

  const cmsEditorHistoryRoute = createRoute({
    getParentRoute: () => cmsEditorLayoutRoute,
    path: 'history',
    component: CmsEditorHistoryPage,
  })

  const cmsEditorSettingsRoute = createRoute({
    getParentRoute: () => cmsEditorLayoutRoute,
    path: 'settings',
    component: CmsEditorSettingsPage,
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
    cmsLayoutRoute.addChildren([
      cmsIndexRoute,
      cmsPagesRoute,
      cmsInboxRoute,
      cmsCreateRoute,
      cmsEditorLayoutRoute.addChildren([
        cmsEditorIndexRoute,
        cmsEditorContentRoute,
        cmsEditorSeoRoute,
        cmsEditorHistoryRoute,
        cmsEditorSettingsRoute,
      ]),
    ]),
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
