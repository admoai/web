'use client'

import useComposeRefs from '../hooks/useComposeRefs'
import useEscKey from '../hooks/useEscapeKey'
import useOutsideClick from '../hooks/useOutsideClick'
import cn from 'clsx'
import FocusTrap from 'focus-trap-react'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/dist/CustomEase'
import { useCallback, useEffect, useRef } from 'react'
import { useScrollProvider } from '../ScrollProvider'

gsap.registerPlugin(CustomEase)

const customEase = CustomEase.create('custom', 'M0,0 C0.25,0.25 0,1 1,1')

const focusTrapOptions = {
  checkCanFocusTrap: (trapContainers) => {
    const results = trapContainers.map((trapContainer) => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (getComputedStyle(trapContainer).visibility !== 'hidden') {
            resolve()
            clearInterval(interval)
          }
        }, 5)
      })
    })
    return Promise.all(results)
  }
}

function fadeIn(els, yStart) {
  return gsap.fromTo(
    els,
    {
      y: yStart,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      ease: 'expo.out',
      stagger: 0.02,
      overwrite: true,
      duration: 0.6
    }
  )
}

export const createToggleVisibilityFns = (el, condition) => ({
  onStart: () => {
    if (condition) gsap.set(el, { visibility: 'visible' })
  },
  onComplete: () => {
    if (!condition) gsap.set(el, { visibility: 'hidden' })
  },
  onInterrupt: () => {
    gsap.set(el, { visibility: condition ? 'visible' : 'hidden' })
  }
})

export default function Modal({ isOpen, setOpen, className, children }) {
  const ref = useRef()

  const { lock, unlock } = useScrollProvider()

  const close = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const outsideClickRef = useOutsideClick(close, isOpen)
  const combinedRefs = useComposeRefs(ref, outsideClickRef)

  useEscKey(close, isOpen)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.to(
      ref.current,
      {
        opacity: isOpen ? 1 : 0,
        duration: 0.6,
        ease: customEase,
        ...createToggleVisibilityFns(ref.current, isOpen)
      },
      0
    )

    return () => {
      tl.kill()
      unlock()
    }
  }, [isOpen, lock, unlock])

  return (
    <>
      <FocusTrap active={isOpen} focusTrapOptions={focusTrapOptions}>
        <div
          className={cn(
            className,
            'fixed left-0 bottom-0 top-0 w-full z-modal invisible'
          )}
          ref={combinedRefs}
        >
          {children}
        </div>
      </FocusTrap>
    </>
  )
}
