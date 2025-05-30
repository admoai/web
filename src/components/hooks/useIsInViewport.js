import { atom, useAtom, useAtomValue } from 'jotai'
import { useCallback, useEffect, useRef, useState } from 'react'
import useWindowResize from '../hooks/useWindowResize'
import breakpoints from '@/theme/breakpoints'

export const isMobileAtom = atom(true)
export const activeBreakpointAtom = atom({
  key: 'xxs',
  value: breakpoints.xxs
})

export function useInitActiveBreakpointTracker () {
  const sortedBreakpointKeys = useRef(Object.keys(breakpoints).sort((a, b) => breakpoints[a] - breakpoints[b]))
  const [, setActiveBreakpointValue] = useAtom(activeBreakpointAtom)
  const [, setIsMobile] = useAtom(isMobileAtom)

  const onResize = useCallback(() => {
    sortedBreakpointKeys.current.forEach((key, index) => {
      const nextKey = sortedBreakpointKeys[index + 1]

      // Skip setting value if we already know the next value is a better match.
      let skipCurrentBreakpointKey = false
      if (nextKey && window.innerWidth >= breakpoints[nextKey]) {
        skipCurrentBreakpointKey = true
      }

      if (breakpoints[key] <= window.innerWidth && !skipCurrentBreakpointKey) {
        setActiveBreakpointValue({
          key,
          value: breakpoints[key]
        })
      }
    })

    setIsMobile(window.innerWidth < breakpoints.md)
  }, [setActiveBreakpointValue, setIsMobile])

  useWindowResize(onResize)

  useEffect(() => {
    onResize()
  }, [onResize])
}

export function useIsInViewport (upperLimit = breakpoints.md) {
  const activeBreakpoint = useAtomValue(activeBreakpointAtom)
  const [isInViewport, setIsInViewport] = useState(activeBreakpoint.value < upperLimit)

  useEffect(() => {
    setIsInViewport(activeBreakpoint.value < upperLimit)
  }, [activeBreakpoint, upperLimit])

  return isInViewport
}

export function useIsMobileViewport () {
  return useAtomValue(isMobileAtom)
}
