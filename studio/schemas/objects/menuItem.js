import { LinkIcon, SmallIcon } from '../icons'

export default {
  title: 'Menu Item',
  name: 'menuItem',
  type: 'object',
  icon: SmallIcon(LinkIcon),
  options: {
    collapsible: true,
    collapsed: false
  },
  fields: [
    {
      title: 'Menu Link',
      name: 'primaryMenuLink',
      type: 'link',
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    select: {
      text: 'primaryMenuLink.page.title',
      externalText: 'primaryMenuLink.text'
    },
    prepare({ text, externalText }) {
      return {
        title: text || externalText,
        media: LinkIcon
      }
    }
  }
}
