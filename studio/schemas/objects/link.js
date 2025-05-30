import { LinkIcon, SmallIcon } from '../icons'

export const linkablePageTypes = [{ type: 'page' }, { type: 'form' }]

const link = {
  title: 'Link',
  name: 'link',
  type: 'object',
  icon: SmallIcon(LinkIcon),
  options: {
    modal: {
      type: 'dialog',
      width: 'auto'
    }
  },
  fields: [
    {
      title: 'Type',
      type: 'string',
      name: 'linkType',
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'External', value: 'external' }
        ]
      },
      validation: (Rule) => Rule.required()
    },
    {
      type: 'string',
      name: 'text',
      title: 'Text',
      description: 'Optional for internal links',
      validation: (Rule) =>
        Rule.custom((text, { parent }) => {
          if (parent?.linkType === 'external') {
            return text ? true : 'Add text for this external link'
          }
          return true
        })
    },
    {
      title: 'Page Or File',
      name: 'page',
      type: 'reference',
      to: linkablePageTypes,
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      options: {
        disableNew: true
      }
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel']
        })
    }
  ],
  preview: {
    select: {
      text: 'text',
      linkType: 'linkType',
      pageTitle: 'page.title',
      url: 'url'
    },
    prepare({ text, linkType, pageTitle, url }) {
      return {
        title: text || pageTitle,
        subtitle: url || linkType,
        media: LinkIcon
      }
    }
  }
}

export default link
