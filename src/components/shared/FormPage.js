'use client'
import ClientPageLog from '../Global/ClientPageLog'
import WordwarkLogo from '../Graphics/Workmark'
import { useSettings } from '../SettingsContext'
import cn from 'clsx'
import InlineVimeo from './InlineVimeo'
import Link from './Link'
import Media from './Media'
import { ValidationError, useForm } from '@formspree/react'
import isDark from '@/util/isDark'

export default function FormPage({ data }) {
  const { parent, footerVideo, formHeading, formID } = data ?? {}
  const { backgroundColor, featuredMedia, contactButton } = parent ?? {}

  const pageIsDark = isDark(backgroundColor?.value)

  const settings = useSettings()
  const { footerMenu } = settings ?? {}

  const navbarSlice = parent?.slices?.filter(
    (slice) => slice._type === 'navbarSlice'
  )[0]
  return (
    <section className='pt-[73px]'>
      <div className='section'>
        <div className='relative'>
          {featuredMedia && (
            <Media
              media={featuredMedia}
              aspect={'!absolute inset-0 !h-full'}
              className='rounded-md overflow-hidden'
            />
          )}
          <div className='relative w-full z-sm px-2.5 min-h-[calc(100vh_-_83px)] flex items-center py-6'>
            <div className='w-full'>
              {formHeading && (
                <h2
                  className={cn(
                    !pageIsDark && 'uppercase',
                    'whitespace-pre-wrap text-fluid-h3 font-medium leading-[1] mb-4 tracking-tight'
                  )}
                >
                  {formHeading}
                </h2>
              )}
              <Form formId={formID} />
            </div>
          </div>
        </div>
      </div>

      <div className='relative'>
        {footerVideo && (
          <InlineVimeo
            data={footerVideo}
            aspect={'pt-[66.667%] medium:pt-[42%]'}
          />
        )}
        <div className='absolute w-full h-full inset-0 px-2.5 pb-4'>
          <div className='flex flex-col h-full'>
            <div className='h-full flex-grow flex items-center'>
              <WordwarkLogo className={'change-color-graphic'} />
            </div>

            <div className='pt-4 flex w-full justify-between'>
              <div className='flex flex-col h-full justify-between'>
                <Link
                  showText={false}
                  aria-label='Contact Us'
                  link={{
                    slug: pageIsDark
                      ? 'publishers/publishers-form'
                      : 'advertisers/advertisers-form'
                  }}
                >
                  {'Contact Us'}
                </Link>
                {footerMenu?.map((link, l) => (
                  <Link key={l} link={link.primaryMenuLink} />
                ))}
              </div>
              <div>
                {/* {contactButton && (
                  <Link
                    link={contactButton}
                    className='font-medium gradient-bg hover mx-auto h-[54px] border-[2px] border-black flex items-center justify-center text-center px-5 rounded-full overflow-hidden w-fit'
                  />
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Form = ({ formId }) => {
  if (!formId) return
  const [state, handleSubmit, reset] = useForm(`${formId}`)
  if (state.succeeded) {
    return <div>Thank you for signing up!</div>
  }
  return (
    <form onSubmit={handleSubmit}>
      <InputWrapper>
        <div className='col-span-12 medium:col-span-6'>
          <label htmlFor='email' className='block'>
            Business Email *
          </label>
          <input
            id='email'
            className='block bg-transparent w-full'
            type='email'
            name='email'
            placeholder='Business Email'
          />
          <ValidationError
            field='email'
            prefix='Business Email *'
            errors={state.errors}
          />
        </div>
        <div className='col-span-12 medium:col-span-6'>
          <label htmlFor='ima' className='block'>
            I am a *
          </label>
          <input
            id='ima'
            className='block bg-transparent w-full'
            type='text'
            name='ima'
            placeholder='I am a *'
          />
        </div>
      </InputWrapper>
      <InputWrapper>
        <div className='col-span-12 medium:col-span-6'>
          <label htmlFor='first_name' className='block'>
            First Name *
          </label>
          <input
            id='first_name'
            className='block bg-transparent w-full'
            type='text'
            name='first_name'
            placeholder='First Name'
          />
          <ValidationError
            field='first_name'
            prefix='First Name *'
            errors={state.errors}
          />
        </div>
        <div className='col-span-12 medium:col-span-6'>
          <label htmlFor='last_name' className='block'>
            Last Name *
          </label>
          <input
            id='last_name'
            className='block bg-transparent w-full'
            type='text'
            name='last_name'
            placeholder='Last Name'
          />
          <ValidationError
            field='last_name'
            prefix='Last Name *'
            errors={state.errors}
          />
        </div>
      </InputWrapper>
      <InputWrapper>
        <div className='col-span-12 medium:col-span-6'>
          <label htmlFor='job_title' className='block'>
            Job Title *
          </label>
          <input
            id='job_title'
            className='block bg-transparent w-full'
            type='text'
            name='job_title'
            placeholder='Job Title'
          />
          <ValidationError
            field='job_title'
            prefix='Job Title *'
            errors={state.errors}
          />
        </div>
        <div className='col-span-12 medium:col-span-6'>
          <label htmlFor='country' className='block'>
            Country
          </label>
          <input
            id='country'
            className='block bg-transparent w-full'
            type='text'
            name='country'
            placeholder='Country'
          />
          <ValidationError
            field='country'
            prefix='Country'
            errors={state.errors}
          />
        </div>
      </InputWrapper>
      <InputWrapper>
        <div className='col-span-12 medium:col-span-6'>
          <label htmlFor='company' className='block'>
            Company Name *
          </label>
          <input
            id='company'
            className='block bg-transparent w-full'
            type='text'
            name='company'
            placeholder='Company Name'
          />
          <ValidationError
            field='company'
            prefix='Company Name *'
            errors={state.errors}
          />
        </div>
      </InputWrapper>
      <InputWrapper>
        <div className='col-span-12'>
          <label htmlFor='message' className='block'>
            Message
          </label>
          <textarea
            id='message'
            className='block w-full resize-none bg-transparent'
            rows={3}
            type='text'
            name='message'
            placeholder='Write Message Here'
          />
          <ValidationError
            field='message'
            prefix='Company Name *'
            errors={state.errors}
          />
        </div>
      </InputWrapper>
      <div className='grid-layout'>
        <div className='col-span-12 medium:col-span-6 medium:!col-start-7'>
          <button
            type='submit'
            disabled={state.submitting}
            aria-label='Send'
            className='font-medium gradient-bg hover h-[54px] border-[2px] border-black flex items-center justify-center text-center px-5 rounded-full overflow-hidden w-fit'
          >
            Send
          </button>
        </div>
      </div>
    </form>
  )
}

const InputWrapper = ({ children }) => (
  <div className='border-t color-change-border grid-layout pt-3 pb-3.5'>
    <div className='col-span-12 medium:col-span-6 medium:!col-start-7 grid-layout gap-x-2.5'>
      {children}
    </div>
  </div>
)
