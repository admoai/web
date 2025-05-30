export const PARENT_PROJECTIONS = `
  "parent": parent->{
    _type,
    "slug": slug.current,
    title,
    "parent": parent->{
      _type,
      "slug": slug.current,
      title,
      "parent": parent->{
        _type,
        "slug": slug.current,
        title
      }
    }
  }
`

export const IMAGE_PROJECTION = `
_id,
altText,
title,
assetId,
extension,
originalFilename,
metadata {
  dimensions,
  isOpaque,
  hasAlpha,
  "dominantColor": palette.dominant.background
},
mimeType,
url,
hotspot,
crop
`

export const IMAGE_WITH_ASSET_PROJECTION = `
  ...,
  "attribution": attribution->{ title },
  "asset": asset->{
    ${IMAGE_PROJECTION}
  }
`

export const PAGE_REFERENCE_PROJECTION = `
  _id,
  _type,
  title,
  publishedDate,
  "slug": slug.current,
  status,
  excerpt,
  backgroundColor,
  logoImage{
    ${IMAGE_WITH_ASSET_PROJECTION}
  },
  featuredMedia{
    mediaType,
    video,
    image{
      ${IMAGE_WITH_ASSET_PROJECTION}
    }
  },
  ${PARENT_PROJECTIONS},
  slices[]{
    _type == 'navbarSlice' => {
      ...,
    }
  },
  "file": file.asset->{ url, extension, originalFilename },
  contactButton,
  footerVideo,
  formHeading,
  formID,
`

export const slices = `
  ${
    ''
    /* References and Images will be resolved automatically.
    You can add your own custom transforms here for example:

    _type == 'slice_type' => {
      ...,
      "related": *[_type == "page"][0...5],
      "doc": doc->{ image }
    },
  */
  }
  _type == 'productBlocksSlice' => {
    ...,
    "anchors": *[!(_id in path("drafts.**")) && _type == 'productAnchor'] | order(orderRank asc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      orderRank,
    },
  },
  true => { ${'' /* This is needed to get the other slice types. */}
    ...
  }
`

export const createSettingsProjection = () => `
  ...
`

export const createPageProjection = () => `
  ...,
  "slug": slug.current,
  slices[]{
    ${slices}
  },
  "site": *[!(_id in path("drafts.**")) && _type == 'settings'][0] { siteUrl, siteTitle }
`
