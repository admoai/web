import cloneDeep from 'lodash/cloneDeep'
import find from 'lodash/find'
import { ArticleIcon, ErrorIcon, SearchIcon } from './../icons'
import page from './../documents/page'

const errorPage = {
  title: 'Error Page',
  name: 'errorPage',
  type: 'document',
  icon: ErrorIcon,
  hidden: true,
  groups: [
    { name: 'main', title: 'Page', default: true, icon: ArticleIcon },
    { name: 'seo', title: 'SEO', icon: SearchIcon }
  ],
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      initialValue: 'The page you we’re looking for could not be found.',
      validation: (Rule) => Rule.required(),
      group: 'main'
    },
    ...['seo', 'title'].map((name) => cloneDeep(find(page.fields, { name })))
  ],

  preview: cloneDeep(page.preview)
}

export default errorPage
