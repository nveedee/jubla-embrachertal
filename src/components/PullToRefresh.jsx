import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function PullToRefresh() {
  const [isPulling, setIsPulling] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startY = useRef(0)
  const pullDistance = useMotionValue(0)
  const threshold = 80

  const opacity = useTransform(pullDistance, [0, threshold], [0, 1])
  const scale = useTransform(pullDistance, [0, threshold], [0.5, 1])
  const indicatorY = useTransform(pullDistance, [0, threshold], [-40, 20])

  useEffect(() => {
    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY
        setIsPulling(true)
      }
    }

    const handleTouchMove = (e) => {
      if (!isPulling) return
      const currentY = e.touches[0].clientY
      const diff = Math.max(0, currentY - startY.current)
      if (diff > 0 && window.scrollY === 0) {
        pullDistance.set(Math.min(diff * 0.5, threshold + 20))
      }
    }

    const handleTouchEnd = () => {
      if (pullDistance.get() >= threshold) {
        setIsRefreshing(true)
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        pullDistance.set(0)
      }
      setIsPulling(false)
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isPulling])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-center pointer-events-none"
      style={{ y: indicatorY }}
    >
      <motion.div
        style={{ opacity, scale }}
        className="bg-[#283583] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
      >
        {isRefreshing ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
          />
        ) : (
          <span className="text-lg">↓</span>
        )}
      </motion.div>
    </motion.div>
  )
}
