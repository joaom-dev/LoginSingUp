const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'
const TOKEN_KEY = 'token'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function request(path, { method = 'POST', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  try {
    return await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('Não foi possível conectar ao servidor. Verifique se o back-end está rodando.', 0)
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY)
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
}

export async function register({ name, email, password }) {
  const res = await request('/juao/auth/sing-up', {
    body: { name, email, password },
  })

  if (res.status === 400 || res.status === 409) {
    throw new ApiError('Não foi possível criar a conta. Verifique os dados ou se o e-mail já está em uso.', res.status)
  }
  if (!res.ok) {
    throw new ApiError('Não foi possível criar a conta agora. Tente novamente em instantes.', res.status)
  }
}

export async function login({ email, password, remember }) {
  const res = await request('/juao/auth/login', {
    body: { email, password },
  })

  if (res.status === 401) {
    throw new ApiError('E-mail ou senha inválidos.', 401)
  }
  if (!res.ok) {
    throw new ApiError('Não foi possível entrar agora. Tente novamente em instantes.', res.status)
  }

  

  const { token } = await res.json()

  logout()
  const storage = remember ? localStorage : sessionStorage
  storage.setItem(TOKEN_KEY, token)
}

export async function getUsers() {
  const res = await request('/juao/users', { method: 'GET', auth: true })

  if (res.status === 401 || res.status === 403) {
    throw new ApiError('Você não tem permissão para ver essa lista.', res.status)
  }
  if (!res.ok) {
    throw new ApiError('Não foi possível carregar os usuários.', res.status)
  }
  return res.json()
}

export async function deleteAccount() {
    const res = await request('/juao/auth/delete', { method: 'DELETE', auth: true })
    if (!res.ok) throw new ApiError('Não foi possível excluir a conta.', res.status)
    logout()
}