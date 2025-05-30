import RichContent from '../shared/RichContent'
import cn from 'clsx'
import Link from '../shared/Link'
import AnchorButton from '../shared/AnchorButton'
import ResponsiveImage from '../ResponsiveImage'
import InlineImage from '../ResponsiveImage/inlineImage'

export default function FlipCards({ data, page }) {
  const { content, link, cards } = data ?? {}
  return (
    <section className='section'>
      <div className='section-inner color-change-section'>
        <AnchorButton text={'Ad Offerings'} />
        {content && (
          <RichContent
            content={content}
            className={cn(
              'text-current text-center pb-[30px] pt-[100px] medium:py-32 px-5'
            )}
          />
        )}

        {cards && (
          <ul
            role='list'
            className='grid-layout gap-y-2.5 medium:gap-y-3 gap-x-2.5 px-5'
          >
            {cards?.map((card, k) => (
              <li
                key={k}
                className='col-span-4 medium:col-span-2 perspective-1000 flip-parent'
              >
                <div
                  className={cn(
                    card?.bgColor === 'pink' && 'bg-pink',
                    card?.bgColor === 'peach' && 'bg-peach',
                    card?.bgColor === 'blue' && 'bg-blue',
                    card?.bgColor === 'gradient' && 'gradient-bg',
                    'rounded-md border-2 border-black flip-card-inner transform-style-preserve-3d relative h-0 w-full pt-[100%] transition-transform duration-500 ease-in-out'
                  )}
                >
                  <div className='overflow-hidden rounded-md flip-card-front absolute inset-0 w-full h-full backface-hidden'>
                    {card?.image && (
                      <InlineImage
                        image={card?.image}
                        aspect={1 / 1}
                        className=''
                      />
                    )}
                  </div>
                  <div className='flip-card-back absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex items-center justify-center'>
                    <p>{card?.title}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {link && (
          <Link
            link={link}
            className='font-medium mt-[100px] gradient-bg hover mx-auto h-[54px] border-[2px] border-black flex items-center justify-center text-center px-5 rounded-full overflow-hidden w-fit'
          />
        )}
      </div>
    </section>
  )
}
