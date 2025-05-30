import { SliderIcon, SmallIcon } from '../icons'

export default {
  name: 'logosSliderSlice',
  title: 'Logos Slider',
  type: 'object',
  icon: SmallIcon(SliderIcon),
  fields: [
    {
      title: 'Logos',
      name: 'logos',
      type: 'array',
      options: {
        layout: 'list'
      },
      of: [
        {
          title: 'Logo SVG',
          type: 'imageWithMeta'
        }
      ]
    }
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Logos Slider',
        media: SliderIcon
      }
    }
  }
}
