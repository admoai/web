import ResponsiveImage from '../ResponsiveImage'
import InlineVimeo from '../shared/InlineVimeo'
import RichContent from '../shared/RichContent'
import cn from 'clsx'

export default function PageHero({ data, page }) {
  const { content } = data ?? {}
  const { featuredMedia, excerpt, logoImage } = page ?? {}
  const { mediaType, image, video } = featuredMedia ?? {}
  return (
    <section className='pt-[73px] section'>
      <div className='overflow-hidden relative'>
        {excerpt && (
          <RichContent
            content={excerpt}
            className={cn(
              'text-current [&_.spacer]:!mb-14 [&_.spacer]:medium:!mb-[30px]',
              'px-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-lg text-center w-full'
            )}
          />
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
        {mediaType === 'image' && image && (
          <ResponsiveImage image={image} fullHeight />
        )}
        {mediaType === 'video' && video && (
          <InlineVimeo
            data={video}
            aspect='pt-[calc(100vh_-_83px)]'
            className='rounded-md overflow-hidden'
          />
        )}
      </div>
    </section>
  )
}
