import { useEffect } from 'react'

export function useMobileAnimations() {
  useEffect(() => {
    document.documentElement.style.webkitOverflowScrolling = 'touch'
    document.documentElement.style.overscrollBehavior = 'none'
  }, [])
}
