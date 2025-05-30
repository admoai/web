import { MenuIcon, SmallIcon } from '../icons'
import { automaticSliceFields } from './automaticSliceFields'

export default {
  name: 'navbarSlice',
  title: 'Navbar',
  type: 'object',
  icon: SmallIcon(MenuIcon),
  fields: [
    {
      type: 'array',
      name: 'links',
      title: 'Links',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }, { type: 'scrollAnchor' }, { type: 'form' }],
          options: {
            filter: ({ document }) => {
              return {
                filter: '_type in ["page", "scrollAnchor", "form"]'
              }
            }
          }
        }
      ],
      validation: (Rule) => Rule.unique()
    }
  ],
  preview: {
    select: {
      links: 'links'
    },

    prepare: ({ links }) => {
      return {
        title: 'Navbar',
        media: MenuIcon
      }
    }
  }
}
