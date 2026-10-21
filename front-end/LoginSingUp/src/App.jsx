import Header from './components/Header'
import Hero from './components/Hero'
import AuthSection from './components/AuthSection'
import Footer from './components/Footer'
import { useTheme } from './hooks/useTheme'
import './App.css'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <AuthSection />
      </main>
      <Footer />
    </>
  )
}

export default App
