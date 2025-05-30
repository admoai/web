'use client'

import useIsomorphicLayoutEffect from './hooks/useIsomorphicLayoutEffect'
import forEach from 'lodash/forEach'
import remove from 'lodash/remove'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef
} from 'react'

export const ScrollerContext = createContext()

export function useScrollProvider() {
  return useContext(ScrollerContext)
}

export function useScrollPosition(callback, options = {}) {
  const scroller = useScrollProvider()
  const { triggerOnMount } = options
  useEffect(() => {
    scroller.scrollData.current.scrollCallbacks.push(callback)
    return () => {
      remove(scroller.scrollData.current.scrollCallbacks, (c) => c === callback)
    }
  }, [callback, scroller])
  useEffect(() => {
    if (triggerOnMount) {
      callback({
        y: window.scrollY,
        lastY: window.scrollY
      })
    }
  }, [callback, triggerOnMount])
}

export default function ScrollProvider({ children, wrap, ...props }) {
  const containerRef = useRef()
  const scrollDataRef = useRef({
    y: 0,
    lastY: 0,
    scrollCallbacks: []
  })
  const lock = useCallback(() => {
    scrollDataRef.current.element.classList.add('lock-scroll')
    scrollDataRef.current.element.style.paddingRight = 'var(--scrollbarWidth)'
    const header = document.getElementById('header')
    if (header) header.style.paddingRight = 'var(--scrollbarWidth)'
  }, [])
  const unlock = useCallback(() => {
    scrollDataRef.current.element.classList.remove('lock-scroll')
    scrollDataRef.current.element.style.paddingRight = ''
    const header = document.getElementById('header')
    if (header) header.style.paddingRight = ''
  }, [])

  useIsomorphicLayoutEffect(() => {
    let animationFrame
    const loop = () => {
      const { y, lastY, scrollCallbacks, element } = scrollDataRef.current
      if (y !== lastY) {
        forEach(scrollCallbacks, (cb) => {
          cb({ y, lastY, element })
        })
        scrollDataRef.current.lastY = y
      }
      animationFrame = window.requestAnimationFrame(loop)
    }
    loop()

    const container = containerRef.current || window
    scrollDataRef.current.element =
      containerRef.current || document.documentElement
    const onScroll = () => {
      scrollDataRef.current.y = window.scrollY
    }
    container.addEventListener('scroll', onScroll)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      container.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (wrap) {
    return (
      <ScrollerContext.Provider
        {...props}
        value={{
          scrollData: scrollDataRef,
          lock,
          unlock
        }}
      >
        <div className='overflow-y-auto' ref={containerRef}>
          {children}
        </div>
      </ScrollerContext.Provider>
    )
  }
  return (
    <ScrollerContext.Provider
      {...props}
      value={{
        scrollData: scrollDataRef,
        lock,
        unlock
      }}
    >
      {children}
    </ScrollerContext.Provider>
  )
}
