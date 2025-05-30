'use client'

import { resolveLink } from './../../util/resolveLink'
import cn from 'clsx'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { forwardRef, useMemo } from 'react'

const Link = forwardRef(
  (
    {
      openInNewTab = true,
      nonLinkTag = 'span',
      link,
      className,
      to,
      children,
      showText = true,
      scroll = true,
      prefetch = false,
      hash,
      ...rest
    },
    ref
  ) => {
    const pathname = usePathname()
    const { url, text } = useMemo(() => {
      if (to) return { url: to }
      if (link) {
        return resolveLink(link)
      }
      return {}
    }, [link, to])

    // External Link
    if (
      url &&
      (url.indexOf('http') >= 0 ||
        url.indexOf('tel:') >= 0 ||
        url.indexOf('mailto:') >= 0)
    ) {
      return (
        // eslint-disable-next-line react/jsx-no-target-blank
        <a
          aria-label={text}
          href={url}
          className={className}
          target={openInNewTab ? '_blank' : ''}
          rel={openInNewTab ? 'noreferrer noopener' : ''}
          {...rest}
          ref={ref}
        >
          {showText && <span className='relative z-sm'>{text}</span>}
          {children}
        </a>
      )
    }

    // No Link
    if (!url) {
      const Tag = nonLinkTag
      return (
        <Tag className={className} {...rest} ref={ref}>
          {showText && <span className='relative z-sm'>{text}</span>}
          {children}
        </Tag>
      )
    }

    // Internal Link
    return (
      <NextLink
        className={cn(className, { 'is-active': pathname === url })}
        href={{
          pathname: hash ? url + '#' + hash : url
          // search,
          // query
        }}
        aria-label={text}
        scroll={scroll}
        prefetch={prefetch ? undefined : false}
        {...rest}
        ref={ref}
      >
        {showText && <span className='relative z-sm'>{text}</span>}
        {children}
      </NextLink>
    )
  }
)

Link.displayName = 'Link'

export default Link
