import isArray from 'lodash/isArray'
import asyncForEach from '../asyncForEach'
import ReferencesResolver from './ReferencesResolver'
import replaceFiles from './replaceFiles'
import replaceImages from './replaceImages'
import replaceReferences from './replaceReferences'

const resolveObject = async (data, referencesResolver) => {
  const resolvers = [replaceReferences, replaceImages, replaceFiles]
  await asyncForEach(resolvers, async (r) => await r(data, referencesResolver))
}

export default async function resolve(data, client) {
  const referencesResolver = new ReferencesResolver(client)
  if (isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      await resolveObject(data[i], referencesResolver)
    }
  } else {
    await resolveObject(data, referencesResolver)
  }

  await referencesResolver.resolve()
  return data
}
