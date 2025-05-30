'use client'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useEffect, useState } from 'react'
import cn from 'clsx'
import ResponsiveImage from '../ResponsiveImage'

const animation = { duration: 15000, easing: (t) => t }

export default function LogosSlider({ data, page }) {
  const { content, logos } = data ?? {}

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    breakpoints: {
      '(max-width: 768px)': {
        slides: { perView: 'auto', spacing: 80 }
      }
    },
    slides: {
      perView: 'auto',
      spacing: 110
    },
    renderMode: 'performance',
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created(s) {
      if (isAnimating) {
        s.moveToIdx(5, true, animation)
      }
      setLoaded(true)
    },
    updated(s) {
      if (isAnimating) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      }
    },
    animationEnded(s) {
      if (isAnimating) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      }
    }
  })
  return (
    <section className='mb-2.5'>
      <div
        ref={sliderRef}
        className='keen-slider gutter-p color-change-section py-4 medium:py-16'
      >
        {logos?.map((logo, k) => (
          <div
            className='keen-slider__slide w-[94px] medium:w-[220px] min-w-[94px] medium:min-w-[220px] flex items-center justify-center'
            key={k}
          >
            {logo && <ResponsiveImage image={logo} originalDimensions />}
          </div>
        ))}
      </div>
    </section>
  )
}

function Arrow(props) {
  return (
    <button
      type='button'
      onClick={props.onClick}
      aria-label={props.left ? 'previous' : 'next'}
      className='block w-fit p-4 bg-grey1 rounded-xl [&_path]:fill-grey4'
    >
      <svg
        className={cn('h-2')}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        {props.left && (
          <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
        )}
        {!props.left && (
          <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
        )}
      </svg>
    </button>
  )
}
