'use client'
import isDark from '@/util/isDark'
import { useEffect } from 'react'

export default function PageContent({ bgColor, children }) {
  useEffect(() => {
    const isBgDark = isDark(bgColor?.value)
    document.body.classList.toggle('text-white', isBgDark)
    document.body.classList.toggle('is-dark', isBgDark)
    document.body.classList.toggle('is-light', !isBgDark)
    document.body.classList.toggle('text-black', !isBgDark)
    document.body.style.backgroundColor = bgColor?.value || ''

    return () => {
      document.body.classList.remove('text-black')
      document.body.classList.add('text-white')
      document.body.style.backgroundColor = '#000000'
    }
  }, [bgColor])
  return <main className=''>{children}</main>
}
