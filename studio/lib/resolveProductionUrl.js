export const localUrl = 'http://localhost:3000'
export const fallbackUrl = 'https://destination-nsw.vercel.app'

export const validPagesTypes = ['page']

export function getUrl(site, document) {
  const siteUrl = site.siteUrl || fallbackUrl

  const baseUrl = window.location.hostname === 'localhost' ? localUrl : siteUrl
  const previewUrl = new URL(baseUrl)

  const slug = document?.slug?.current

  previewUrl.pathname = '/api/draft'
  previewUrl.searchParams.append('slug', slug ?? '/')

  return previewUrl.toString()
}

const resolveProductionUrl = async (prev, context) => {
  const { document } = context
  if (validPagesTypes.includes(document._type)) {
    const client = context.getClient({ apiVersion: '2021-06-07' })
    const site = await client.fetch(
      "*[!(_id in path('drafts.**')) && _type == 'settings'][0] { _id, siteUrl }"
    )
    return getUrl(site, document)
  }

  return prev
}

export default resolveProductionUrl
