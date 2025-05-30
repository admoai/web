import { capitalizeFirstLetter } from '../../lib/helpers'
import { InsightsIcon, ImageIcon, SmallIcon } from '../icons'

export default {
  name: 'adOfferingsListingSlice',
  title: 'Ad Offerings',
  type: 'object',
  icon: SmallIcon(InsightsIcon),
  fields: [
    {
      name: 'bgAnimation',
      title: 'Background Animation',
      type: 'vimeoVideo'
    },
    {
      type: 'string',
      name: 'title',
      title: 'Section Title'
    },
    {
      type: 'array',
      name: 'ads',
      title: 'Ads',
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'boolean',
              name: 'comingSoon',
              title: 'Coming Soon',
              initialValue: false
            },
            {
              type: 'string',
              name: 'title',
              title: 'Title'
            },
            {
              type: 'string',
              name: 'additionalInfo',
              title: 'Additional Info'
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
              name: 'media',
              title: 'Media',
              type: 'mediaSelect'
            },
            {
              name: 'position',
              title: 'Position',
              type: 'string',
              initialValue: 'left',
              rule: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' },
                  { title: 'Center', value: 'center' }
                ],
                layout: 'dropdown',
                direction: 'horizontal'
              }
            }
          ],
          preview: {
            select: {
              media: 'media.image',
              title: 'title',
              position: 'position'
            },
            prepare: ({ media, title, position }) => {
              return {
                title,
                subtitle: capitalizeFirstLetter(position),
                media: media ? media : ImageIcon
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
    prepare: () => {
      return {
        title: 'Ad Offerings',
        media: InsightsIcon
      }
    }
  }
}
