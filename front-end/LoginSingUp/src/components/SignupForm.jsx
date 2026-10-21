import { useRef, useState } from 'react'
import { register } from '../services/authApi'
import { useFormValidation } from '../hooks/useFormValidation'
import {
  validateEmail,
  validateName,
  validateNewPassword,
  validatePasswordConfirmation,
} from '../utils/validation'
import Field from './Field'
import PasswordField from './PasswordField'
import FormStatus from './FormStatus'

const INITIAL_VALUES = { name: '', email: '', password: '', confirmPassword: '' }

const validate = (values) => ({
  name: validateName(values.name),
  email: validateEmail(values.email),
  password: validateNewPassword(values.password),
  confirmPassword: validatePasswordConfirmation(values.password, values.confirmPassword),
})

export default function SignupForm({ onSwitchToLogin }) {
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
      await register(form.values)
      setMessage('Os dados estão válidos, mas ainda não há API conectada. Nenhuma conta foi criada.')
    } catch {
      setMessage('Não foi possível criar a conta agora. Tente novamente em instantes.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form ref={formRef} className="form" onSubmit={handleSubmit} noValidate>
      <Field
        label="Nome"
        name="name"
        autoComplete="name"
        value={form.values.name}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.getError('name')}
      />

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
        autoComplete="new-password"
        hint="Mínimo de 8 caracteres, com letras e números."
        value={form.values.password}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.getError('password')}
      />

      <PasswordField
        label="Confirmar senha"
        name="confirmPassword"
        toggleLabel="Mostrar confirmação de senha"
        autoComplete="new-password"
        value={form.values.confirmPassword}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.getError('confirmPassword')}
      />

      <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
        {loading && <span className="spinner" aria-hidden="true" />}
        {loading ? 'Criando conta…' : 'Criar conta'}
      </button>

      <FormStatus message={message} />

      <p className="form__switch">
        Já tem uma conta?{' '}
        <button type="button" className="link-button" onClick={onSwitchToLogin}>
          Entrar
        </button>
      </p>
    </form>
  )
}
