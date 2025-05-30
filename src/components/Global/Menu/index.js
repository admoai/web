'use client'
import Modal from '../../shared/Modal'
import { useAtom } from 'jotai'
import { isMenuOpenAtom } from './menuState'
import InlineVimeo from '@/components/shared/InlineVimeo'
import Link from '@/components/shared/Link'
import { useCallback, useEffect } from 'react'
import cn from 'clsx'
import IconWordmarkLogo from '@/components/Graphics/IconWordmarkLogo'
import WordwarkLogo from '@/components/Graphics/Workmark'
import ClientPageLog from '../ClientPageLog'
import isDark from '@/util/isDark'
import { useSettings } from '@/components/SettingsContext'
import { usePathname } from 'next/navigation'

export default function Menu({ page }) {
  const { featuredMedia, parent } = page ?? {}
  const { mediaType, image, video } = featuredMedia ?? {}
  const [isOpen, setOpen] = useAtom(isMenuOpenAtom)
  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev)
  }, [setOpen])
  const dark = isDark(page?.backgroundColor?.value)
  const pathname = usePathname()
  const navbarSlice = page?.slices?.filter(
    (slice) => slice._type === 'navbarSlice'
  )[0]
  const settings = useSettings()
  const { footerMenu } = settings ?? {}

  useEffect(() => {
    setOpen(false)
  }, [pathname])
  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      className='z-[777] color-change-section'
    >
      {((mediaType === 'video' && video) ||
        (parent?.mediaType === 'video' && parent?.video)) && (
        <InlineVimeo
          data={video}
          aspect='pt-0'
          className='!absolute w-full !h-full inset-0 pointer-events-none z-[0]'
        />
      )}
      <div className='py-4 relative z-md px-2.5 flex flex-col justify-between h-full'>
        <div>
          <div className='flex justify-between items-center w-full'>
            <Link
              link={{ slug: '/', title: 'home' }}
              showText={false}
              className='block'
            >
              <IconWordmarkLogo
                className={cn(
                  dark ? '[&_path]:fill-white' : '[&_path]:fill-black'
                )}
              />
            </Link>
            <button
              className='block w-[18px] h-[18px] medium:hidden mr-2.5'
              type='button'
              onClick={toggleMenu}
            >
              <span
                className={cn(
                  dark
                    ? 'bg-white before:bg-white'
                    : 'bg-black before:bg-black',
                  isOpen ? 'before:h-0' : 'before:h-[18px]',
                  'before:origin-center before:duration-300 before:ease-in-out before:transition-all relative block before:content-[""] before:absolute before:left-1/2 before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:w-[2px] h-[2px] min-w-[2px] w-[18px]'
                )}
              />
            </button>
          </div>
          <ul role='list' className='pt-12 flex flex-col gap-y-2.5 px-2.5'>
            {navbarSlice?.links &&
              navbarSlice?.links?.map((link, k) => (
                <li key={k}>
                  {link?._type === 'scrollAnchor' ? (
                    <button
                      type='button'
                      className={cn(
                        !dark && 'uppercase',
                        'text-fluid-h1 font-medium block w-fit whitespace-nowrap leading-[1]'
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        const target = document.getElementById(link?.slug)
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth' })
                        }
                        setTimeout(() => {
                          toggleMenu()
                        }, [250])
                      }}
                    >
                      {link?.title}
                    </button>
                  ) : link?._type === 'form' ? (
                    <></>
                  ) : (
                    <Link
                      link={link}
                      className={cn(
                        !dark && 'uppercase',
                        'text-fluid-h1 font-medium block w-fit whitespace-nowrap leading-[1]'
                      )}
                    />
                  )}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <WordwarkLogo className={'change-color-graphic'} />
          <div className='flex w-full justify-between pt-[30px]'>
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
    </Modal>
  )
}
