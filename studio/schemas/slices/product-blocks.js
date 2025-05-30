import { ProductIcon, RichTextIcon, SmallIcon, TextIcon } from '../icons'
import { portableTextToPlainText } from '../objects/portableText'

export default {
  name: 'productBlocksSlice',
  title: 'Product Blocks',
  type: 'object',
  icon: SmallIcon(ProductIcon),
  fields: [
    {
      name: 'bgVideo',
      title: 'Background Video',
      type: 'vimeoVideo'
    },
    {
      type: 'array',
      name: 'blocks',
      title: 'Blocks',
      of: [
        {
          type: 'object',
          name: 'rich-content',
          title: 'Rich Content',
          fields: [
            {
              type: 'string',
              name: 'title',
              title: 'Section Title'
            },
            {
              type: 'reference',
              title: 'Anchor',
              name: 'anchor',
              to: [{ type: 'productAnchor' }]
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
        },
        {
          type: 'object',
          name: 'rich-content-icons',
          title: 'Icons',
          fields: [
            {
              type: 'string',
              name: 'title',
              title: 'Section Title'
            },
            {
              type: 'reference',
              title: 'Anchor',
              name: 'anchor',
              to: [{ type: 'productAnchor' }]
            },
            {
              type: 'portableText',
              name: 'content',
              title: 'Content'
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
                      name: 'svgIcon',
                      title: 'SVG Icon',
                      type: 'inlineSvg'
                    },
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
              title: 'title',
              content: 'content'
            },
            prepare: ({ title, content }) => {
              return {
                title: portableTextToPlainText(content),
                media: ProductIcon
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Product Blocks',
        media: SmallIcon(ProductIcon)
      }
    }
  }
}
