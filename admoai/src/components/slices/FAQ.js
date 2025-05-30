import isDark from '@/util/isDark'
import Accordions from '../shared/Accordions'
import AnchorButton from '../shared/AnchorButton'
import Link from '../shared/Link'

export default function FAQ({ data, page }) {
  const { accordions, link } = data ?? {}
  return (
    <section className='section'>
      <div className='section-inner color-change-section'>
        <AnchorButton text={'FAQ'} className='mb-24' />
        {accordions && (
          <Accordions
            accordionsList={accordions}
            isPageDark={isDark(page?.backgroundColor?.value)}
          />
        )}
        {link && (
          <Link
            link={link}
            className='gradient-bg hover mt-16 mx-auto h-[54px] border-[2px] border-black flex items-center justify-center text-center px-5 rounded-full overflow-hidden w-fit font-medium'
          />
        )}
      </div>
    </section>
  )
}
