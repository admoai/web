import { useCallback } from 'react'

export default function useComposeRefs (...refs) {
  return useCallback(el => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(el)
      } else if (ref) {
        ref.current = el
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs)
}
