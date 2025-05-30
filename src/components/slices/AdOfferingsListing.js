import Media from '../shared/Media'
import cn from 'clsx'
import Link from '../shared/Link'
import AnchorButton from '../shared/AnchorButton'
import InlineVimeo from '../shared/InlineVimeo'

export default function AdOfferingsListing({ data }) {
  const { title, ads, link, bgAnimation } = data ?? {}
  return (
    <section className='section'>
      <div className='section-inner color-change-section relative'>
        {bgAnimation && (
          <InlineVimeo
            data={bgAnimation}
            className='!absolute !h-full w-full inset-0'
          />
        )}
        <div className='relative z-md'>
          <AnchorButton text={title} className='mb-[100px] medium:mb-56' />
          <ul
            role={'list'}
            className='grid-layout mb-28 gap-y-32 medium:gap-y-56 medium:gap-x-16 max-w-full'
          >
            {ads?.map((ad, k) => {
              const {
                title,
                bgColor,
                media,
                position,
                comingSoon,
                additionalInfo
              } = ad ?? {}
              const isLeft = position === 'left'
              const isRight = position === 'right'
              const isCenter = position === 'center'
              return (
                <li
                  className={cn(
                    isLeft || isRight
                      ? 'col-span-12 medium:col-span-6'
                      : 'col-span-12',
                    'relative flex medium:block justify-center',
                    isRight && 'medium:pt-80 medium:pr-24',
                    isLeft && 'medium:pl-24'
                  )}
                  key={k}
                >
                  {media && (
                    <div className='medium:mx-auto w-full max-w-[224px] medium:max-w-md relative'>
                      {comingSoon && isRight && (
                        <AnchorButton
                          text={'Coming Soon'}
                          className='absolute z-sm left-0 bottom-0 medium:bottom-auto medium:top-1/4 translate-y-1/2 medium:-translate-y-3/4 -translate-x-1/4 medium:-translate-x-1/2'
                        />
                      )}

                      {title && (
                        <div
                          className={cn(
                            bgColor === 'pink' && 'bg-pink',
                            bgColor === 'peach' && 'bg-peach',
                            bgColor === 'blue' && 'bg-blue',
                            bgColor === 'gradient' && 'gradient-bg',
                            isLeft || isCenter
                              ? 'box-shadow-left left-0 -translate-x-1/4 -translate-y-3/4'
                              : 'box-shadow right-0 translate-x-1/4 -translate-y-3/4',
                            isCenter && 'medium:!-translate-x-1/2',
                            isLeft && '!-translate-y-[90%]',
                            'z-sm absolute w-full max-w-[180px] medium:max-w-xs rounded-md border-2 border-black'
                          )}
                        >
                          <div className='relative p-4 medium:p-6'>
                            {comingSoon && isCenter && (
                              <AnchorButton
                                text={'Coming Soon'}
                                className='!hidden medium:!flex absolute z-sm right-0 top-0 -translate-y-1/2 translate-x-1/2'
                              />
                            )}
                            <p className='text-center uppercase text-fluid-h3 font-heading tracking-tight'>
                              {title}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className='relative'>
                        {comingSoon && isCenter && (
                          <AnchorButton
                            text={'Coming Soon'}
                            className='flex medium:!hidden absolute z-sm right-0 bottom-0 translate-y-1/2 translate-x-1/4'
                          />
                        )}
                        {additionalInfo && (isLeft || isCenter) && (
                          <div
                            className={cn(
                              bgColor === 'pink' && 'bg-pink',
                              bgColor === 'peach' && 'bg-peach',
                              bgColor === 'blue' && 'bg-blue',
                              bgColor === 'gradient' && 'gradient-bg',
                              'translate-x-1/2 z-lg absolute right-0 top-12 uppercase px-4 py-4 border-2 border-black rounded-md box-shadow-small'
                            )}
                          >
                            {additionalInfo}
                          </div>
                        )}

                        <div
                          className={cn(
                            isLeft || isCenter
                              ? 'box-shadow-left'
                              : 'box-shadow',
                            'rounded-md border-2 border-black overflow-hidden'
                          )}
                        >
                          <Media media={media} aspect='pt-[100%]' />
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
          {link && (
            <Link
              link={link}
              className='font-medium gradient-bg hover mx-auto h-[54px] border-[2px] border-black flex items-center justify-center text-center px-5 rounded-full overflow-hidden w-fit'
            />
          )}
        </div>
      </div>
    </section>
  )
}
