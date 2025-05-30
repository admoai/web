export default {
  title: 'Seo',
  name: 'seo',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    {
      title: 'Meta Title',
      name: 'meta_title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Meta Description',
      name: 'meta_description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      title: 'Meta Image',
      name: 'meta_image',
      type: 'image',
      description:
        'This is the image that will be used for display as the webpage brand for this entry, as well as on Twitter Cards and Facebook OpenGraph that link to this page.',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }
  ]
}
