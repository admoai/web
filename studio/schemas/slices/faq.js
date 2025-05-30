import { AccordionIcon, QuoteIcon, SmallIcon } from '../icons'

export default {
  name: 'faqSlice',
  title: 'FAQ',
  type: 'object',
  icon: SmallIcon(QuoteIcon),
  fields: [
    {
      type: 'array',
      name: 'accordions',
      title: 'Accordions',
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
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 3
            }
          ],
          preview: {
            select: {
              text: 'text',
              title: 'title'
            },
            prepare: ({ text, title }) => {
              return {
                title,
                subtitle: text,
                media: AccordionIcon
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
        title: 'FAQ',
        media: QuoteIcon
      }
    }
  }
}
