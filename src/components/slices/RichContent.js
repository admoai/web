'use client'

import { serializers as defaultSerializers } from '../shared/RichContent/index'
import RichContent from '../shared/RichContent/index'
import Section from '../shared/Section'
import Media from '../shared/Media'
import Link from '../shared/Link'
import AnchorButton from '../shared/AnchorButton'

const blockSerializers = {
  ...defaultSerializers,
  types: {
    ...defaultSerializers.types
  }
}

export default function RichContentSlice({ data }) {
  const { title, content, media, link } = data ?? {}
  return (
    <section className='section'>
      <div className='section-inner medium:!pb-24 color-change-section'>
        <AnchorButton text={title} className='mb-[60px] medium:mb-28' />
        <RichContent
          content={content}
          serializer={blockSerializers}
          className='w-full max-w-6xl mx-auto text-current text-center mb-12'
        />
        {media && (
          <div className='px-4 w-full max-w-6xl mx-auto'>
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
    </section>
  )
}
