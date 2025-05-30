import useWindowResize from '@/hooks/useWindowResize'
import { useCallback, useState } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

function useWindowSize (wait = 100) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  const handleSize = useCallback(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  }, [])

  useWindowResize(handleSize, wait)

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(handleSize, [handleSize])

  return windowSize
}

export default useWindowSize
