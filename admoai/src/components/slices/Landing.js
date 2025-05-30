'use client'
import Link from '../shared/Link'
import cn from 'clsx'
import ResponsiveImage from '../ResponsiveImage'
import { useState } from 'react'
import { AnimatePresence, hover } from 'framer-motion'
import { FadeMotionDiv } from '../shared/FadeMotionDiv'
import InlineVimeo from '../shared/InlineVimeo'
import RichContent from '../shared/RichContent'
import ClientPageLog from '../Global/ClientPageLog'
import isDark from '@/util/isDark'
import HeaderLogo from '../Graphics/HeaderLogo'

export default function Landing({ data, page }) {
  const { pageLinks } = data ?? {}
  const { featuredMedia, excerpt, logoImage } = page ?? {}
  const { mediaType, image, video } = featuredMedia ?? {}
  const [hoverIndex, setHoverIndex] = useState(-1)
  return (
    <section className={cn('bg-black', 'h-screen fixed inset-0 w-full')}>
      <div
        className={cn(
          hoverIndex === -1 ? 'opacity-100' : 'medium:opacity-0',
          'absolute inset-0 w-full h-full pointer-events-none transition-opacity easing duration'
        )}
      >
        <div className='flex justify-between items-center px-2.5 medium:px-0 w-full medium:w-fit fixed medium:absolute top-4 z-[333] left-0 medium:left-1/2 medium:-translate-x-1/2'>
          <Link link={{ slug: '/', title: 'home' }} showText={false}>
            <HeaderLogo className={'hidden medium:block'} />
          </Link>
        </div>
        {excerpt && (
          <RichContent
            content={excerpt}
            className={cn(
              'text-current',
              '[&_h2]:!font-sans px-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-lg text-center w-full'
            )}
          />
        )}
        {mediaType === 'image' && image && (
          <ResponsiveImage image={image} fullHeight />
        )}
        {mediaType === 'video' && video && (
          <InlineVimeo data={video} aspect='pt-[100vh]' />
        )}
        {logoImage && (
          <div className='!absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-md pointer-events-none w-full max-w-3xl min-w-[580px]'>
            <ResponsiveImage
              image={logoImage}
              originalDimensions
              widthFull
              className=''
            />
          </div>
        )}
      </div>

      {pageLinks?.map((item, k) => (
        <div
          key={k}
          className={cn(
            hoverIndex === k ? 'opacity-100' : 'opacity-0',
            'hidden medium:block z-lg transition-opacity duration easing absolute inset-0 w-full h-full pointer-events-none'
          )}
        >
          <div className='flex justify-between items-center px-2.5 medium:px-0 w-full medium:w-fit fixed medium:absolute top-4 z-[333] left-0 medium:left-1/2 medium:-translate-x-1/2'>
            <Link link={{ slug: '/', title: 'home' }} showText={false}>
              <HeaderLogo
                className={cn(
                  !isDark(item?.backgroundColor?.value) &&
                    '[&_path]:fill-black',
                  'hidden medium:block'
                )}
              />
            </Link>
          </div>
          {excerpt && (
            <RichContent
              content={excerpt}
              className={cn(
                !isDark(item?.backgroundColor?.value) && 'uppercase text-black',
                '[&_h2]:!font-sans text-current transition-colors easing duration',
                'px-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-lg text-center w-full'
              )}
            />
          )}
          {item?.logoImage && (
            <div className='!absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-md pointer-events-none w-full max-w-3xl min-w-[580px]'>
              <ResponsiveImage
                image={item?.logoImage}
                originalDimensions
                widthFull
                className=''
              />
            </div>
          )}
          {item?.featuredMedia?.mediaType === 'image' &&
            item?.featuredMedia?.image && (
              <ResponsiveImage image={item?.featuredMedia?.image} fullHeight />
            )}
          {item?.featuredMedia?.mediaType === 'video' &&
            item?.featuredMedia?.video && (
              <InlineVimeo
                data={item?.featuredMedia?.video}
                aspect='pt-[100vh]'
              />
            )}
        </div>
      ))}

      {pageLinks && (
        <div className='flex gap-x-5 absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-3/4 z-lg'>
          {pageLinks?.map((item, k) => (
            <Link
              key={k}
              link={item}
              onMouseEnter={() => {
                setHoverIndex(k)
              }}
              onMouseLeave={() => setHoverIndex(-1)}
              className={cn(
                hoverIndex === -1 ||
                  isDark(pageLinks[hoverIndex]?.backgroundColor?.value)
                  ? 'text-white'
                  : '!text-black',
                !isDark(item?.backgroundColor?.value) &&
                  'betterhover:hover:!text-black',
                'text-white',
                'betterhover:hover:shadow-custom transition-all duration easing group overflow-hidden relative h-[41px] pb-0.5 font-medium flex items-center justify-center rounded-full pl-5 pr-10 after:absolute after:right-5 top-1/2 leading-[1] -translate-y-1/2 after:content-["→"]'
              )}
            >
              <span
                className={cn(
                  hoverIndex === -1 ||
                    isDark(pageLinks[hoverIndex]?.backgroundColor?.value)
                    ? 'border-white'
                    : '!border-black',
                  'betterhover:group-hover:opacity-0 z-xl pointer-events-none absolute inset-0 w-full h-full transition-all duration easing border rounded-full betterhover:hover:opacity-0'
                )}
              ></span>
              <span
                className={cn(
                  isDark(item?.backgroundColor?.value)
                    ? 'gradient-bg-dark'
                    : 'gradient-bg-light',
                  'opacity-0 betterhover:group-hover:opacity-100 absolute inset-0 w-full h-full transition-all duration easing'
                )}
              />
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
