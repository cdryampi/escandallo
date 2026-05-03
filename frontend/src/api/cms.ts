import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/http-client'
import type { ApiResponse } from '@/api/api-types'
import { dashboardKeys } from '@/features/dashboard/hooks/use-dashboard-metrics'
import { recipesApi } from '@/features/recipes/api/recipes.api'
import type { Recipe } from '@/features/recipes/types/recipe.types'
import type {
  CmsPage,
  ContactSubmission,
  ContactSubmissionListResponse,
  ContactSubmissionStatus,
  PageSummary,
  PageVersion,
  PublicContactSubmissionValues,
} from '@/types/cms'
import {
  normalizeCmsPage,
  normalizePageSummaries,
  normalizePageVersion,
} from '@/types/cms'
import type { LandingData } from '@/features/public-site/types/landing.types'

export const cmsKeys = {
  all: ['cms'] as const,
  landing: () => [...cmsKeys.all, 'landing'] as const,
  menu: () => [...cmsKeys.all, 'menu'] as const,
  page: (slug: string, preview = false) => [...cmsKeys.all, 'page', slug, { preview }] as const,
  adminPages: () => [...cmsKeys.all, 'admin-pages'] as const,
  adminPage: (id: number) => [...cmsKeys.all, 'admin-page', id] as const,
  adminDraft: (id: number) => [...cmsKeys.adminPage(id), 'draft'] as const,
  adminContactSubmissions: (status: ContactSubmissionStatus | 'all') =>
    [...cmsKeys.all, 'admin-contact-submissions', status] as const,
  adminContactSubmission: (id: number) => [...cmsKeys.all, 'admin-contact-submission', id] as const,
  recipeOptions: () => [...cmsKeys.all, 'recipe-options'] as const,
  publicRecipes: (recipeIds: readonly number[]) => [...cmsKeys.all, 'public-recipes', ...recipeIds] as const,
}

export interface PublicRecipeSummary {
  id: number
  name: string
  slug: string
  description: string | null
  image_url: string | null
}

export interface UpdatePageVersionPayload {
  blocks?: PageVersion['blocks']
  meta_title?: string | null
  meta_description?: string | null
  meta_image_url?: string | null
  show_in_menu?: boolean
  is_active?: boolean
}

type MaybeWrapped<T> = ApiResponse<T> | T

const unwrapCmsData = <T>(response: MaybeWrapped<T>): T => {
  if (typeof response === 'object' && response !== null && 'data' in response) {
    return response.data as T
  }

  return response as T
}

const cmsRecipeFilters = {
  page: 1,
  perPage: 100,
  search: '',
  sort: 'name',
  direction: 'asc' as const,
  status: 'active' as const,
}

// Public API
export const useLandingData = () =>
  useQuery<LandingData>({
    queryKey: cmsKeys.landing(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<LandingData>>('landing')
      return unwrapCmsData(response)
    },
  })

export const useUpdateLandingModule = <TData extends Record<string, unknown> = Record<string, unknown>>(module: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: TData) => {
      const response = await apiClient.patch<ApiResponse<TData>>(`admin/landing/${module}`, payload)
      return unwrapCmsData(response)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cmsKeys.landing() })
    },
  })
}

export const useCmsMenu = () =>
  useQuery<{ slug: string; label: string }[]>({
    queryKey: cmsKeys.menu(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<{ slug: string; label: string }[]>>('cms/menu')
      return unwrapCmsData(response)
    },
  })

export const useCmsPage = (slug: string, preview = false) =>
  useQuery<CmsPage>({
    queryKey: cmsKeys.page(slug, preview),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<unknown>>(`pages/${slug}`, {
        params: preview ? { preview: true } : {},
      })
      const page = normalizeCmsPage(unwrapCmsData(response))

      if (page == null) {
        throw new Error(`Invalid CMS page payload for slug "${slug}".`)
      }

      return page
    },
  })

export const usePublicRecipeHighlights = (recipeIds: number[]) =>
  useQuery<PublicRecipeSummary[]>({
    queryKey: cmsKeys.publicRecipes(recipeIds),
    enabled: recipeIds.length > 0,
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<PublicRecipeSummary[]>>('public/recipes', {
        params: { ids: recipeIds },
      })

      const recipes = unwrapCmsData(response)
      const order = new Map(recipeIds.map((recipeId, index) => [recipeId, index]))

      return [...recipes].sort((left, right) => {
        const leftOrder = order.get(Number(left.id)) ?? Number.MAX_SAFE_INTEGER
        const rightOrder = order.get(Number(right.id)) ?? Number.MAX_SAFE_INTEGER
        return leftOrder - rightOrder
      })
    },
  })

export const useCreateContactSubmission = () =>
  useMutation({
    mutationFn: async (payload: PublicContactSubmissionValues & { page_id: number }) => {
      const response = await apiClient.post<ApiResponse<ContactSubmission>>('contact-submissions', payload)
      return unwrapCmsData(response)
    },
  })

// Admin API
export const useAdminPages = () =>
  useQuery<PageSummary[]>({
    queryKey: cmsKeys.adminPages(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<unknown> | unknown>('admin/pages')
      return normalizePageSummaries(unwrapCmsData(response))
    },
  })

export const useAdminPage = (id: number) =>
  useQuery<CmsPage>({
    queryKey: cmsKeys.adminPage(id),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<unknown>>(`admin/pages/${id}`)
      const page = normalizeCmsPage(unwrapCmsData(response))

      if (page == null) {
        throw new Error(`Invalid CMS admin page payload for id "${id}".`)
      }

      return page
    },
  })

export const useAdminPageDraft = (pageId: number) =>
  useQuery<PageVersion>({
    queryKey: cmsKeys.adminDraft(pageId),
    queryFn: async () => {
      const response = await apiClient.post<ApiResponse<unknown>>(`admin/pages/${pageId}/draft`)
      const draft = normalizePageVersion(unwrapCmsData(response))

      if (draft == null) {
        throw new Error(`Invalid CMS draft payload for page "${pageId}".`)
      }

      return draft
    },
  })

export const useUpdatePageVersion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ versionId, data }: { versionId: number; data: UpdatePageVersionPayload }) => {
      const response = await apiClient.put<ApiResponse<unknown>>(`admin/pages/versions/${versionId}`, data)
      const version = normalizePageVersion(unwrapCmsData(response))

      if (version == null) {
        throw new Error(`Invalid CMS version payload for version "${versionId}".`)
      }

      return version
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: cmsKeys.adminDraft(data.page_id) })
      queryClient.invalidateQueries({ queryKey: cmsKeys.adminPages() })
      queryClient.invalidateQueries({ queryKey: cmsKeys.adminPage(data.page_id) })
    },
  })
}

export const usePublishPageVersion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (versionId: number) => {
      const response = await apiClient.post<ApiResponse<unknown>>(`admin/pages/versions/${versionId}/publish`)
      const version = normalizePageVersion(unwrapCmsData(response))

      if (version == null) {
        throw new Error(`Invalid published CMS version payload for version "${versionId}".`)
      }

      return version
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: cmsKeys.adminDraft(data.page_id) })
      queryClient.invalidateQueries({ queryKey: cmsKeys.adminPages() })
      queryClient.invalidateQueries({ queryKey: cmsKeys.adminPage(data.page_id) })

      const page = queryClient.getQueryData<CmsPage>(cmsKeys.adminPage(data.page_id))
      if (page?.slug) {
        queryClient.invalidateQueries({ queryKey: cmsKeys.page(page.slug) })
      }
    },
  })
}

export const useUploadCmsMedia = () =>
  useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)

      const response = await apiClient.post<ApiResponse<{ url: string }>>('admin/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return unwrapCmsData(response)
    },
  })

export const useAdminMedia = () =>
  useQuery<{ url: string }[]>({
    queryKey: [...cmsKeys.all, 'admin-media'] as const,
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<{ url: string }[]>>('admin/media')
      return unwrapCmsData(response)
    },
  })

export const useAdminContactSubmissions = (status: ContactSubmissionStatus | 'all' = 'all') =>
  useQuery<ContactSubmissionListResponse>({
    queryKey: cmsKeys.adminContactSubmissions(status),
    queryFn: async () => {
      return apiClient.get<ContactSubmissionListResponse>('admin/contact-submissions', {
        params: status === 'all' ? {} : { status },
      })
    },
  })

export const useAdminContactSubmission = (submissionId: number | null) =>
  useQuery<ContactSubmission>({
    queryKey: cmsKeys.adminContactSubmission(submissionId ?? 0),
    enabled: submissionId != null,
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<ContactSubmission>>(`admin/contact-submissions/${submissionId}`)
      return unwrapCmsData(response)
    },
  })

export const useUpdateContactSubmissionStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      submissionId,
      status,
    }: {
      submissionId: number
      status: ContactSubmissionStatus
    }) => {
      const response = await apiClient.patch<ApiResponse<ContactSubmission>>(
        `admin/contact-submissions/${submissionId}`,
        { status },
      )

      return unwrapCmsData(response)
    },
    onSuccess: (submission) => {
      void queryClient.invalidateQueries({
        queryKey: cmsKeys.adminContactSubmission(submission.id),
      })
      void queryClient.invalidateQueries({
        queryKey: [...cmsKeys.all, 'admin-contact-submissions'],
      })
      void queryClient.invalidateQueries({
        queryKey: dashboardKeys.all,
      })
    },
  })
}

export const useCmsRecipeOptions = () =>
  useQuery<Recipe[]>({
    queryKey: cmsKeys.recipeOptions(),
    queryFn: async () => {
      const response = await recipesApi.list(cmsRecipeFilters)
      return response.data
    },
  })

export { unwrapCmsData }
