import { FileIcon, SmallIcon } from '../icons'

export default {
  name: 'fileAsset',
  title: 'File',
  icon: SmallIcon(FileIcon),
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      rule: (Rule) => Rule.required()
    },
    {
      name: 'file',
      title: 'File',
      type: 'file',
      rule: (Rule) => Rule.required()
    }
    // {
    //   title: 'Description',
    //   name: 'description',
    //   type: 'text',
    //   rows: 3
    // },
    // {
    //   title: 'Published Date',
    //   name: 'publishedDate',
    //   type: 'datetime'
    // }
  ]
}
