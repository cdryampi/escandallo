import { create } from 'zustand'

interface AuthUiState {
  redirectAfterLogin: string | null
  setRedirectAfterLogin: (path: string | null) => void
}

export const useAuthUiStore = create<AuthUiState>((set) => ({
  redirectAfterLogin: null,
  setRedirectAfterLogin: (path) => set({ redirectAfterLogin: path }),
}))
