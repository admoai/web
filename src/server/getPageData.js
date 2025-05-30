import fileCacheMiddleware from './fileCacheMiddleware'
import { createPageProjection } from './projections'
import resolve from './resolvers/resolve'
import sanityClient from './sanityClient'

async function getPageData(slug, preview) {
  const query = `
  {
    "page": *[${
      !preview ? "!(_id in path('drafts.**')) && " : ''
    }slug.current == $slug && 
      (status != 'hidden')] | order(_updatedAt desc)[0] {
      ${createPageProjection()}
    }
  }
  `
  const data = await sanityClient.fetch(query, { slug })

  await resolve(data, sanityClient)

  return data
}

async function getPageDataCached(slug, preview) {
  return fileCacheMiddleware(slug, async () => await getPageData(slug, preview))
}

export default getPageDataCached
