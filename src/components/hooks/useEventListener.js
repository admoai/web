import { useEffect, useRef } from 'react'
import useIsomorphicLayoutEffect from './../hooks/useIsomorphicLayoutEffect'

function useEventListener(eventName, handler, element) {
  // Create a ref that stores handler
  const savedHandler = useRef(handler)

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    // Define the listening target
    const targetElement = element?.current || window
    if (
      !(
        targetElement &&
        'addEventListener' in targetElement &&
        targetElement.addEventListener
      )
    ) {
      return undefined
    }

    // Create event listener that calls handler function stored in ref
    const eventListener = (event) => savedHandler.current(event)
    targetElement.addEventListener(eventName, eventListener)

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

export default useEventListener
