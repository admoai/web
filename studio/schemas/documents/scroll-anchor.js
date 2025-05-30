import { isUniqueAcrossAllDocuments } from '../../lib/isUniqeAcrossAllDocuments'
import { AnchorIcon, SmallIcon } from '../icons'
import {
  orderRankField,
  orderRankOrdering
} from '@sanity/orderable-document-list'

export default {
  title: 'Scroll Anchor',
  name: 'scrollAnchor',
  type: 'document',
  icon: SmallIcon(AnchorIcon),
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        isUnique: isUniqueAcrossAllDocuments
      },
      validation: (Rule) => Rule.required()
    },
    orderRankField({ type: 'orderRank' })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current'
    },
    prepare: ({ title, subtitle }) => {
      return {
        title,
        subtitle,
        media: AnchorIcon
      }
    }
  },
  orderings: [orderRankOrdering]
}
