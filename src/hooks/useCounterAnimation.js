import { useState, useEffect, useRef } from 'react'

export function useCounterAnimation(target, duration = 2000, startOnMount = false) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(startOnMount)
  const frameRef = useRef(null)

  const start = () => setHasStarted(true)

  useEffect(() => {
    if (!hasStarted) return

    const startTime = performance.now()
    const startValue = 0

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Easing: ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(startValue + (target - startValue) * eased)
      setCount(current)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [hasStarted, target, duration])

  return { count, start }
}
