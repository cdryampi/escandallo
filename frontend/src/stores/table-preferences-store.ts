import { create } from 'zustand'

interface TablePreferencesState {
  densityByTable: Record<string, 'comfortable' | 'compact'>
  setDensity: (tableId: string, density: 'comfortable' | 'compact') => void
}

export const useTablePreferencesStore = create<TablePreferencesState>((set) => ({
  densityByTable: {},
  setDensity: (tableId, density) =>
    set((state) => ({
      densityByTable: {
        ...state.densityByTable,
        [tableId]: density,
      },
    })),
}))
