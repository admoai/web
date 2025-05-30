'use client'

import useUpdateEffect from '@/hooks/useUpdateEffect'
import gsap from 'gsap'
import { useCallback, useEffect, useRef } from 'react'

export default function PlusMinusIcon({
  isHovering = false,
  isMinus,
  ...props
}) {
  const ref = useRef()
  const localsRef = useRef({})

  useUpdateEffect(() => {
    gsap.to(ref.current.children[0], {
      rotate: !isMinus ? '0deg' : '270deg',
      transformOrigin: '50% 50%',
      ease: 'power3.inOut',
      duration: 0.6
    })
    gsap.to(ref.current.children[1], {
      rotate: !isMinus ? '0deg' : '180deg',
      transformOrigin: '50% 50%',
      ease: 'power3.inOut',
      duration: 0.6
    })
  }, [isMinus])

  const onMouseEnter = useCallback(() => {
    if (isMinus) return
    if (localsRef.current.timeline) localsRef.current.timeline.kill()

    const tl = gsap.timeline()
    tl.fromTo(
      ref.current,
      { rotate: 0 },
      {
        rotate: 90,
        duration: 0.3,
        ease: 'power2.out'
      }
    )
    tl.set(ref.current, { rotate: 0 })
    localsRef.current.timeline = tl
  }, [isMinus])

  useEffect(() => {
    if (!isHovering) return
    onMouseEnter()
  }, [isHovering, onMouseEnter])

  return (
    <svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
      ref={ref}
    >
      <path
        d='M6.75 0.75L6.75 11.25L5.25 11.25L5.25 0.75L6.75 0.75Z'
        fill='currentColor'
      />
      <path d='M11.25 6.75H0.75V5.25L11.25 5.25V6.75Z' fill='currentColor' />
    </svg>
  )
}
