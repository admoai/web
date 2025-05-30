'use client'
import RichContent from '../shared/RichContent'
import cn from 'clsx'
import Link from '../shared/Link'
import AnchorButton from '../shared/AnchorButton'
import Media from '../shared/Media'
import { Fragment } from 'react'
import isDark from '@/util/isDark'
import InlineVimeo from '../shared/InlineVimeo'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const DynamicDotsAnimationPublishersLottie = dynamic(
  () => import('./../shared/DotsAnimationPublishersLottie'),
  { ssr: false }
)
export default function ProductBlocks({ data, page }) {
  const { bgVideo, blocks, anchors } = data ?? {}
  return (
    <div className=''>
      {blocks?.map((block, k) => {
        return (
          <Fragment key={k}>
            {block?._type === 'rich-content' && (
              <RichContentBlock
                block={block}
                bgVideo={bgVideo}
                anchors={anchors}
              />
            )}
            {block?._type === 'rich-content-icons' && (
              <TilesBlock
                block={block}
                bgVideo={bgVideo}
                anchors={anchors}
                pageIsDark={isDark(page?.backgroundColor.value)}
              />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

const TilesBlock = ({ block, pageIsDark, bgVideo, anchors }) => {
  const { title, content, media, link, tiles, anchor } = block ?? {}
  return (
    <section className='section' id={anchor?.slug}>
      <div className='section-inner color-change-section relative'>
        {bgVideo && (
          <InlineVimeo
            data={bgVideo}
            className='rounded-md overflow-hidden'
            aspect='!absolute !h-full w-full inset-0'
          />
        )}
        <div className='relative z-md'>
          {title && <AnchorButton text={title} className='mb-[30px]' />}
          <AnchorsNav anchors={anchors} activeSlug={anchor?.slug} />
          <RichContent
            content={content}
            className='w-full max-w-6xl mx-auto text-current text-center'
          />
          {media && (
            <Media
              originalDimensions
              media={media}
              inlineVideo={false}
              className='mt-24 w-full max-w-6xl mx-auto rounded-md overflow-hidden'
            />
          )}
          {tiles && (
            <ul role='list' className='pt-[100px] grid-layout gap-4 px-2.5'>
              {tiles?.map((card, k) => (
                <li
                  key={k}
                  className={cn(
                    pageIsDark && 'dark border-white',
                    'flex flex-col justify-between p-8 color-change-section col-span-12 medium:col-span-4 rounded-md overflow-hidden border-2 border-opacity-0 betterhover:hover:border-opacity-100 transition-colors easing duration'
                  )}
                >
                  <div className=''>
                    {card?.svgIcon && (
                      <div
                        className='mx-auto pt-8 mb-24 w-fit'
                        dangerouslySetInnerHTML={{ __html: card?.svgIcon }}
                      />
                    )}

                    <div className=''>
                      {card?.title && (
                        <p className='mx-auto text-center mb-[30px] font-medium text-[36px] w-full max-w-xs leading-[1]'>
                          {card?.title}
                        </p>
                      )}
                    </div>
                  </div>
                  {card?.text && (
                    <p className='text-fluid-body-small text-center whitespace-pre-wrap'>
                      {card?.text}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
          {link && (
            <Link
              link={link}
              className='font-medium mt-20 gradient-bg hover mx-auto h-[54px] border-[2px] border-black flex items-center justify-center text-center px-5 rounded-full overflow-hidden w-fit'
            />
          )}
        </div>
      </div>
    </section>
  )
}

const RichContentBlock = ({ block, bgVideo, anchors }) => {
  const { title, content, media, link, anchor } = block ?? {}
  return (
    <section className='section' id={anchor?.slug}>
      <div className='section-inner color-change-section relative'>
        {bgVideo && (
          <InlineVimeo
            data={bgVideo}
            className='rounded-md overflow-hidden'
            aspect='!absolute !h-full w-full inset-0'
          />
        )}
        <div className='relative z-md'>
          {title && <AnchorButton text={title} className='mb-[30px]' />}
          <AnchorsNav anchors={anchors} activeSlug={anchor?.slug} />
          <RichContent
            content={content}
            className='w-full max-w-6xl mx-auto text-current text-center'
          />
          {media && (
            <div className='mt-[100px] w-full max-w-6xl mx-auto px-2.5'>
              <Media
                originalDimensions
                media={media}
                inlineVideo={false}
                className='rounded-md overflow-hidden'
              />
            </div>
          )}
          {link && (
            <Link
              link={link}
              className='font-medium mt-20 gradient-bg hover mx-auto h-[54px] border-[2px] border-black flex items-center justify-center text-center px-5 rounded-full overflow-hidden w-fit'
            />
          )}
        </div>
      </div>
    </section>
  )
}

const AnchorsNav = ({ anchors, activeSlug }) => {
  const [isHovering, setIsHovering] = useState(-1)
  return (
    <nav
      role='navigation'
      className='flex items-center gap-2.5 medium:gap-4 w-fit mx-auto mb-[100px]'
    >
      {anchors?.map((anchor, a) => (
        <button
          key={a}
          type='button'
          onMouseEnter={() => setIsHovering(a)}
          onMouseLeave={() => setIsHovering(-1)}
          className={cn(
            activeSlug === anchor?.slug
              ? 'gradient-bg !text-white'
              : 'bg-white bg-opacity-50 text-black',
            isHovering === a && 'gradient-bg !text-white',
            'block pb-2.5 pt-2 px-4 rounded-full leading-[1] transition-all easing duration'
          )}
          onClick={(e) => {
            e.preventDefault()
            const target = document.getElementById(anchor?.slug)
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        >
          {anchor?.title}
        </button>
      ))}
    </nav>
  )
}
