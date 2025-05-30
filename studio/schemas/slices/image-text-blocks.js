import {
  ImageIcon,
  RichTextIcon,
  SmallIcon,
  TextIcon,
  VideoIcon
} from '../icons'
import { portableTextToPlainText } from '../objects/portableText'

export default {
  name: 'imageTextBlocksSlice',
  title: 'Image Text Blocks',
  type: 'object',
  icon: SmallIcon(ImageIcon),
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Section Title',
      description: '(Optional)'
    },
    {
      name: 'mediaAspect',
      title: 'Media Aspect',
      type: 'string',
      initialValue: 'square',
      rule: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Square', value: 'square' },
          { title: 'Landscape ', value: 'landscape' },
          { title: 'Landscape Tall', value: 'landscapeTall' }
        ],
        layout: 'dropdown',
        direction: 'horizontal'
      }
    },
    {
      type: 'boolean',
      initialValue: false,
      name: 'isPortraitMobile',
      title: 'Portrait Mobile?'
    },
    {
      type: 'array',
      name: 'blocks',
      title: 'Blocks',
      of: [
        {
          type: 'object',
          title: 'Media',
          name: 'mediaBlock',
          fields: [
            {
              name: 'media',
              title: 'Media',
              type: 'mediaSelect'
            }
          ],
          preview: {
            select: {
              image: 'media.image',
              mediaType: 'media.mediaType'
            },
            prepare: ({ image, mediaType }) => {
              return {
                title: 'Media',
                media:
                  mediaType === 'image'
                    ? image
                    : mediaType === 'video'
                      ? VideoIcon
                      : ImageIcon
              }
            }
          }
        },
        {
          type: 'object',
          title: 'Text',
          name: 'textBlock',
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
                media: TextIcon
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
      title: 'title'
    },
    prepare: ({ title }) => {
      return {
        title: title ? title : 'Image Text Blocks',
        subtitle: title ? 'Image Text Blocks' : '',
        media: ImageIcon
      }
    }
  }
}
