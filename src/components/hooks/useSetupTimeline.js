import { useRef } from 'react'
import gsap from 'gsap'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

function useSetupTimeline (
  // eslint-disable-next-line no-unused-vars
  setupTimelineMethod,
  refs,
  disable,
  deps = []
) {
  const timeline = useRef(gsap.timeline({ paused: true }))

  useIsomorphicLayoutEffect(() => {
    if (disable) return undefined
    setupTimelineMethod(timeline.current, refs)
    const tl = timeline.current

    return () => {
      tl?.clear()
      tl?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps ?? [])

  return timeline.current
}

export default useSetupTimeline
