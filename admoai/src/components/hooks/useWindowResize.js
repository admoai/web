import { debounce } from 'lodash'
import { useMemo } from 'react'
import useEventListener from './useEventListener'

function useWindowResize (callback, wait = 100) {
  useEventListener('resize', useMemo(() => debounce(callback, wait), [callback, wait]))
  useEventListener('orientationchange', useMemo(() => debounce(callback, wait), [callback, wait]))
}

export default useWindowResize
