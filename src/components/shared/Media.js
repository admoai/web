import ResponsiveImage from '../ResponsiveImage'
import InlineVimeo from './InlineVimeo'
import VimeoVideo from './VimeoPlayer'

export default function Media({
  media,
  className,
  aspect = 'pt-[100%]',
  originalDimensions = false,
  inlineVideo = true
}) {
  const { mediaType, image, video } = media ?? {}
  return (
    <>
      {mediaType === 'image' && image && (
        <ResponsiveImage
          image={image}
          className={className}
          originalDimensions={originalDimensions}
        />
      )}
      {mediaType === 'video' && inlineVideo && video && (
        <InlineVimeo data={video} aspect={aspect} className={className} />
      )}
      {mediaType === 'video' && !inlineVideo && video && (
        <VimeoVideo data={video} className={className} showPlayButton={false} />
      )}
    </>
  )
}
