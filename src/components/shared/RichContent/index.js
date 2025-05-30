import BlockContent from '@sanity/block-content-to-react'
import cn from 'clsx'
import React, { forwardRef } from 'react'
import ResponsiveImage from '../../ResponsiveImage'
import { PortableText } from '@portabletext/react'
import Link from './../Link'
import Caption from '../Caption'
import VimeoVideo from '../VimeoPlayer'

export const serializers = {
  block: {
    bodyLarge: ({ children }) => <p className='body-large'>{children}</p>
  },
  types: {
    spacer: ({ value }) => {
      return <div className={cn('mb-[30px]', 'w-full spacer')} />
    }
    // imageWithMeta: ({ value }) => {
    //   return (
    //     <figure className={cn('my-20', value.contain && 'image-block-contain')}>
    //       <ResponsiveImage image={value} imageSizes='100vw' />
    //       <Caption caption={value.caption} />
    //     </figure>
    //   )
    // },
    // vimeoVideo: ({ value }) => {
    //   return <VimeoVideo data={value} />
    // }
  },
  marks: {
    link: ({ value, children }) => {
      console.log()
      return (
        <Link link={{ ...value }} showText={false}>
          {children}
        </Link>
      )
    },
    upcase: ({ children }) => <span className='uppercase'>{children}</span>
  }
}

const RichContent = forwardRef(
  (
    { className, content, children, style, serializer, width = 'w-full' },
    ref
  ) => {
    if (!content) return null
    return (
      <div className={cn(className, width, 'rte')} ref={ref} style={style}>
        <PortableText
          renderContainerOnSingleChild
          value={content}
          className={className}
          components={serializer || serializers}
        />
        {children}
      </div>
    )
  }
)

RichContent.displayName = 'RichContent'

export default RichContent
