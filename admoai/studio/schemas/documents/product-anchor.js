import { isUniqueAcrossAllDocuments } from '../../lib/isUniqeAcrossAllDocuments'
import { ProductIcon, SmallIcon } from '../icons'
import {
  orderRankField,
  orderRankOrdering
} from '@sanity/orderable-document-list'

export default {
  title: 'Product Anchor',
  name: 'productAnchor',
  type: 'document',
  icon: SmallIcon(ProductIcon),
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
        media: ProductIcon
      }
    }
  },
  orderings: [orderRankOrdering]
}
