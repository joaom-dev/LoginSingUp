import { useRef, useState } from 'react'
import { login } from '../services/authApi'
import { useFormValidation } from '../hooks/useFormValidation'
import { validateEmail, validateLoginPassword } from '../utils/validation'
import Field from './Field'
import PasswordField from './PasswordField'
import FormStatus from './FormStatus'

const INITIAL_VALUES = { email: '', password: '', remember: false }

const validate = (values) => ({
  email: validateEmail(values.email),
  password: validateLoginPassword(values.password),
})

export default function LoginForm({ onSwitchToSignup }) {
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const form = useFormValidation(INITIAL_VALUES, validate)

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    form.touchAll()

    if (form.firstInvalidField) {
      formRef.current.elements[form.firstInvalidField]?.focus()
      return
    }

    setLoading(true)
    try {
      await login(form.values)
      setMessage('Login realizado com sucesso!')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form ref={formRef} className="form" onSubmit={handleSubmit} noValidate>
      <Field
        label="E-mail"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="nome@exemplo.com"
        value={form.values.email}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.getError('email')}
      />

      <PasswordField
        label="Senha"
        name="password"
        autoComplete="current-password"
        value={form.values.password}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.getError('password')}
      />

      <div className="form__row">
        {/* Futuro: define se a sessão persiste (ex.: tempo de vida do refresh token). */}
        <label className="check">
          <input type="checkbox" name="remember" checked={form.values.remember} onChange={form.handleChange} />
          Manter conectado
        </label>
        <button
          type="button"
          className="link-button"
          onClick={() => setMessage('A recuperação de senha será ligada à API numa próxima etapa.')}
        >
          Esqueci a senha
        </button>
      </div>

      <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
        {loading && <span className="spinner" aria-hidden="true" />}
        {loading ? 'Entrando…' : 'Entrar'}
      </button>

      <FormStatus message={message} />

      <p className="form__switch">
        Ainda não tem conta?{' '}
        <button type="button" className="link-button" onClick={onSwitchToSignup}>
          Criar conta
        </button>
      </p>
    </form>
  )
}