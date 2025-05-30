import { mediaAssetSource } from 'sanity-plugin-media'

export default {
  title: 'Image',
  name: 'imageWithMeta',
  type: 'image',
  options: {
    hotspot: true,
    showDetails: true,
    sources: [mediaAssetSource]
  },
  fields: [
    {
      title: 'Alternative text (Will use the alt text on the image first)',
      name: 'alt',
      type: 'string'
    }
    // {
    //   title: 'Caption',
    //   name: 'caption',
    //   type: 'string'
    // }
  ],
  preview: {
    select: {
      asset: 'asset',
      filename: 'asset.originalFilename',
      alt: 'alt'
    },
    prepare({ alt, asset, filename }) {
      return {
        title: alt || '(alt text missing)',
        subtitle: filename,
        media: {
          _type: 'image',
          asset
        }
      }
    }
  }
}
