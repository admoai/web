import Iframe from 'sanity-plugin-iframe-pane'
import { getUrl, validPagesTypes } from '../lib/resolveProductionUrl'

const resolveUrl = async (doc, context) => {
  const client = context.getClient({ apiVersion: '2021-06-07' })
  const site = await client.fetch("*[!(_id in path('drafts.**')) && _type == 'settings'][0] { _id, siteUrl }")
  return getUrl(site, doc)
}

const defaultDocumentNode = (S, context) => {
  const { schemaType } = context
  if (validPagesTypes.includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: (doc) => resolveUrl(doc, context),
          reload: {
            button: true,
            revision: 1000
          }
        })
        .title('Preview')
    ])
  }
  return S.document().views([S.view.form()])
}

export default defaultDocumentNode
