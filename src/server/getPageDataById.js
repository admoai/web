import { createPageProjection } from './projections'
import resolve from './resolvers/resolve'
import sanityClient from './sanityClient'

export default async function getPageDataById (id) {
  const query = `
  {
    "page": *[!(_id in path('drafts.**')) && _id == $id] | order(_updatedAt desc)[0] {
      ${createPageProjection()}
    }
  }
  `
  const data = await sanityClient.fetch(query, { id })

  await resolve(data, sanityClient)

  return data
}
