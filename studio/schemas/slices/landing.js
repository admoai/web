import { HomeIcon, SmallIcon } from '../icons'

export default {
  name: 'landingSlice',
  title: 'Homepage Landing',
  type: 'object',
  icon: SmallIcon(HomeIcon),
  fields: [
    {
      type: 'array',
      name: 'pageLinks',
      title: 'Page Links',
      of: [{ type: 'reference', to: [{ type: 'page' }] }]
    }
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Landing',
        media: HomeIcon
      }
    }
  }
}
