import compact from 'lodash/compact'
import get from 'lodash/get'

function resolveSlug(document) {
  const slug = get(document, ['slug'], get(document, ['current'], document))
  if (slug !== 'home') {
    // home resolves to `/`
    return slug
  }
}

function resolveParentSlugs(parent) {
  const parentSlug = parent?.parent ? resolveParentSlugs(parent.parent) : null
  return compact([parentSlug, resolveSlug(parent)]).join('/')
}

export function resolveInternalLinkUrl(doc) {
  if (doc?.status === 'hidden' && doc._type === 'person') return null
  if (doc._type === 'fileAsset' && doc.file) {
    return `${doc.file.url}/${doc.file.originalFilename}`
  }
  const parts = compact([resolveParentSlugs(doc.parent), resolveSlug(doc)])
  return `/${compact(parts).join('/')}`
}

export function resolveLink(linkOrPage) {
  if (!linkOrPage) return null
  if (linkOrPage.linkType) {
    if (linkOrPage.linkType === 'external') {
      return linkOrPage
    }
    return {
      text: get(linkOrPage, ['text'], get(linkOrPage, ['page', 'title'])),
      url: linkOrPage.page ? resolveInternalLinkUrl(linkOrPage.page) : ''
    }
  }
  return {
    text: get(linkOrPage, ['title']),
    url: resolveInternalLinkUrl(linkOrPage)
  }
}

export function resolveLinkText(linkOrPage) {
  return get(linkOrPage, ['text'], get(linkOrPage, ['page', 'title']))
}
