// Camada de comunicação com a API de autenticação (Java + Spring Boot).
//
// IMPORTANTE: nesta etapa NADA é enviado e NADA é guardado. As funções só
// esperam um instante para que o estado de carregamento da interface possa
// ser testado. Quando a API existir, troque o corpo de cada função por uma
// chamada real (fetch) e mantenha o mesmo formato de entrada e saída.

const SIMULATED_DELAY_MS = 700
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Futuro: POST /api/auth/login  com { email, password, remember }
export async function login(/* credentials */) {
  await wait(SIMULATED_DELAY_MS)
  return { simulated: true }
}

// Futuro: POST /api/auth/register  com { name, email, password }
export async function register(/* data */) {
  await wait(SIMULATED_DELAY_MS)
  return { simulated: true }
}
