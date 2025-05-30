import { PageHeroIcon, SmallIcon } from '../icons'
import { automaticSliceFields } from './automaticSliceFields'

export default {
  name: 'pageHeroSlice',
  title: 'Page Hero',
  type: 'object',
  icon: SmallIcon(PageHeroIcon),
  fields: [...automaticSliceFields],
  preview: {
    prepare: () => {
      return {
        title: 'Page Hero',
        media: PageHeroIcon
      }
    }
  }
}
