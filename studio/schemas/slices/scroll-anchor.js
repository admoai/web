import { AnchorIcon, SmallIcon } from '../icons'

export default {
  name: 'scrollAnchorSlice',
  title: 'Scroll Anchor',
  type: 'object',
  icon: SmallIcon(AnchorIcon),
  fields: [
    {
      type: 'reference',
      title: 'Anchor',
      name: 'anchor',
      to: [{ type: 'scrollAnchor' }]
    }
  ],
  preview: {
    select: {
      title: 'anchor.title'
    },
    prepare: ({ title }) => {
      return {
        title,
        subtitle: 'Scroll Anchor',
        media: AnchorIcon
      }
    }
  }
}
