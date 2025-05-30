import fileCacheMiddleware from './fileCacheMiddleware'
import { createSettingsProjection } from './projections'
import resolve from './resolvers/resolve'
import sanityClient from './sanityClient'

async function getSettingsData() {
  const settings = await sanityClient.fetch(`
    *[!(_id in path("drafts.**")) && _type == 'settings'][0] { ${createSettingsProjection()} }
  `)

  await resolve(settings, sanityClient)
  console.log(settings, 'SETTINGS')
  return settings
}

async function getSettingsDataCached() {
  return fileCacheMiddleware('settings', getSettingsData)
}

export default getSettingsDataCached
