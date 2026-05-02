import { create } from 'zustand'
import type { Block } from '@/types/cms'

interface CmsEditorState {
  selectedBlockId: string | null
  setSelectedBlockId: (id: string | null) => void
  
  // Local "working" state of blocks before saving to server
  workingBlocks: Block[]
  setWorkingBlocks: (blocks: Block[]) => void
  updateWorkingBlock: (id: string, data: Block['data']) => void
  
  // Navigation internal to the editor
  currentTab: 'content' | 'seo' | 'settings' | 'history'
  setCurrentTab: (tab: 'content' | 'seo' | 'settings' | 'history') => void

  // View mode for the central canvas
  viewMode: 'structure' | 'preview'
  setViewMode: (mode: 'structure' | 'preview') => void

  // Device emulation
  deviceMode: 'mobile' | 'tablet' | 'desktop'
  setDeviceMode: (mode: 'mobile' | 'tablet' | 'desktop') => void
}

export const useCmsEditorStore = create<CmsEditorState>((set) => ({
  selectedBlockId: null,
  setSelectedBlockId: (id) => set({ selectedBlockId: id }),

  workingBlocks: [],
  setWorkingBlocks: (blocks) => set({ workingBlocks: blocks }),
  updateWorkingBlock: (id, data) => set((state) => ({
    workingBlocks: state.workingBlocks.map(b => b.id === id ? ({ ...b, data } as Block) : b)
  })),

  currentTab: 'content',
  setCurrentTab: (tab) => set({ currentTab: tab }),

  viewMode: 'structure',
  setViewMode: (mode) => set({ viewMode: mode }),

  deviceMode: 'desktop',
  setDeviceMode: (mode) => set({ deviceMode: mode }),
}))
