import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Autoplay, Pagination } from 'swiper/modules'
import cn from 'clsx'
import Media from './Media'
import RichContent from './RichContent'

export const Slider = ({ slides, fullHeight = false }) => {
return (
<Swiper
loop={true}
autoplay={{
delay: 4000,
disableOnInteraction: true
}}
pagination={{ clickable: true }}
// effect={'fade'}
modules={[Autoplay, Pagination]}
>
{slides?.map((slide, k) => (
<SwiperSlide key={k} className={cn(slide?.content ? 'pb-20' : 'py-20')}>
{slide?.content && (
<RichContent
content={slide?.content}
className={cn('text-current text-center mb-10 medium:mb-20 px-5')}
/>
)}
<div className='max-w-md min-w-[448px] mx-auto flex flex-col medium:flex-row justify-center relative gap-y-8 '>
{slide?.mediaOverlay && (
<div className='max-w-md min-w-[448px]'>
<Media
originalDimensions
media={slide?.mediaOverlay}
className='box-shadow rounded-md border-2 border-black overflow-hidden'
inlineVideo
/>
</div>
)}
{slide?.popupCards && (
<div className='relative medium:absolute inset-0 w-full'>
{slide?.popupCards?.map((card, k) => (
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
</SwiperSlide>
))}
</Swiper>
)
}