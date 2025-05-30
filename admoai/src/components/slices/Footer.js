'use client'
import RichContent from '../shared/RichContent'
import cn from 'clsx'
import HeaderLogo from '../Graphics/HeaderLogo'
import Link from '../shared/Link'
import WordwarkLogo from '../Graphics/Workmark'
import InlineVimeo from '../shared/InlineVimeo'
import { useSettings } from '../SettingsContext'
import isDark from '@/util/isDark'

export default function FooterSlice({ data, page }) {
  const { content, link, animationVideo, bgVideo } = data ?? {}
  const settings = useSettings()
  const { footerMenu } = settings ?? {}
  const dark = isDark(page?.backgroundColor?.value)
  return (
    <section className=''>
      <div className='relative'>
        {animationVideo && (
          <InlineVimeo
            data={animationVideo}
            aspect={'pt-[150%] medium:pt-[66.666%]'}
          />
        )}
        <div className='rounded-md overflow-hidden w-full max-w-[80%] py-24 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
          {content && (
            <RichContent
              content={content}
              className={cn('text-current text-center')}
            />
          )}
          {link && (
            <Link
              link={link}
              className='font-medium mt-[60px] gradient-bg hover mx-auto h-[54px] border-[2px] border-black flex items-center justify-center text-center px-5 rounded-full overflow-hidden w-fit'
            />
          )}
        </div>
      </div>
      <div className=''>
        <div className='relative'>
          {bgVideo && <InlineVimeo data={bgVideo} aspect={'pt-[42%]'} />}
          <div className='absolute w-full h-full inset-0 px-2.5 pb-4'>
            <div className='flex flex-col h-full'>
              <div className='h-full flex-grow flex items-center'>
                <WordwarkLogo className={'change-color-graphic'} />
              </div>

              <div className='pt-4 flex w-full justify-between'>
                <div className='flex flex-col h-full justify-between'>
                  <Link
                    showText={false}
                    aria-label='Contact Us'
                    link={{
                      slug: dark
                        ? 'publishers/publishers-form'
                        : 'advertisers/advertisers-form'
                    }}
                  >
                    {'Contact Us'}
                  </Link>
                  {footerMenu?.map((link, l) => (
                    <Link key={l} link={link.primaryMenuLink} />
                  ))}
                </div>
                <div>
                  {page?.contactButton && (
                    <Link
                      link={page?.contactButton}
                      className='font-medium gradient-bg hover mx-auto h-[54px] border-[2px] border-black flex items-center justify-center text-center px-5 rounded-full overflow-hidden w-fit'
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
