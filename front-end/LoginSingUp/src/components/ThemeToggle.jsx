import { MoonIcon, SunIcon } from './Icons'

// Mostra o ícone do tema para o qual a pessoa vai mudar ao clicar.
export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  const label = isDark ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'

  return (
    <button type="button" className="theme-toggle" onClick={onToggle} aria-label={label} title={label}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
