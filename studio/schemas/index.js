import page from './documents/page'
import fileAsset from './documents/file'
import seo from './objects/seo'
import link from './objects/link'
import vimeoVideo from './objects/vimeoVideo'
import portableText from './objects/portableText'
import imageWithMeta from './objects/imageWithMeta'
import settings from './singletons/settings'
import errorPage from './singletons/errorPage'
import menuItem from './objects/menuItem'
import mediaSelect from './objects/mediaSelect'
import scrollAnchor from './documents/scroll-anchor'
import form from './documents/form'
import productAnchor from './documents/product-anchor'

export const schemaTypes = [
  page,
  form,
  scrollAnchor,
  productAnchor,
  fileAsset,
  // Singletons
  settings,
  errorPage,
  // Objects
  seo,
  link,
  vimeoVideo,
  imageWithMeta,
  portableText,
  menuItem,
  mediaSelect
]
