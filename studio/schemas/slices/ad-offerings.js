import { ImageIcon, SmallIcon } from '../icons'
import { portableTextToPlainText } from '../objects/portableText'

export default {
  name: 'adOfferingsSlice',
  title: 'Flip Cards',
  type: 'object',
  icon: SmallIcon(ImageIcon),
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
    },
    {
      type: 'array',
      name: 'cards',
      title: 'Flip Cards',
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
              name: 'bgColor',
              title: 'Background Colour',
              type: 'string',
              initialValue: 'pink',
              rule: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: 'Pink', value: 'pink' },
                  { title: 'Blue', value: 'blue' },
                  { title: 'Peach', value: 'peach' },
                  { title: 'Gradient', value: 'gradient' }
                ],
                layout: 'dropdown',
                direction: 'horizontal'
              }
            },
            {
              name: 'image',
              title: 'Image',
              type: 'imageWithMeta'
            }
          ],
          preview: {
            select: {
              media: 'image',
              title: 'title'
            },
            prepare: ({ media, title }) => {
              return {
                title,
                media
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      content: 'content'
    },
    prepare: ({ content }) => {
      return {
        title: portableTextToPlainText(content),
        subtitle: 'Flip Cards',
        media: ImageIcon
      }
    }
  }
}
