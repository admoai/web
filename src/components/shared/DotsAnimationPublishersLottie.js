'use client'
import { useSettings } from '@/components/SettingsContext'
import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import cn from 'clsx'

const DotsAnimationPublishersLottie = () => {
  const settings = useSettings()
  const { dotsAnimationPublishers } = settings ?? {}
  const lottieRef = useRef(null)
  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: dotsAnimationPublishers?.file?.url
    })

    return () => {
      anim.destroy()
    }
  }, [dotsAnimationPublishers])

  return (
    <div ref={lottieRef} className={cn('absolute inset-0 w-full h-full')} />
  )
}
DotsAnimationPublishersLottie.displayName = 'DotsAnimationPublishersLottie'
export default DotsAnimationPublishersLottie
