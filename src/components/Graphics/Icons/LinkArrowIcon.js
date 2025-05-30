import cn from 'clsx'
import ExternalLinkArrowIcon from './ExternalLinkArrowIcon'

export default function LinkArrowIcon ({ className }) {
  return (
    <svg className={className} width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M9.43359 4L13.0006 8L9.43359 12' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M3 8L12.8951 8.00001' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
    </svg>
  )
}

const sharedClasses = 'absolute top-1/2 left-1/2 -translate-y-1/2 left-1/2 -translate-y-1/2 transition-transform easing duration'

export function AnimatedLinkArrowIcon ({ className, ...rest }) {
  return (
    <span
      className={cn(
        'text-[var(--foreground)] betterhover:group-hover:text-[var(--hover-foreground)]',
        'overflow-hidden relative flex items-center justify-center w-4 h-4 transition-colors duration easing',
        className
      )}
      {...rest}
    >
      <LinkArrowIcon className={cn(sharedClasses, '-translate-x-1/2 betterhover:group-hover:translate-x-8')} />
      <LinkArrowIcon className={cn(sharedClasses, '-translate-x-8 betterhover:group-hover:-translate-x-1/2')} />
    </span>
  )
}

export function AnimatedExternalLinkArrowIcon ({ className, ...rest }) {
  return (
    <span
      className={cn(
        'text-[var(--foreground)] betterhover:group-hover:text-[var(--hover-foreground)]',
        'overflow-hidden relative flex items-center justify-center w-3 h-3 transition-colors duration easing',
        className
      )}
      {...rest}
    >
      <ExternalLinkArrowIcon className={cn(sharedClasses, 'w-3 h-3 -translate-x-1/2 betterhover:group-hover:translate-x-8')} />
      <ExternalLinkArrowIcon className={cn(sharedClasses, 'w-3 h-3 -translate-x-8 betterhover:group-hover:-translate-x-1/2')} />
    </span>
  )
}
