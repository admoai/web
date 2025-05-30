import { useEffect } from 'react'
import useIsFirstRender from './useIsFirstRender'

function useUpdateEffect (effect, deps, disposable) {
  const isFirst = useIsFirstRender()

  useEffect(() => {
    if (!isFirst) {
      return effect()
    }
    return () => disposable && disposable()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useUpdateEffect
