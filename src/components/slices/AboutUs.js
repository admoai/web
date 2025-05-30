import RichContent from '../shared/RichContent'
import cn from 'clsx'
import Link from '../shared/Link'
import AnchorButton from '../shared/AnchorButton'

export default function AboutUs({ data, page }) {
  const { content, link } = data ?? {}
  return (
    <section className='section'>
      <div className='section-inner color-change-section px-4'>
        <AnchorButton text={'About Us'} />
        {content && (
          <RichContent
            content={content}
            className={cn(
              '[&_p]:max-w-4xl [&_p]:mx-auto w-full max-w-6xl mx-auto text-current text-center py-[100px] medium:py-44'
            )}
          />
        )}
        {link && (
          <Link
            link={link}
            className='font-medium gradient-bg hover mx-auto h-[54px] border-[2px] border-black flex items-center justify-center text-center px-5 rounded-full overflow-hidden w-fit'
          />
        )}
      </div>
    </section>
  )
}
