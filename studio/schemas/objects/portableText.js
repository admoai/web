import forEach from 'lodash/forEach'
import { ErrorIcon, ImageIcon, SmallIcon } from '../icons'
import { automaticSliceFields } from '../slices/automaticSliceFields'
import imageWithMeta from './imageWithMeta'
import link from './link'

export const portableTextToPlainText = (text, deep = false) => {
  if (deep) {
    let result = ''
    forEach(
      (text || []).filter((x) => x._type === 'block'),
      (block) => {
        result += block.children
          .filter((child) => child._type === 'span')
          .map((span) => span.text)
          .join('')
        result += portableTextToPlainText(block.children, true)
      }
    )
    return result
  } else {
    const block = (text || []).find((block) => block._type === 'block')
    if (block) {
      return block.children
        .filter((child) => child._type === 'span')
        .map((span) => span.text)
        .join('')
    }
  }
}

const UpCaseStyle = (props) => (
  <span style={{ textTransform: 'uppercase' }}>{props.children}</span>
)
const BodyLargeStyle = (props) => (
  <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{props.children}</span>
)

export default {
  title: 'Rich Text',
  name: 'portableText',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      marks: {
        annotations: [
          {
            ...link,
            name: 'link',
            title: 'Link',
            fields: [
              ...link.fields.filter((x) => x.name !== 'text'),
              {
                ...link.fields.find((x) => x.name === 'text'),
                hidden: true,
                validation: null
              }
            ]
          }
        ],
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          {
            title: 'UpCase',
            value: 'upcase',
            component: UpCaseStyle,
            icon: () => '🔠'
          },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' }
        ]
      },
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Body large', value: 'bodyLarge', component: BodyLargeStyle },
        // { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' }
      ]
    },
    {
      type: 'object',
      name: 'spacer',
      title: 'Spacer',
      icon: SmallIcon(ErrorIcon),
      fields: [...automaticSliceFields],
      preview: {
        prepare: () => {
          return {
            title: 'Spacer',
            media: ErrorIcon
          }
        }
      }
    }
  ]
}
