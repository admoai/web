import { useEffect, useState } from 'react'

// sets to true immediately but sets to false after a delay
export default function useDelayedState (value, delay = 0, forwards = true) {
  const [state, setState] = useState(value)

  useEffect(() => {
    if (value === forwards) {
      setState(value)
    } else {
      const timeout = setTimeout(() => {
        setState(value)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [value, delay, forwards])

  return state
}
