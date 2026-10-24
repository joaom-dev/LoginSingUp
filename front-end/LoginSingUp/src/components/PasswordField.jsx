import { useState } from 'react'
import Field from './Field'
import { EyeIcon, EyeOffIcon } from './Icons'

// Campo de senha com botão para mostrar/ocultar o texto digitado.
export default function PasswordField({ toggleLabel = 'Mostrar senha', ...fieldProps }) {
  const [visible, setVisible] = useState(false)

  return (
    <Field {...fieldProps} type={visible ? 'text' : 'password'}>
      <button
        type="button"
        className="field__toggle"
        onClick={() => setVisible((current) => !current)}
        aria-label={toggleLabel}
        aria-pressed={visible}
        title={toggleLabel}
      >
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </Field>
  )
}
