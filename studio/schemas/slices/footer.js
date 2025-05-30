import { FooterIcon, SmallIcon } from '../icons'
import { portableTextToPlainText } from '../objects/portableText'

export default {
  name: 'footerSlice',
  title: 'Footer',
  type: 'object',
  icon: SmallIcon(FooterIcon),
  fields: [
    {
      name: 'animationVideo',
      title: 'Animation Video',
      type: 'vimeoVideo'
    },
    {
      type: 'portableText',
      name: 'content',
      title: 'content'
    },
    {
      type: 'link',
      name: 'link',
      title: 'Link Button'
    },
    {
      name: 'bgVideo',
      title: 'Gradient Video',
      type: 'vimeoVideo'
    }
  ],
  preview: {
    select: {
      content: 'content'
    },
    prepare: ({ content }) => {
      return {
        title: portableTextToPlainText(content),
        subtitle: 'Footer',
        media: FooterIcon
      }
    }
  }
}
