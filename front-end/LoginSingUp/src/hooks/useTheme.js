import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

function getSystemTheme() {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}


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
     
    }
  }, [theme])

  return { theme, toggleTheme }
}
