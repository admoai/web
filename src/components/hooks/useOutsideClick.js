import { useCallback } from 'react'
import useEventListener from './useEventListener'

export default function useOnClickOutside(
  ref,
  handler,
  mouseEvent = 'mousedown',
  ignoreRef
) {
  useEventListener(
    mouseEvent,
    useCallback(
      (event) => {
        const el = ref?.current
        // Do nothing if clicking ref's element or descendent elements
        if (!el || el.contains(event.target)) {
          return
        }
        if (ignoreRef && ignoreRef.current) {
          if (ignoreRef.current.contains(event.target)) {
            return
          }
        }

        handler(event)
      },
      [handler, ref, ignoreRef]
    )
  )
}
