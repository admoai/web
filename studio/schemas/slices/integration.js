import { ImageIcon, IntegrationIcon, SmallIcon } from '../icons'
import { portableTextToPlainText } from '../objects/portableText'

export default {
  name: 'integrationSlice',
  title: 'Integration',
  type: 'object',
  icon: SmallIcon(IntegrationIcon),
  fields: [
    {
      type: 'portableText',
      name: 'content',
      title: 'content'
    },
    {
      type: 'array',
      name: 'tiles',
      title: 'Tiles',
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'title',
              title: 'Title'
            },
            {
              type: 'text',
              name: 'text',
              title: 'Text',
              rows: 3
            },
            {
              name: 'video',
              title: 'Video',
              type: 'vimeoVideo'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'text'
            },
            prepare: ({ title, subtitle }) => {
              return {
                title,
                subtitle,
                media: IntegrationIcon
              }
            }
          }
        }
      ]
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
        subtitle: 'Integration',
        media: IntegrationIcon
      }
    }
  }
}
