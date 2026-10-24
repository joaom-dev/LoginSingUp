import { useEffect, useRef, useState } from 'react'
import { getToken, logout } from '../services/authApi'
import { InfoIcon } from './Icons'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import DeleteAccount from './DeleteAccount'
import FormStatus from './FormStatus'

const TABS = [
  { id: 'login', label: 'Entrar' },
  { id: 'signup', label: 'Criar conta' },
]

export default function AuthSection() {
  const [activeTab, setActiveTab] = useState('login')
  const [loggedIn, setLoggedIn] = useState(() => Boolean(getToken()))
  const [notice, setNotice] = useState('')
  const [focusSignal, setFocusSignal] = useState(0)
  const tabRefs = useRef({})
  const titleRef = useRef(null)

  useEffect(() => {
    if (focusSignal) titleRef.current?.focus()
  }, [focusSignal])

  function handleLogin() {
    setNotice('')
    setLoggedIn(true)
    setFocusSignal((n) => n + 1)
  }

  function handleLogout() {
    logout()
    setActiveTab('login')
    setLoggedIn(false)
    setNotice('Você saiu da conta.')
    setFocusSignal((n) => n + 1)
  }

  function handleAccountDeleted() {
    setActiveTab('login')
    setLoggedIn(false)
    setNotice('Sua conta foi excluída.')
    setFocusSignal((n) => n + 1)
  }

  function selectTab(id) {
    setActiveTab(id)
    tabRefs.current[id]?.focus()
  }

  function handleTabKeyDown(event) {
    const index = TABS.findIndex((tab) => tab.id === activeTab)
    let nextIndex

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % TABS.length
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + TABS.length) % TABS.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = TABS.length - 1
    else return

    event.preventDefault()
    selectTab(TABS[nextIndex].id)
  }

  return (
    <section className="auth" id="acesso" aria-labelledby="auth-title">
      <div className="container auth__grid">
        <div className="auth__intro">
          <h2 id="auth-title" ref={titleRef} tabIndex={-1} className="auth__title">
            {loggedIn ? 'Você está conectado' : 'Entre ou crie uma conta'}
          </h2>
          <p className="auth__text">
            {loggedIn
              ? 'Aqui ficam as ações da sua conta.'
              : 'Alterne entre login e cadastro sem sair da página. Os campos já validam o que você digita e mostram o que precisa ser corrigido.'}
          </p>
          <FormStatus message={notice} />
          <p className="notice">
            <InfoIcon size={20} />
            <span>
              Os dados que são armazenados no banco de dados e as senhas são criptografados por motivos de melhor segurança e privatização dessas informações.
            </span>
          </p>
        </div>

        <div className="auth-card">
          {loggedIn ? (
            <div className="form">
              <button type="button" className="btn btn--secondary btn--block" onClick={handleLogout}>
                Sair
              </button>
              <DeleteAccount onDeleted={handleAccountDeleted} />
            </div>
          ) : (
            <>
              <div className="tabs" role="tablist" aria-label="Acesso à conta" onKeyDown={handleTabKeyDown}>
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    ref={(element) => {
                      tabRefs.current[tab.id] = element
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${tab.id}`}
                    className="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={activeTab === tab.id ? 0 : -1}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div
                key={activeTab}
                className="auth-panel"
                role="tabpanel"
                id={`panel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
              >
                {activeTab === 'login' ? (
                  <LoginForm onLogin={handleLogin} onSwitchToSignup={() => selectTab('signup')} />
                ) : (
                  <SignupForm onSwitchToLogin={() => selectTab('login')} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}