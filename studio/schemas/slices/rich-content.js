import { portableTextToPlainText } from '../objects/portableText'
import { RichTextIcon, SmallIcon } from '../icons'
export default {
  name: 'richContentSlice',
  title: 'Rich Content',
  type: 'object',
  icon: SmallIcon(RichTextIcon),
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Section Title'
    },
    {
      type: 'portableText',
      name: 'content',
      title: 'Content'
    },
    {
      name: 'media',
      title: 'Media',
      type: 'mediaSelect'
    },
    {
      type: 'link',
      name: 'link',
      title: 'Link Button'
    }
  ],
  preview: {
    select: {
      content: 'content',
      image: 'media.image'
    },
    prepare: ({ content, image }) => {
      return {
        title: portableTextToPlainText(content),
        subtitle: 'Rich Content',
        media: image ? image : RichTextIcon
      }
    }
  }
}
