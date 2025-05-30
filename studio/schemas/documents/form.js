import {
  orderRankField,
  orderRankOrdering
} from '@sanity/orderable-document-list'
import { isUniqueAcrossAllDocuments } from '../../lib/isUniqeAcrossAllDocuments'
import { ArticleIcon, PageIcon, SearchIcon, SmallIcon } from '../icons'

export default {
  title: 'Form',
  name: 'form',
  type: 'document',
  icon: SmallIcon(PageIcon),
  groups: [
    { name: 'main', title: 'Page', default: true, icon: SmallIcon(PageIcon) },
    { name: 'seo', title: 'SEO', icon: SmallIcon(SearchIcon) }
  ],
  fields: [
    {
      title: 'SEO',
      name: 'seo',
      type: 'seo',
      group: 'seo'
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      group: 'main',
      options: {
        source: 'title',
        isUnique: isUniqueAcrossAllDocuments
      },
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Status',
      name: 'status',
      type: 'string',
      group: 'main',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Hidden', value: 'hidden' }
        ]
      },
      initialValue: 'published'
    },
    {
      title: 'Parent Page',
      name: 'parent',
      type: 'reference',
      to: [{ type: 'page' }],
      group: 'main'
    },

    {
      name: 'formID',
      title: 'Form ID',
      type: 'string',
      group: 'main'
    },
    {
      name: 'footerVideo',
      title: 'Footer Video',
      type: 'vimeoVideo',
      group: 'main'
    },
    {
      title: 'Form Heading',
      name: 'formHeading',
      type: 'text',
      rows: 2,
      group: 'main'
    },
    orderRankField({ type: 'orderRank' })
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      subtitle: 'slug.current',
      parent: 'parent.title'
    },
    prepare: ({ title, subtitle, parent, slug }) => {
      return {
        title: title,
        subtitle,
        media: ArticleIcon
      }
    }
  },
  orderings: [orderRankOrdering]
}
