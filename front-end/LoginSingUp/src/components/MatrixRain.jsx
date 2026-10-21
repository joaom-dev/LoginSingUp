import { useEffect, useRef } from 'react'

/**
 * Chuva de números estilo "Matrix", desenhada em <canvas>.
 * Ocupa a janela inteira (canvas fixo) e fica atrás de todo o conteúdo da página.
 *
 * Props (todas opcionais):
 * - fontSize: tamanho de cada caractere, em px
 * - characters: caracteres sorteados na chuva
 * - fadeOpacity: quanto o rastro some a cada quadro (maior = rastro mais curto)
 * - speed: multiplicador de velocidade
 * - color: cor dos números; se omitida, usa a variável CSS --rain-color (muda com o tema)
 */
export default function MatrixRain({ fontSize = 18, characters = '01', fadeOpacity = 0.08, speed = 1, color }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Quem prefere menos movimento não vê a animação.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const chars = characters.split('')
    const frameInterval = 33 / speed
    let drops = []
    let width = 0
    let height = 0
    let rainColor = '#2563eb'
    let frameId = 0
    let lastFrame = 0

    const readColor = () => {
      rainColor =
        color ?? (getComputedStyle(document.documentElement).getPropertyValue('--rain-color').trim() || rainColor)
    }

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      // Só recria as colunas se a largura mudou (evita reiniciar a chuva ao rolar no celular).
      const columns = Math.floor(width / fontSize)
      if (columns !== drops.length) {
        drops = Array.from({ length: columns }, () => Math.random() * -100)
      }
    }

    const draw = () => {
      // Apaga um pouco do quadro anterior, sem pintar fundo: o canvas continua transparente nos dois temas.
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'source-over'

      ctx.fillStyle = rainColor
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += 1
      }
    }

    const loop = (time) => {
      frameId = requestAnimationFrame(loop)
      if (time - lastFrame < frameInterval) return
      lastFrame = time
      draw()
    }

    readColor()
    resize()
    frameId = requestAnimationFrame(loop)

    window.addEventListener('resize', resize)

    // Atualiza a cor quando o tema muda.
    const themeObserver = new MutationObserver(readColor)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      themeObserver.disconnect()
    }
  }, [fontSize, characters, fadeOpacity, speed, color])

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />
}