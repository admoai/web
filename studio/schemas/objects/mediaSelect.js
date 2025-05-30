import { ImageIcon, SmallIcon } from '../icons'

export default {
  title: 'Media',
  name: 'mediaSelect',
  type: 'object',
  icon: SmallIcon(ImageIcon),
  options: {
    collapsible: true,
    collapsed: true
  },
  fields: [
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      initialValue: 'image',
      rule: (Rule) => Rule.required(),
      options: {
        list: [
          { title: '🖼️ Image', value: 'image' },
          { title: '🎥 Video', value: 'video' }
        ],
        layout: 'dropdown',
        direction: 'horizontal'
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'imageWithMeta',
      hidden: ({ parent }) => parent?.mediaType !== 'image'
    },
    {
      name: 'video',
      title: 'Video',
      type: 'vimeoVideo',
      hidden: ({ parent }) => parent?.mediaType !== 'video'
    }
  ],
  preview: {
    select: {
      image: 'image'
    },
    prepare({ image }) {
      return {
        title: 'Media',
        media: image
      }
    }
  }
}
