import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './studio/schemas/index'
import { dataset, projectId } from './studio/env'
import { media } from 'sanity-plugin-media'
import defaultDocumentNode from './studio/structure/defaultDocumentNode'
import structure from './studio/structure/index'
import resolveProductionUrl from './studio/lib/resolveProductionUrl'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'
import { inlineSvgInput } from '@focus-reactive/sanity-plugin-inline-svg-input'

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: '',
  projectId,
  dataset,

  plugins: [
    structureTool({
      structure,
      defaultDocumentNode
    }),
    media(),
    inlineSvgInput(),
    simplerColorInput({
      defaultColorFormat: 'rgba',
      defaultColorList: [
        { label: 'Light', value: '#F5F4ED' },
        { label: 'Dark', value: '#000000' },
        { label: 'Custom', value: 'custom' }
      ],
      enableSearch: true
    })
  ],
  document: {
    productionUrl: resolveProductionUrl
  },
  schema: {
    types: schemaTypes
  }
})
