'use client'

import XButton from './Buttons'
import useComposeRefs from './../hooks/useComposeRefs'
import useEscKey from './../hooks/useEscapeKey'
import useHlsPlayer from './../hooks/useHlsPlayer'
import useOutsideClick from './../hooks/useOutsideClick'
import useUpdateEffect from './../hooks/useUpdateEffect'
import { CustomEase } from 'gsap/dist/CustomEase'
import cn from 'clsx'
import gsap from 'gsap'
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react'
import { useInView } from 'react-intersection-observer'
import ResponsiveImage from '../ResponsiveImage'
import Caption from './Caption'
import Section from './Section'
import PlayIcon from '../Graphics/Icons/PlayIcon'
import zIndex from './../../theme/zIndex'

export const MenuEase = CustomEase.create('custom', 'M0,0 C0.25,0.25 0,1 1,1')
export const MenuOutEase = CustomEase.create(
  'custom',
  'M0,0 C0.45,0.25 0,1 1,1'
)

const VimeoVideo = forwardRef(
  (
    {
      data,
      autoplay = true,
      contain = false,
      loop = true,
      playsInline = true,
      className,
      openAsModal = true,
      showPlayButton = true
    },
    ref
  ) => {
    const localRef = useRef()
    const wrapperRef = useRef()
    const closeButtonRef = useRef()
    // const elementRef = ref || localRef
    const [isMuted, setIsMuted] = useState(true)
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

    const [videoClicked, setVideoClicked] = useState(false)
    const videoRef = useRef()

    const onPlayClick = useCallback(() => {
      videoRef.current.currentTime = 0
      setIsMuted(false)
      setVideoClicked(true)
      setHidePoster(true)
      videoRef.current.play()
    }, [videoRef, setVideoClicked, setHidePoster])

    const { ref: inViewRef } = useInView({
      threshold: 0,
      skip: false,
      onChange: async (inView) => {
        if (videoRef.current) {
          if (inView && autoplay && !videoClicked) {
            setHidePoster(true)
            var isPlaying =
              videoRef.current.currentTime > 0 &&
              !videoRef.current.paused &&
              !videoRef.current.ended &&
              videoRef.current.readyState > videoRef.current.HAVE_CURRENT_DATA
            if (isPlaying) {
              videoRef.current.play()
            }
          } else if (!inView) {
            videoRef.current.pause()
          }
        }
      }
    })

    const closeModal = useCallback(() => {
      // if (!autoplay) {
      videoRef.current.pause()
      // }
      setIsMuted(true)
      setVideoClicked(false)
    }, [])

    const isModalOpen = useMemo(() => {
      return videoClicked && openAsModal
    }, [openAsModal, videoClicked])

    const containerRef = useRef()
    const maskRef = useRef()
    const outsideClickRef = useOutsideClick(closeModal, videoClicked)
    const combinedRefs = useComposeRefs(
      inViewRef,
      hslRef,
      videoRef,
      outsideClickRef
    )
    useEscKey(closeModal, isModalOpen)

    useImperativeHandle(
      ref,
      () => ({
        onPlayClick,
        localRef
      }),
      [onPlayClick]
    )

    useUpdateEffect(() => {
      if (isModalOpen) {
        const bounds = wrapperRef.current?.getBoundingClientRect()
        gsap.fromTo(
          [maskRef.current, closeButtonRef.current],
          {
            autoAlpha: 0
          },
          {
            autoAlpha: 1,
            duration: 1,
            pointerEvents: 'all'
          }
        )

        gsap.fromTo(
          containerRef.current,
          {
            position: 'fixed',
            x: bounds.x,
            y: bounds.y,
            width: bounds.width,
            height: bounds.height
          },
          {
            duration: 0.6,
            ease: MenuEase,
            position: 'fixed',
            x: 0,
            y: 0,
            width: '100%',
            height: '100%',
            zIndex: zIndex.videoModal
          }
        )
      } else {
        const bounds = wrapperRef.current?.getBoundingClientRect()
        gsap.to(containerRef.current, {
          duration: 0.4,
          ease: MenuOutEase,
          position: 'fixed',
          x: bounds.x,
          y: bounds.y,
          width: bounds.width,
          height: bounds.height,
          clearProps: 'position,width,height,x, y,scale, zIndex'
        })
        gsap.to([maskRef.current, closeButtonRef.current], {
          autoAlpha: 0,
          duration: 1,
          pointerEvents: 'none'
        })
      }
    }, [isModalOpen])

    const aspectRatio = data?.vimeoData?.width
      ? `${data?.vimeoData?.width} / ${data?.vimeoData?.height}`
      : '16 / 9'

    return (
      <Section
        as='figure'
        contain={contain}
        ref={localRef}
        className={cn(className, 'mx-auto')}
        bottomMargin={false}
      >
        <div
          ref={maskRef}
          className='z-videoModalShadow pointer-events-none bg-black bg-opacity-80 fixed inset-0 opacity-0'
        />
        <div
          ref={wrapperRef}
          className='w-full h-auto relative aspect-video'
          style={{ aspectRatio }}
        >
          {!videoClicked && (
            <button
              onClick={onPlayClick}
              className='absolute w-full h-full inset-0 group z-[1] flex items-center justify-center'
              aria-label='play video'
              disabled={!ready}
            >
              {showPlayButton && <PlayButton />}

              {isOverrideThumb && (
                <ResponsiveImage
                  className={cn(
                    '!absolute z-[8] inset-0 transition-opacity duration-1000',
                    hidePoster && ready ? 'opacity-0' : 'opacity-100'
                  )}
                  image={overrideThumb}
                  aspect={16 / 9}
                />
              )}
              {!isOverrideThumb && (
                <img
                  className={cn(
                    '!absolute z-[8] inset-0 transition-opacity duration-1000',
                    hidePoster && ready ? 'opacity-0' : 'opacity-100'
                  )}
                  src={vimeoThumb}
                  width='100%'
                  alt={data?.caption || data?.vimeoData?.title}
                />
              )}
            </button>
          )}

          <div
            ref={containerRef}
            className={'top-0 left-0 flex items-center justify-center'}
          >
            <video
              className={cn(
                'w-full h-auto max-h-full transition-opacity duration-300',
                hidePoster && ready ? 'opacity-100' : 'opacity-0'
              )}
              ref={combinedRefs}
              muted={isMuted}
              controls={videoClicked}
              loop={loop}
              autoPlay={autoplay}
              playsInline={playsInline}
            />
          </div>
        </div>
        <Caption caption={data?.caption} />
        <div
          ref={closeButtonRef}
          className='z-videoModal fixed top-5 right-5 opacity-0 pointer-events-none'
        >
          <button aria-label='Close' label='Close Video' onClick={closeModal}>
            <XButton />
          </button>
        </div>
      </Section>
    )
  }
)
VimeoVideo.displayName = 'VimeoVideo'
export default VimeoVideo

function PlayButton() {
  return (
    <span
      className={cn(
        'absolute w-[2.75rem] h-[2.75rem] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center rounded-full bg-blue text-white justify-center',
        'transition-transform duration-200 easing group-hover:scale-110'
      )}
    >
      <PlayIcon className={'w-[11px]'} />
    </span>
  )
}
