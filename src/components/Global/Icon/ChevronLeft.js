import cn from 'clsx'

export default function ChevronLeft ({ flip = false, className, ...props }) {
  return (
    <svg viewBox='0 0 6 11' fill='none' xmlns='http://www.w3.org/2000/svg' {...props} className={cn(className, flip && 'rotate-180')}>
      <path d='M-4.17213e-07 5.5L5.26316 10.5L6 9.8L1.47368 5.5L6 1.2L5.26316 0.5L-4.17213e-07 5.5Z' fill='currentColor' />
    </svg>
  )
}
