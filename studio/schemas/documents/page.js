import { isUniqueAcrossAllDocuments } from '../../lib/isUniqeAcrossAllDocuments'
import { HomeIcon, PageIcon, SearchIcon, SmallIcon } from '../icons'
import { pageSlices } from '../slices'

export default {
  title: 'Page',
  name: 'page',
  type: 'document',
  icon: PageIcon,
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
      name: 'backgroundColor',
      title: 'Background color',
      type: 'simplerColor',
      group: 'main'
    },
    {
      title: 'Excerpt',
      name: 'excerpt',
      type: 'portableText',
      group: 'main'
    },
    {
      title: 'Featured Media',
      name: 'featuredMedia',
      type: 'mediaSelect',
      group: 'main'
    },
    {
      name: 'logoImage',
      title: 'Logo Image',
      type: 'imageWithMeta',
      group: 'main'
    },
    {
      name: 'slices',
      title: 'Modules',
      type: 'array',
      group: 'main',
      of: pageSlices
    },
    {
      name: 'contactButton',
      title: 'Contact Button',
      type: 'link',
      group: 'main'
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      subtitle: 'slug.current',
      image: 'featuredMedia.image'
    },
    prepare: ({ title, subtitle, image, slug }) => {
      return {
        title,
        subtitle,
        media: slug === 'home' ? HomeIcon : image
      }
    }
  }
}
