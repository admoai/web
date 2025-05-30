import { Fragment, useMemo } from 'react'
import groupSlices from './groupedSlices'
import { map } from 'lodash'
import Landing from './Landing'
import PageHero from './PageHero'
import AboutUs from './AboutUs'
import FooterSlice from './Footer'
import Navbar from './Navbar'
import FAQ from './FAQ'
import FlipCards from './FlipCards'
import ImageTextBlocks from './ImageTextBlocks'
import CaseStudy from './CaseStudy'
import LogosSlider from './LogosSlider'
import RichContentSlice from './RichContent'
import ScrollAnchor from './ScrollAnchor'
import AdOfferingsListing from './AdOfferingsListing'
import Integration from './Integration'
import ProductBlocks from './ProductBlocks'

const sliceComponentSelector = {
  richContentSlice: RichContentSlice,
  navbarSlice: Navbar,
  faqSlice: FAQ,
  productBlocksSlice: ProductBlocks,
  integrationSlice: Integration,
  adOfferingsSlice: FlipCards,
  adOfferingsListingSlice: AdOfferingsListing,
  caseStudySlice: CaseStudy,
  imageTextBlocksSlice: ImageTextBlocks,
  landingSlice: Landing,
  scrollAnchorSlice: ScrollAnchor,
  logosSliderSlice: LogosSlider,
  pageHeroSlice: PageHero,
  aboutUsSlice: AboutUs,
  footerSlice: FooterSlice
}

export default function Slices({ page, slices }) {
  return useMemo(() => {
    const groups = groupSlices(page, slices, sliceComponentSelector)

    return map(groups, (group, groupIndex) => {
      const { slices: groupedSlices } = group
      return (
        <Fragment key={`group-${page._id}-${groupIndex}`}>
          {groupedSlices}
        </Fragment>
      )
    })
  }, [slices, page])
}
