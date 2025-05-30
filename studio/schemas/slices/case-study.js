import {
  ImageIcon,
  SearchIcon,
  SliderIcon,
  SmallIcon,
  TextIcon,
  VideoIcon
} from '../icons'
import { portableTextToPlainText } from '../objects/portableText'

export default {
  name: 'caseStudySlice',
  title: 'Case Study',
  type: 'object',
  icon: SmallIcon(SearchIcon),
  fields: [
    {
      type: 'portableText',
      name: 'content',
      title: 'content'
    },
    {
      name: 'bgVideo',
      title: 'Background Video',
      type: 'vimeoVideo',
      description: '(Optional)'
    },
    {
      name: 'caseStudyType',
      title: 'Type',
      type: 'string',
      initialValue: 'featMedia',
      rule: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Featured Media', value: 'featMedia' },
          { title: 'Blocks', value: 'blocks' },
          { title: 'Carousel', value: 'carousel' }
        ],
        layout: 'dropdown',
        direction: 'horizontal'
      }
    },
    {
      name: 'mediaOverlay',
      title: 'Media Overlay',
      type: 'mediaSelect',
      hidden: ({ parent }) => parent?.caseStudyType === 'carousel'
    },
    {
      type: 'array',
      name: 'slides',
      title: 'Carousel Slides',
      hidden: ({ parent }) => parent?.caseStudyType !== 'carousel',
      of: [
        {
          type: 'object',
          name: 'slide',
          title: 'Slide',
          fields: [
            {
              type: 'portableText',
              name: 'content',
              title: 'content'
            },
            {
              name: 'mediaOverlay',
              title: 'Media',
              type: 'mediaSelect'
            },
            {
              type: 'array',
              name: 'popupCards',
              title: 'Popup Cards',
              of: [
                {
                  type: 'object',
                  fields: [
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
                      type: 'string',
                      name: 'title',
                      title: 'Title'
                    },
                    {
                      type: 'string',
                      name: 'subtitle',
                      title: 'Sub-title'
                    },
                    {
                      name: 'position',
                      title: 'Position',
                      type: 'string',
                      initialValue: 'topLeft',
                      rule: (Rule) => Rule.required(),
                      options: {
                        list: [
                          { title: 'Top left', value: 'topLeft' },
                          { title: 'Top right', value: 'topRight' },
                          { title: 'Center left', value: 'centerLeft' },
                          { title: 'Center right', value: 'centerRight' },
                          { title: 'Bottom left', value: 'bottomLeft' },
                          { title: 'Bottom right', value: 'bottomRight' }
                        ],
                        layout: 'dropdown',
                        direction: 'horizontal'
                      }
                    }
                  ],
                  preview: {
                    select: {
                      subtitle: 'subtitle',
                      title: 'title'
                    },
                    prepare: ({ subtitle, title }) => {
                      return {
                        title,
                        subtitle,
                        media: TextIcon
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
                title: 'Carousel Slide',
                media: SliderIcon
              }
            }
          }
        }
      ]
    },
    {
      type: 'array',
      name: 'blocks',
      title: 'Blocks',
      hidden: ({ parent }) => parent?.caseStudyType !== 'blocks',
      of: [
        {
          type: 'object',
          name: 'textblock',
          title: 'Text',
          fields: [
            {
              type: 'string',
              name: 'heading',
              title: 'Heading',
              description: '(Optional)'
            },
            {
              type: 'text',
              name: 'text',
              title: 'Text',
              rows: 3,
              description: '(Optional)'
            },
            {
              type: 'string',
              name: 'label',
              title: 'Label',
              description: '(Optional)'
            }
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'text',
              label: 'label'
            },
            prepare: ({ title, subtitle, label }) => {
              return {
                title: title ? title : label,
                subtitle,
                media: TextIcon
              }
            }
          }
        }
      ]
    },

    {
      type: 'array',
      name: 'popupCards',
      title: 'Popup Cards',
      hidden: ({ parent }) => parent?.caseStudyType !== 'featMedia',
      of: [
        {
          type: 'object',
          fields: [
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
              type: 'string',
              name: 'title',
              title: 'Title'
            },
            {
              type: 'string',
              name: 'subtitle',
              title: 'Sub-title'
            },
            {
              name: 'position',
              title: 'Position',
              type: 'string',
              initialValue: 'topLeft',
              rule: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: 'Top left', value: 'topLeft' },
                  { title: 'Top right', value: 'topRight' },
                  { title: 'Center left', value: 'centerLeft' },
                  { title: 'Center right', value: 'centerRight' },
                  { title: 'Bottom left', value: 'bottomLeft' },
                  { title: 'Bottom right', value: 'bottomRight' }
                ],
                layout: 'dropdown',
                direction: 'horizontal'
              }
            }
          ],
          preview: {
            select: {
              subtitle: 'subtitle',
              title: 'title'
            },
            prepare: ({ subtitle, title }) => {
              return {
                title,
                subtitle,
                media: TextIcon
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
        title: 'Case Study',
        media: SearchIcon
      }
    }
  }
}