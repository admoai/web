import { LegalIcon, SmallIcon } from '../icons'
import { portableTextToPlainText } from '../objects/portableText'

export default {
  name: 'aboutUsSlice',
  title: 'About Us',
  type: 'object',
  icon: SmallIcon(LegalIcon),
  fields: [
    {
      type: 'portableText',
      name: 'content',
      title: 'content'
    },
    {
      type: 'link',
      name: 'link',
      title: 'Link Button'
    }
  ],
  preview: {
    select: {
      content: 'content'
    },
    prepare: ({ content }) => {
      return {
        title: portableTextToPlainText(content),
        subtitle: 'About Us',
        media: LegalIcon
      }
    }
  }
}
