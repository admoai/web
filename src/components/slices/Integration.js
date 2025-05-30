import RichContent from '../shared/RichContent'
import cn from 'clsx'
import Link from '../shared/Link'
import AnchorButton from '../shared/AnchorButton'
import ResponsiveImage from '../ResponsiveImage'
import InlineImage from '../ResponsiveImage/inlineImage'
import InlineVimeo from '../shared/InlineVimeo'
import isDark from '@/util/isDark'

export default function Integration({ data, page }) {
  const { content, link, tiles } = data ?? {}
  return (
    <section className='section'>
      <div className='section-inner color-change-section'>
        <AnchorButton text={'Integration'} />
        {content && (
          <RichContent
            content={content}
            className={cn('text-current text-center py-[100px]')}
          />
        )}

        {tiles && (
          <ul role='list' className='grid-layout gap-4 px-2.5'>
            {tiles?.map((card, k) => (
              <li
                key={k}
                className={cn(
                  isDark(page?.backgroundColor.value) && 'dark border-white',
                  'flex flex-col justify-between p-4 medium:p-2.5 !pb-4 color-change-section col-span-12 medium:col-span-4 rounded-md overflow-hidden border-2 border-opacity-0 betterhover:hover:border-opacity-100 transition-colors easing duration'
                )}
              >
                <div className=''>
                  {card?.video && (
                    <div className='mb-[30px]'>
                      <InlineVimeo
                        data={card?.video}
                        className='rounded-md overflow-hidden'
                        aspect='pt-[66.666%]'
                      />
                    </div>
                  )}
                  <div>
                    <div className='mb-[60px] px-2.5 w-fit rounded-full border-white border text-fluid-body'>
                      {'0' + (k + 1)}
                    </div>
                    {card?.title && (
                      <p className='mb-[30px] font-medium text-[36px] w-full max-w-xs leading-[1]'>
                        {card?.title}
                      </p>
                    )}
                  </div>
                </div>
                {card?.text && (
                  <p className='w-full max-w-sm whitespace-pre-wrap text-fluid-body-small'>
                    {card?.text}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
        {link && (
          <Link
            link={link}
            className='font-medium mt-[60px] gradient-bg hover mx-auto h-[54px] border-[2px] border-black flex items-center justify-center text-center px-5 rounded-full overflow-hidden w-fit'
          />
        )}
      </div>
    </section>
  )
}
