import { useState } from 'react'

/**
 * Controla valores, campos "tocados" e erros de um formulário.
 * `validate(values)` deve devolver um objeto { campo: 'mensagem' | '' }
 * com todas as chaves dos campos validados.
 */
export function useFormValidation(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})

  const errors = validate(values)
  const firstInvalidField = Object.keys(errors).find((name) => errors[name])

  function handleChange(event) {
    const { name, type, value, checked } = event.target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleBlur(event) {
    const { name } = event.target
    setTouched((current) => ({ ...current, [name]: true }))
  }

  // O erro só aparece depois que a pessoa sai do campo ou tenta enviar.
  function getError(name) {
    return touched[name] ? errors[name] : ''
  }

  function touchAll() {
    setTouched(Object.fromEntries(Object.keys(initialValues).map((name) => [name, true])))
  }

  return { values, firstInvalidField, handleChange, handleBlur, getError, touchAll }
}
