import Media from '../shared/Media'
import cn from 'clsx'
import RichContent from '../shared/RichContent'
import AnchorButton from '../shared/AnchorButton'
import isDark from '@/util/isDark'

function chunk(arr, size) {
return arr.reduce((acc, _, i) => {
if (i % size === 0) acc.push(arr.slice(i, i + size))
return acc
}, [])
}

export default function ImageTextBlocks({ data, page }) {
const { title, blocks, mediaAspect, link, isPortraitMobile } = data ?? {}
const landscape = mediaAspect === 'landscape'
const landscapeTall = mediaAspect === 'landscapeTall'
const square = mediaAspect === 'square'

return (
<section className={'relative section'}>
<div
className={cn(
isDark(page?.backgroundColor.value) && '',
landscape && 'pb-24 bg-grey rounded-md overflow-hidden'
)}
>
{title && (
<div className='pt-[74px]'>
<AnchorButton text={title} className={'mb-28'} />
</div>
)}
<div
className={cn(
'flex flex-col gap-y-2.5',
landscape && 'px-5 medium:px-2.5',
!landscape && 'medium:gap-x-2.5'
)}
>
{chunk(blocks, 2)?.map((pair, p) => (
<div
key={p}
className={cn(
!landscape && 'gap-2.5',
landscape &&
'color-change-section dark pt-14 medium:pt-0 pb-20 medium:pb-0 overflow-hidden rounded-md border-white border-2 border-opacity-0 betterhover:hover:border-opacity-100 transition-colors easing duration',
'grid-layout',
''
)}
>
{pair.map((block, b) => (
<div
key={b}
className={cn(
  'col-span-12 medium:col-span-6 relative',
  block?._type === 'textBlock' && 'row-start-1',
  !landscape &&
    !landscapeTall &&
    block?._type === 'textBlock' &&
    'h-0 pt-[100%]'
)}
>
{block?._type === 'mediaBlock' && (
<div className=''>
<div
className={cn(
!landscape && 'rounded-md',
landscape &&
'rounded-md medium:rounded-none px-5 medium:px-0',
'overflow-hidden color-change-section dark w-full'
)}
>
<Media
media={block?.media}
aspect={cn(
landscape
? 'pt-[84%] medium:pt-[56%] rounded-md overflow-hidden medium:rounded-none'
: landscapeTall
? isPortraitMobile
? 'pt-[150%] medium:pt-[84%]'
: 'pt-[84%]'
: isPortraitMobile
? 'pt-[150%] medium:pt-[100%]'
: 'pt-[100%]'
)}
/>
</div>
</div>
)}
{block?._type === 'textBlock' && (
<div
className={cn(
landscape || landscapeTall
? 'medium:absolute medium:inset-0'
: 'absolute inset-0',
'w-full h-full'
)}
>
<div
className={cn(
!landscape &&
'flex items-center justify-center rounded-md',
landscape && 'dark',
'color-change-section w-full h-full overflow-hidden ',
isPortraitMobile
? 'px-8 py-16 medium:py-8'
: 'px-5 medium:px-8 py-8'
)}
>
{block?.content && (
<RichContent
content={block?.content}
className={cn(
landscape &&
'[&_.spacer]:medium:!mb-14 text-center medium:text-left pb-[30px] medium:pb-0 [&_p]:mx-auto',
!landscape && 'text-center [&_p]:mx-auto',
'h-fit [&_p]:max-w-lg'
)}
/>
)}
</div>
</div>
)}
</div>
))}
</div>
))}
</div>
</div>
</section>
)
}
