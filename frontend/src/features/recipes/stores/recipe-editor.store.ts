import { create } from 'zustand'
import type { RecipeItemDraft } from '@/features/recipes/types/recipe.types'

interface RecipeEditorState {
  items: RecipeItemDraft[]
  selectedItemId: string | null
  previewVisible: boolean
  setItems: (items: RecipeItemDraft[]) => void
  addItem: () => void
  removeItem: (id: string) => void
  updateItem: (id: string, patch: Partial<RecipeItemDraft>) => void
  setSelectedItemId: (id: string | null) => void
  setPreviewVisible: (visible: boolean) => void
  reset: () => void
}

const createEmptyItem = (): RecipeItemDraft => ({
  id: crypto.randomUUID(),
  name: '',
  quantity: 1,
  unit: 'g',
  kind: 'ingredient',
})

export const useRecipeEditorStore = create<RecipeEditorState>((set) => ({
  items: [],
  selectedItemId: null,
  previewVisible: true,
  setItems: (items) => set({ items }),
  addItem: () => set((state) => ({ items: [...state.items, createEmptyItem()] })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
      selectedItemId: state.selectedItemId === id ? null : state.selectedItemId,
    })),
  updateItem: (id, patch) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    })),
  setSelectedItemId: (selectedItemId) => set({ selectedItemId }),
  setPreviewVisible: (previewVisible) => set({ previewVisible }),
  reset: () => set({ items: [], selectedItemId: null, previewVisible: true }),
}))
