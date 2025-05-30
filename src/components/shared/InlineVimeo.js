'use client'

import useComposeRefs from './../hooks/useComposeRefs'
import useHlsPlayer from './../hooks/useHlsPlayer'
import useOutsideClick from './../hooks/useOutsideClick'
import { CustomEase } from 'gsap/dist/CustomEase'
import cn from 'clsx'
import { forwardRef, useCallback, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { AnimatePresence } from 'framer-motion'
import { FadeMotionDiv } from './FadeMotionDiv'
import ResponsiveImage from '../ResponsiveImage'

export const MenuEase = CustomEase.create('custom', 'M0,0 C0.25,0.25 0,1 1,1')
export const MenuOutEase = CustomEase.create(
  'custom',
  'M0,0 C0.45,0.25 0,1 1,1'
)

const InlineVimeo = forwardRef(
  (
    {
      data,
      className,
      aspect,
      contain = false,
      originalDimensions = false,
      imgClassName
    },
    ref
  ) => {
    const url = data?.vimeoData?.hlsPlayerLink
    const overrideThumb = data?.thumbnail
    const vimeoThumb = data?.vimeoData?.vimeoThumbnail.link
    const isOverrideThumb = !!overrideThumb?.asset
    const [hidePoster, setHidePoster] = useState(false)
    const [ready, setReady] = useState(false)

    const hslRef = useRef()
    useHlsPlayer(
      hslRef,
      url,
      useCallback(() => {
        setReady(true)
      }, [])
    )

    const videoRef = useRef()
    const { ref: inViewRef } = useInView({
      threshold: 0,
      skip: false,
      onChange: async (inView) => {
        if (videoRef.current) {
          if (inView) {
            setHidePoster(true)
            videoRef.current.play()
          } else if (!inView) {
            videoRef.current.pause()
          }
        }
      }
    })
    const combinedRefs = useComposeRefs(inViewRef, hslRef, videoRef)

    return (
      <div className={cn(className, 'relative', aspect, 'h-0')}>
        {isOverrideThumb && (
          <ResponsiveImage
            className={cn(
              '!absolute inset-0 transition-opacity duration-1000 z-0',
              hidePoster && ready ? 'opacity-0' : 'opacity-100'
            )}
            image={overrideThumb}
            aspect={16 / 9}
          />
        )}
        <video
          className={cn(
            imgClassName,
            'object-center transition-all duration easing aspect-video',
            hidePoster && ready ? 'opacity-100' : 'opacity-0',
            contain ? 'object-contain' : 'object-cover',
            'w-full h-full max-h-full inset-0 !absolute'
          )}
          autoPlay={true}
          ref={combinedRefs}
          muted={true}
          controls={false}
          loop={true}
          playsInline={true}
        />
      </div>
    )
  }
)
InlineVimeo.displayName = 'InlineVimeo'
export default InlineVimeo
