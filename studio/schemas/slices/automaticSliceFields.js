import NoteField from '../../components/NoteField'
import { CheckIcon, SmallIcon } from '../icons'

export const automaticSliceFields = [
  {
    name: 'note',
    type: 'string',
    components: {
      input: NoteField,
      field: NoteField
    },
    options: {
      icon: SmallIcon(CheckIcon),
      headline: 'Automatic module',
      message: 'This module is fully automatic.',
      tone: 'positive'
    }
  },
  {
    name: 'boolean',
    title: 'boolean',
    type: 'boolean',
    initialValue: true,
    hidden: true
  }
]
