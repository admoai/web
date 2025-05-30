'use client'
import gsap from 'gsap'
import { useState, useRef, useEffect } from 'react'
import cn from 'clsx'
import Link from './Link'

export default function Accordions({ accordionsList, isPageDark }) {
  const [openAccordion, setOpenAccordion] = useState(null)
  const accordionRefs = useRef([])

  const handleAccordionClick = (index) => {
    if (index === openAccordion) {
      gsap.to(
        accordionRefs.current[index].querySelector('.accordion__details'),
        {
          height: 0,
          duration: 0.4,
          ease: 'power1.inOut',
          onComplete: () => setOpenAccordion(null)
        }
      )
    } else {
      if (openAccordion !== null) {
        gsap.to(
          accordionRefs.current[openAccordion].querySelector(
            '.accordion__details'
          ),
          {
            height: 0,
            duration: 0.4,
            ease: 'power1.inOut'
          }
        )
      }
      setOpenAccordion(index)
      gsap.fromTo(
        accordionRefs.current[index].querySelector('.accordion__details'),
        { height: 0 },
        {
          height: 'auto',
          duration: 0.4,
          ease: 'power1.inOut'
        }
      )
    }
  }
  useEffect(() => {
    gsap.fromTo(
      accordionRefs.current,
      {
        opacity: 0
      },
      {
        opacity: 1,
        delay: 0.3,
        ease: 'expo.out',
        overwrite: true,
        duration: 1,
        stagger: 0.15
      }
    )
  }, [])
  return (
    <div className='px-4'>
      {accordionsList?.map((accordion, k) => (
        <div
          key={k}
          ref={(el) => (accordionRefs.current[k] = el)}
          onClick={() => handleAccordionClick(k)}
          className={cn(
            openAccordion === k && '',
            isPageDark ? 'dark text-bone' : 'text-black',
            'color-change-section',
            'rounded-md  px-4 overflow-hidden mb-2.5 last:mb-0 py-4 transition-all duration-500 easing opacity-0'
          )}
        >
          <button type='button' className='flex w-full justify-between'>
            {accordion?.title && (
              <div className='text-left text-[20px] medium:text-[36px] font-medium w-full max-w-[90%]'>
                {accordion?.title}
              </div>
            )}
            <div className='gap-3.5 flex items-center w-fit h-fit mt-3 medium:mt-4'>
              <span
                className={cn(
                  isPageDark
                    ? 'bg-white before:bg-white'
                    : 'bg-black before:bg-black',
                  openAccordion === k
                    ? 'before:h-0'
                    : 'before:h-3.5 before:medium:h-4',
                  'before:origin-center before:duration-300 before:ease-in-out before:transition-all relative block before:content-[""] before:absolute before:left-1/2 before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:w-0.5 before:medium:w-1 h-0.5 medium:h-1 min-w-[0.5rem] medium:min-w-[1rem] w-3.5 medium:w-4'
                )}
              />
            </div>
          </button>

          <div
            className={cn(
              'accordion__details overflow-hidden',
              openAccordion === k ? 'h-auto' : 'h-0'
            )}
          >
            <div className='w-full max-w-4xl pt-5 pb-3.5'>
              {accordion?.text && (
                <p className='text-fluid-body-small'>{accordion?.text}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
