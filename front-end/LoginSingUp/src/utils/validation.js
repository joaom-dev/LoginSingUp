// Validações básicas do front-end. A API continuará sendo a fonte final da verdade.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateName(value) {
  const name = value.trim()
  if (!name) return 'Informe seu nome.'
  if (name.length < 2) return 'O nome precisa ter pelo menos 2 letras.'
  return ''
}

export function validateEmail(value) {
  const email = value.trim()
  if (!email) return 'Informe seu e-mail.'
  if (!EMAIL_PATTERN.test(email)) return 'Digite um e-mail válido, como nome@exemplo.com.'
  return ''
}

export function validateLoginPassword(value) {
  return value ? '' : 'Informe sua senha.'
}

export function validateNewPassword(value) {
  if (!value) return 'Crie uma senha.'
  if (value.length < 8) return 'A senha precisa ter pelo menos 8 caracteres.'
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return 'Use letras e números na senha.'
  return ''
}

export function validatePasswordConfirmation(password, confirmation) {
  if (!confirmation) return 'Repita a senha para confirmar.'
  if (password !== confirmation) return 'As senhas não são iguais.'
  return ''
}
