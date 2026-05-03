import { useEffect, useState } from 'react'

export type PublicThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'escandallo-public-theme'

const getSystemMode = (): PublicThemeMode => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getInitialMode = (): PublicThemeMode => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return getSystemMode()
}

export const usePublicThemeMode = () => {
  const [mode, setMode] = useState<PublicThemeMode>(getInitialMode)

  useEffect(() => {
    document.documentElement.style.colorScheme = mode
    window.localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored !== 'light' && stored !== 'dark') {
        setMode(media.matches ? 'dark' : 'light')
      }
    }

    media.addEventListener('change', handleChange)

    return () => {
      media.removeEventListener('change', handleChange)
    }
  }, [])

  const toggleMode = () => {
    setMode((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return {
    mode,
    isDark: mode === 'dark',
    toggleMode,
  }
}
