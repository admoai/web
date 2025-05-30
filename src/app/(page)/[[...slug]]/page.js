import { cache, use } from 'react'
import getPageData from '../../../server/getPageData'
import { draftMode } from 'next/headers'
import last from 'lodash/last'
import { resolveInternalLinkUrl } from './../../../util/resolveLink'
import DraftModeBanner from './../../../components/DraftModeBanner'
import { notFound, redirect } from 'next/navigation'
import builder from '@sanity/image-url'
import Slices from '@/components/slices'
import ClientPageLog from '@/components/Global/ClientPageLog'
import PageContent from '@/components/shared/PageContent'
import Menu from '@/components/Global/Menu'
import FormPage from '@/components/shared/FormPage'

export const revalidate = 120 // revalidate every hour

export async function generateStaticParams() {
  return []
}

// We cache this on a per-request basis. This is called again in the head component
export const getData = cache(async (slug, preview) => {
  const parts = slug?.split('/')
  return getPageData(last(parts) || 'home', preview)
})

export async function generateMetadata({ params }) {
  const { slug } = params
  const { isEnabled: draftEnabled } = draftMode()

  // fetch data
  const pageData = await getData(slug?.join('/'), draftEnabled)
  if (!pageData?.page) return notFound()

  const { page } = pageData

  const { seo = {}, title: pageTitle, site } = page
  const { siteUrl } = site

  const imageBuilder = builder(null)
    .projectId(process.env.SANITY_PROJECT_ID)
    .dataset(process.env.SANITY_PROJECT_DATASET)

  const metaImage = seo?.meta_image?.asset
  const imageUrl =
    metaImage && imageBuilder.image(metaImage).width(1200).height(630).url()

  const defaultCanonicalUrl = `${siteUrl}${resolveInternalLinkUrl(page)}`
  const metadata = {
    ...(seo || {}),
    ...{
      meta_title: seo?.meta_title || pageTitle,
      og_url: defaultCanonicalUrl,
      canonical_url: defaultCanonicalUrl
    }
  }

  const meta = {
    description: metadata.meta_description,
    openGraph: {
      title: metadata.meta_title,
      description: metadata.meta_description,
      url: metadata.og_url,
      siteName: site.title,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630
        }
      ],
      locale: 'en_AU',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: metadata.meta_description,
      images: imageUrl ? [imageUrl] : undefined
    },
    alternates: {
      canonical: metadata.canonical_url
    }
  }
  if (page.slug !== 'home') {
    meta.title = metadata.meta_title
  }

  return meta
}

export const viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false
}

export default function Page({ params }) {
  const { slug } = params
  const { isEnabled: draftEnabled } = draftMode()
  const pageData = use(getData(slug?.join('/'), draftEnabled))
  if (!pageData?.page) {
    notFound()
  }
  const resolvedUrl = resolveInternalLinkUrl(pageData.page)
  if (slug && resolvedUrl !== `/${slug.join('/')}`) {
    redirect(resolvedUrl)
  }

  const { page } = pageData
  return (
    <>
      <Menu page={page} />
      <PageContent
        bgColor={page?.backgroundColor || page?.parent?.backgroundColor}
      >
        {draftEnabled && <DraftModeBanner />}
        <h1 className='sr-only'>{page.title}</h1>
        <ClientPageLog data={page} />
        {page?._type === 'form' && <FormPage data={page} />}
        <Slices slices={page.slices} page={page} />
      </PageContent>
    </>
  )
}
