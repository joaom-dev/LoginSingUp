import { CodeIcon } from './Icons'
import ThemeToggle from './ThemeToggle'

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href="#apresentacao">
          <span className="brand__mark">
            <CodeIcon size={18} />
          </span>
          Juao
        </a>

        <div className="site-header__actions">
          <nav className="site-nav" aria-label="Seções da página">
            <a href="#apresentacao">Apresentação</a>
            <a href="#acesso">Entrar</a>
          </nav>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  )
}
