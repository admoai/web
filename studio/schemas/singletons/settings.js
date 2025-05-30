import Emoji from '../../components/Emoji'
import { SettingsIcon, SmallIcon } from './../icons'

export default {
  title: 'Settings',
  name: 'settings',
  type: 'document',
  icon: SettingsIcon,
  groups: [
    {
      name: 'main',
      title: 'Settings',
      default: true,
      icon: SmallIcon(SettingsIcon)
    },
    {
      name: 'menu',
      title: 'Menu',
      icon: () => <Emoji symbol='🎛️' size='1em' />
    },
    {
      name: 'footer',
      title: 'Footer',
      icon: () => <Emoji symbol='🦶' size='1em' />
    }
  ],
  fields: [
    {
      title: 'Site Title',
      name: 'siteTitle',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Site Url',
      name: 'siteUrl',
      type: 'url',
      group: 'main'
    },
    {
      name: 'footerMenu',
      title: 'Footer Menu',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'menuItem'
        }
      ]
    }
  ]
}
