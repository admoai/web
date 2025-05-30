import { useCallback, useEffect } from 'react'

export default function useEscapeKey (fn, enabled) {
  const handleKey = useCallback((event) => {
    if (event.key === 'Escape') {
      fn()
    }
  }, [fn])

  useEffect(() => {
    if (!enabled) return
    document.addEventListener('keydown', handleKey, false)
    return () => document.removeEventListener('keydown', handleKey, false)
  }, [handleKey, enabled])
}
