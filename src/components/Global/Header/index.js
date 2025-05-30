'use client'
import HeaderLogo from '@/components/Graphics/HeaderLogo'
import IconWordmarkLogo from '@/components/Graphics/IconWordmarkLogo'
import Link from '@/components/shared/Link'
import cn from 'clsx'
import { useAtom } from 'jotai'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { isMenuOpenAtom } from '../Menu/menuState'

export default function Header({ settings }) {
  const { siteTitle, mainMenu } = settings ?? {}
  const pathname = usePathname()
  const [isOpen, setOpen] = useAtom(isMenuOpenAtom)
  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev)
  }, [setOpen])
  const isHome = pathname === '/'
  return (
    <>
      <header
        className={cn(
          isHome &&
            'medium:opacity-0 medium:pointer-events-none -translate-x-1/2 left-1/2 w-fit',
          !isHome &&
            'w-full medium:w-fit left-0 medium:left-1/2 medium:-translate-x-1/2',
          'flex justify-between items-center px-2.5 medium:px-0 fixed medium:absolute top-4 z-[333]'
        )}
      >
        <Link link={{ slug: '/', title: 'home' }} showText={false}>
          <HeaderLogo
            className={cn(
              !isHome && 'hidden medium:block',
              'change-color-graphic'
            )}
          />
          {!isHome && (
            <IconWordmarkLogo className='change-color-graphic block medium:hidden' />
          )}
        </Link>
        {!isHome && (
          <button
            className='block w-[18px] h-[18px] medium:hidden mr-2.5'
            type='button'
            onClick={toggleMenu}
          >
            <span
              className={cn(
                isOpen ? 'before:h-0' : 'before:h-[18px]',
                'menu-button before:origin-center before:duration-300 before:ease-in-out before:transition-all relative block before:content-[""] before:absolute before:left-1/2 before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:w-[2px] h-[2px] min-w-[2px] w-[18px]'
              )}
            />
          </button>
        )}
      </header>
      <nav role='navigation'>
        {mainMenu && (
          <div className='flex gap-2'>
            {mainMenu.map((item) => (
              <Link
                key={item.primaryMenuLink.page._id}
                link={item.primaryMenuLink.page}
              />
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
