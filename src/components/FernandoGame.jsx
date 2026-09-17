import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiX, HiRefresh } from 'react-icons/hi'

// Kept outside the component so the highscore survives re-opening the game
// during the same browser tab session (resets on full page reload).
let sessionHighScore = 0

const GRAVITY = 1400 // px/s^2
const JUMP_VELOCITY = -480 // px/s
const OBSTACLE_SPEED = 260 // px/s
const OBSTACLE_GAP = 190
const OBSTACLE_WIDTH = 64
const OBSTACLE_INTERVAL = 1450 // ms
const PLAYER_RADIUS = 28
const PLAYER_X_RATIO = 0.28

const COLORS = {
  skyTop: '#3faee0',
  skyBottom: '#EEF0F9',
  obstacle: '#283583',
  obstacleLight: '#3a4a9e',
  ground: '#1e2666',
  accent: '#E6007E',
}

export default function FernandoGame({ onClose }) {
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)
  const imageRef = useRef(null)
  const [imageReady, setImageReady] = useState(false)
  const [status, setStatus] = useState('ready') // ready | playing | gameover
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(sessionHighScore)

  const gameRef = useRef({
    playerY: 0,
    velocity: 0,
    obstacles: [],
    lastObstacleAt: 0,
    lastFrameAt: 0,
    score: 0,
    rafId: null,
    width: 0,
    height: 0,
    groundY: 0,
    rotation: 0,
  })
  const statusRef = useRef('ready')

  useEffect(() => {
    statusRef.current = status
  }, [status])

  // Load Fernando's photo once for drawing on the canvas
  useEffect(() => {
    const img = new Image()
    img.src = '/fernando.jpeg'
    img.onload = () => {
      imageRef.current = img
      setImageReady(true)
    }
    img.onerror = () => setImageReady(false)
  }, [])

  // Lock page scrolling while the game overlay is open
  useEffect(() => {
    const { style } = document.body
    const prevOverflow = style.overflow
    const prevTouchAction = style.touchAction
    style.overflow = 'hidden'
    style.touchAction = 'none'
    return () => {
      style.overflow = prevOverflow
      style.touchAction = prevTouchAction
    }
  }, [])

  const resetGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const g = gameRef.current
    g.playerY = g.height / 2
    g.velocity = 0
    g.obstacles = []
    g.lastObstacleAt = 0
    g.lastFrameAt = 0
    g.score = 0
    g.rotation = 0
    setScore(0)
  }, [])

  const jump = useCallback(() => {
    const g = gameRef.current
    if (statusRef.current === 'gameover') return
    if (statusRef.current === 'ready') {
      resetGame()
      statusRef.current = 'playing'
      setStatus('playing')
    }
    g.velocity = JUMP_VELOCITY
  }, [resetGame])

  const endGame = useCallback(() => {
    const g = gameRef.current
    statusRef.current = 'gameover'
    setStatus('gameover')
    if (g.score > sessionHighScore) {
      sessionHighScore = g.score
      setHighScore(g.score)
    }
  }, [])

  const playAgain = useCallback(() => {
    resetGame()
    statusRef.current = 'playing'
    setStatus('playing')
  }, [resetGame])

  // Canvas sizing to fill the overlay responsively
  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = wrapper.getBoundingClientRect()
      const g = gameRef.current
      g.width = rect.width
      g.height = rect.height
      g.groundY = rect.height - 24
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      const ctx = canvas.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (statusRef.current === 'ready') {
        g.playerY = rect.height / 2
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Main render/physics loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const g = gameRef.current

    const spawnObstacle = () => {
      const margin = 60
      const gapCenter = margin + Math.random() * (g.height - margin * 2 - OBSTACLE_GAP) + OBSTACLE_GAP / 2
      g.obstacles.push({
        x: g.width + OBSTACLE_WIDTH,
        gapCenter,
        passed: false,
      })
    }

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, g.height)
      gradient.addColorStop(0, COLORS.skyTop)
      gradient.addColorStop(1, COLORS.skyBottom)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, g.width, g.height)

      ctx.fillStyle = COLORS.ground
      ctx.fillRect(0, g.groundY, g.width, g.height - g.groundY)
    }

    const drawObstacle = (obstacle) => {
      const topHeight = obstacle.gapCenter - OBSTACLE_GAP / 2
      const bottomY = obstacle.gapCenter + OBSTACLE_GAP / 2
      ctx.fillStyle = COLORS.obstacle
      roundRectPath(ctx, obstacle.x, 0, OBSTACLE_WIDTH, topHeight, 14)
      ctx.fill()
      roundRectPath(ctx, obstacle.x, bottomY, OBSTACLE_WIDTH, g.groundY - bottomY, 14)
      ctx.fill()

      ctx.fillStyle = COLORS.obstacleLight
      ctx.font = 'bold 20px Poppins, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('J', obstacle.x + OBSTACLE_WIDTH / 2, topHeight - 12 < 16 ? 16 : Math.min(topHeight - 12, topHeight))
    }

    const drawPlayer = () => {
      const x = g.width * PLAYER_X_RATIO
      const y = g.playerY
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(g.rotation)
      ctx.beginPath()
      ctx.arc(0, 0, PLAYER_RADIUS, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fillStyle = COLORS.accent
      ctx.fill()
      ctx.save()
      ctx.clip()
      if (imageRef.current) {
        ctx.drawImage(
          imageRef.current,
          -PLAYER_RADIUS,
          -PLAYER_RADIUS,
          PLAYER_RADIUS * 2,
          PLAYER_RADIUS * 2
        )
      }
      ctx.restore()
      ctx.lineWidth = 3
      ctx.strokeStyle = '#ffffff'
      ctx.stroke()
      ctx.restore()
    }

    const circleRectCollision = (cx, cy, r, rx, ry, rw, rh) => {
      const closestX = Math.max(rx, Math.min(cx, rx + rw))
      const closestY = Math.max(ry, Math.min(cy, ry + rh))
      const dx = cx - closestX
      const dy = cy - closestY
      return dx * dx + dy * dy < r * r
    }

    const step = (timestamp) => {
      if (!g.lastFrameAt) g.lastFrameAt = timestamp
      const dt = Math.min((timestamp - g.lastFrameAt) / 1000, 1 / 30)
      g.lastFrameAt = timestamp

      if (statusRef.current === 'playing') {
        g.velocity += GRAVITY * dt
        g.playerY += g.velocity * dt
        g.rotation = Math.max(-0.5, Math.min(1.1, g.velocity / 600))

        if (!g.lastObstacleAt) g.lastObstacleAt = timestamp
        if (timestamp - g.lastObstacleAt > OBSTACLE_INTERVAL) {
          spawnObstacle()
          g.lastObstacleAt = timestamp
        }

        const playerX = g.width * PLAYER_X_RATIO
        let collided = g.playerY + PLAYER_RADIUS >= g.groundY || g.playerY - PLAYER_RADIUS <= 0

        g.obstacles.forEach((obstacle) => {
          obstacle.x -= OBSTACLE_SPEED * dt

          if (!obstacle.passed && obstacle.x + OBSTACLE_WIDTH < playerX) {
            obstacle.passed = true
            g.score += 1
            setScore(g.score)
          }

          const topHeight = obstacle.gapCenter - OBSTACLE_GAP / 2
          const bottomY = obstacle.gapCenter + OBSTACLE_GAP / 2
          if (
            circleRectCollision(playerX, g.playerY, PLAYER_RADIUS - 4, obstacle.x, 0, OBSTACLE_WIDTH, topHeight) ||
            circleRectCollision(playerX, g.playerY, PLAYER_RADIUS - 4, obstacle.x, bottomY, OBSTACLE_WIDTH, g.groundY - bottomY)
          ) {
            collided = true
          }
        })

        g.obstacles = g.obstacles.filter((o) => o.x + OBSTACLE_WIDTH > -10)

        if (collided) {
          endGame()
        }
      }

      drawBackground()
      g.obstacles.forEach(drawObstacle)
      drawPlayer()

      g.rafId = requestAnimationFrame(step)
    }

    g.rafId = requestAnimationFrame(step)
    return () => {
      if (g.rafId) cancelAnimationFrame(g.rafId)
    }
  }, [endGame])

  // Keyboard controls: Space to jump, Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (statusRef.current === 'gameover') {
          playAgain()
        } else {
          jump()
        }
      } else if (e.code === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [jump, onClose, playAgain])

  // Prevent touch-scroll while interacting with the canvas
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const preventTouch = (e) => e.preventDefault()
    wrapper.addEventListener('touchmove', preventTouch, { passive: false })
    return () => wrapper.removeEventListener('touchmove', preventTouch)
  }, [])

  const handlePointerDown = (e) => {
    e.preventDefault()
    if (statusRef.current === 'gameover') return
    jump()
  }

  return createPortal(
    <div className="fixed inset-0 z-[999] bg-primary/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        onClick={onClose}
        aria-label="Spiel schliessen"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
      >
        <HiX size={22} />
      </button>

      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 text-white font-heading">
        <p className="text-xs uppercase tracking-widest text-white/60">Fernandos Kreis</p>
        <p className="text-2xl font-black leading-tight">{score}</p>
        <p className="text-xs text-white/60">Highscore: {highScore}</p>
      </div>

      <div
        ref={wrapperRef}
        onPointerDown={handlePointerDown}
        className="relative w-full h-full max-w-2xl max-h-[720px] rounded-3xl overflow-hidden shadow-jubla-lg cursor-pointer select-none touch-none"
      >
        <canvas ref={canvasRef} className="block w-full h-full" />

        {status === 'ready' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/25 text-center px-6 pointer-events-none">
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white drop-shadow">
              Fernandos Kreis
            </h3>
            <p className="font-body text-white/90 text-sm sm:text-base max-w-xs">
              Tippen, klicken oder Leertaste drücken zum Fliegen. Weich den Hindernissen aus!
            </p>
            {!imageReady && (
              <p className="font-body text-white/60 text-xs">Lade Fernando…</p>
            )}
          </div>
        )}

        {status === 'gameover' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/45 text-center px-6">
            <h3 className="font-heading font-black text-3xl text-white drop-shadow">Game Over!</h3>
            <p className="font-body text-white/90">
              Punkte: <span className="font-bold">{score}</span> · Highscore:{' '}
              <span className="font-bold">{highScore}</span>
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                playAgain()
              }}
              className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-heading font-semibold px-6 py-3 rounded-2xl transition-colors duration-300 shadow-accent"
            >
              <HiRefresh size={18} />
              Nochmal spielen
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

function roundRectPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, Math.max(height, 0) / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + width, y, x + width, y + height, r)
  ctx.arcTo(x + width, y + height, x, y + height, r)
  ctx.arcTo(x, y + height, x, y, r)
  ctx.arcTo(x, y, x + width, y, r)
  ctx.closePath()
}
