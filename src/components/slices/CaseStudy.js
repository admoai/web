'use client'
import RichContent from '../shared/RichContent'
import cn from 'clsx'
import Link from '../shared/Link'
import AnchorButton from '../shared/AnchorButton'
import InlineVimeo from '../shared/InlineVimeo'
import Media from '../shared/Media'
import { isEmpty } from 'lodash'
import { Slider } from '../shared/Slider'

export default function CaseStudy({ data }) {
const {
content,
bgVideo,
caseStudyType,
mediaOverlay,
popupCards,
blocks,
slides
} = data ?? {}
const isMedia = caseStudyType === 'featMedia'
const isBlocks = caseStudyType === 'blocks'
const isCarousel = caseStudyType === 'carousel'

return (
<section className='section'>
<div className='color-change-section rounded-md overflow-hidden relative'>
{bgVideo && (
<InlineVimeo
data={bgVideo}
aspect={'!absolute inset-0 !h-full !w-full'}
/>
)}
<div
className={cn(
isMedia && 'medium:pb-44',
'pt-[72px] medium:pt-[62px] pb-[62px] relative z-md'
)}
>
<AnchorButton text={'Case Study'} className={'mb-24'} />
{content && (
<RichContent
content={content}
className={cn('text-current text-center mb-10 medium:mb-20 px-5')}
/>
)}

{isBlocks && (
<div className='grid-layout px-2.5 gap-x-2.5'>
<div className='col-span-12 medium:col-span-6'>
{mediaOverlay && (
<Media
media={mediaOverlay}
className='rounded-md overflow-hidden'
/>
)}
</div>
<div className='grid-layout col-span-12 medium:col-span-6 gap-2.5'>
{blocks?.map((block, b) => (
<div
key={b}
className='col-span-12 medium:col-span-6 color-change-section dark rounded-md overflow-hidden'
>
<div className='relative pt-[100%] h-0'>
<div className='absolute inset-0 w-full h-full flex items-center justify-center px-6'>
<div>
{block?.heading && (
<p className='text-fluid-h2 text-center mb-[30px] font-medium'>
{block?.heading}
</p>
)}
{block?.text && (
<p className='text-fluid-body-small text-center mb-4'>
{block?.text}
</p>
)}
{block?.label && (
<p className='text-fluid-body-small mx-auto border border-current rounded-full text-center w-fit px-5 py-2.5 leading-[1] font-medium'>
{block?.label}
</p>
)}
</div>
</div>
</div>
</div>
))}
</div>
</div>
)}

{isCarousel && !isEmpty(slides) && (
<div>
<Slider slides={slides} />
</div>
)}

{isMedia && (
<div className='mx-auto w-fit medium:w-fit flex flex-col medium:flex-row justify-center relative gap-y-8'>
{mediaOverlay && (
<div className='w-full max-w-md'>
<Media
originalDimensions
media={mediaOverlay}
className='box-shadow rounded-md border-2 border-black'
/>
</div>
)}
{popupCards && (
<div className='relative medium:absolute inset-0 w-full'>
{popupCards?.map((card, k) => (
<div
key={k}
className={cn(
card?.position === 'topLeft' &&
'medium:-translate-y-1/4 medium:-translate-x-full top-0 left-0 medium:-left-10',
card?.position === 'topRight' &&
'ml-auto medium:ml-0 top-0 right-0',
card?.position === 'centerLeft' &&
'medium:-translate-x-full top-1/2 -left-5',
card?.position === 'centerRight' &&
'ml-auto medium:ml-0 top-1/2 -right-10 medium:translate-x-full',
card?.position === 'bottomLeft' &&
'medium:-translate-x-3/4 medium:translate-y-1/2 bottom-0 left-0',
card?.position === 'bottomRight' &&
'ml-auto medium:ml-0 medium:translate-x-3/4 medium:translate-y-1/2 bottom-0 right-0',
'w-fit medium:absolute z-lg rounded-md border-2 border-black box-shadow p-6',
card?.bgColor === 'pink' && 'bg-pink',
card?.bgColor === 'blue' && 'bg-blue',
card?.bgColor === 'peach' && 'bg-peach',
card?.bgColor === 'gradient' && 'gradient-bg'
)}
>
<p className='leading-[1] text-fluid-h3 font-heading text-center uppercase tracking-tight'>
{card?.title}
</p>
<p className='leading-[1] text-fluid-h4 text-center uppercase font-heading tracking-tight'>
{card?.subtitle}
</p>
</div>
))}
</div>
)}
</div>
)}
</div>
</div>
</section>
)
}