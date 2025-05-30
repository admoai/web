import VimeoVideoInput from '../../components/VimeoVideo'
import { SmallIcon, VideoIcon } from '../icons'

const vimeoThumbnail = {
  name: 'vimeoThumbnail',
  type: 'object',
  title: 'Vimeo Thumbnail',
  hidden: true,
  fields: [
    { name: 'width', type: 'number' },
    { name: 'height', type: 'number' },
    { name: 'link', type: 'string' }
  ]
}

export default {
  title: 'Video',
  name: 'vimeoVideo',
  type: 'object',
  description: "Enter the vimeo ID below and click 'Fetch Vimeo Data'",
  icon: SmallIcon(VideoIcon),
  fields: [
    {
      name: 'vimeoData',
      title: 'Vimeo Video',
      type: 'object',
      fields: [
        {
          title: 'ID',
          name: 'vimeoId',
          type: 'string'
        },
        {
          name: 'title',
          type: 'string',
          title: 'Vimeo Title',
          hidden: true
        },
        {
          name: 'width',
          type: 'number',
          title: 'Width',
          hidden: true
        },
        {
          name: 'height',
          type: 'number',
          title: 'Height',
          hidden: true
        },
        {
          name: 'hlsPlayerLink',
          type: 'string',
          title: 'HLS Player Link',
          hidden: true
        },
        vimeoThumbnail
      ],
      components: {
        input: VimeoVideoInput
      }
    },
    // {
    //   name: 'caption',
    //   title: 'Caption',
    //   type: 'string'
    // },
    {
      name: 'thumbnail',
      title: 'Thumbnail Override',
      type: 'imageWithMeta'
    }
  ],
  preview: {
    select: {
      title: 'vimeoData.title',
      vimeoId: 'vimeoData.vimeoId',
      thumb: 'vimeoData.vimeoThumbnail.link',
      overrideThumb: 'thumbnail'
    },
    prepare({ title, vimeoId, thumb, overrideThumb }) {
      return {
        title: `${title}`,
        subtitle: `📹 Vimeo ID: ${vimeoId}`,
        media: overrideThumb?.asset
          ? overrideThumb
          : thumb
            ? () => (
                <img
                  src={thumb}
                  width='100%'
                  height='100%'
                  style={{ objectFit: 'cover' }}
                />
              )
            : VideoIcon
      }
    }
  }
}

export function getVideoThumbnail(video) {
  const thumb = video.vimeoData?.vimeoThumbnail?.link
  return video.thumbnail?.asset
    ? video.thumbnail
    : thumb
      ? () => (
          <img
            src={thumb}
            width='100%'
            height='100%'
            style={{ objectFit: 'cover' }}
          />
        )
      : null
}
