import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

function getSystemTheme() {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

// O localStorage guarda SOMENTE a preferência visual de tema.
function readStoredTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

export function useTheme() {
  const [storedTheme, setStoredTheme] = useState(readStoredTheme)
  const [systemTheme, setSystemTheme] = useState(getSystemTheme)

  // Enquanto a pessoa não escolher, o tema acompanha o sistema operacional.
  const theme = storedTheme ?? systemTheme

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY)
    const handleChange = (event) => setSystemTheme(event.matches ? 'dark' : 'light')
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setStoredTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* sem acesso ao localStorage: a escolha vale só nesta sessão */
    }
  }, [theme])

  return { theme, toggleTheme }
}
