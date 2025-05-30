'use client'
import IconWordmarkLogo from '../Graphics/IconWordmarkLogo'
import Link from '../shared/Link'
import cn from 'clsx'
import isDark from '@/util/isDark'

export default function Navbar({ data, page }) {
  const { links } = data ?? {}
  return (
    <nav
      className='animate-fade bg-black bg-opacity-20 backdrop-blur-md fixed bottom-4 left-1/2 -translate-x-1/2 h-[54px] z-xxxl pl-8 pr-4 rounded-full overflow-hidden hidden medium:flex items-center'
      role='navigation'
    >
      <div className='flex items-center gap-x-7'>
        <Link link={{ slug: '/', title: 'home' }} showText={false}>
          <IconWordmarkLogo />
        </Link>
        <ul role='list' className='flex items-center gap-x-2.5'>
          {links &&
            links?.map((link, k) => (
              <li key={k}>
                {link?._type === 'scrollAnchor' ? (
                  <button
                    type='button'
                    className='text-bone block w-fit whitespace-nowrap pb-2.5 pt-2 px-4 nav-button !bg-opacity-0 rounded-full leading-[1] betterhover:hover:!bg-opacity-50 transition-colors easing duration'
                    onClick={(e) => {
                      e.preventDefault()
                      const target = document.getElementById(link?.slug)
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                  >
                    {link?.title}
                  </button>
                ) : link?._type === 'form' ? (
                  <Link
                    link={link}
                    showText={false}
                    className={cn(
                      isDark(page?.backgroundColor?.value) &&
                        'bg-white betterhover:hover:text-black',
                      !isDark(page?.backgroundColor?.value) &&
                        'bg-black betterhover:hover:text-white',
                      'overflow-hidden block relative group text-bone pb-2.5 pt-2 px-4 rounded-full leading-[1] transition-colors easing duration'
                    )}
                  >
                    <span className='relative z-md'>{'Contact'}</span>
                    <span
                      className={cn(
                        isDark(page?.backgroundColor?.value)
                          ? 'gradient-bg-dark'
                          : 'gradient-bg-light',
                        'opacity-100 betterhover:group-hover:opacity-0 absolute inset-0 w-full h-full transition-all duration easing'
                      )}
                    />
                  </Link>
                ) : (
                  <Link
                    link={link}
                    className={cn(
                      '!text-bone pb-2.5 pt-2 px-4 nav-button !bg-opacity-0 rounded-full leading-[1] betterhover:hover:!bg-opacity-50 transition-colors easing duration'
                    )}
                  />
                )}
              </li>
            ))}
        </ul>
      </div>
    </nav>
  )
}
