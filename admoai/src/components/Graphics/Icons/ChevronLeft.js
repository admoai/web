import cn from 'clsx'

export default function ChevronLeft ({ className }) {
  return (
    <svg viewBox='0 0 10 16' fill='none' xmlns='http://www.w3.org/2000/svg' className={cn(className)}>
      <path
        d='M9.13238 1.9027L7.79738 0.575195L0.379883 8.0002L7.80488 15.4252L9.13238 14.0977L3.03488 8.0002L9.13238 1.9027Z'
        fill='currentColor'/>
    </svg>
  )
}
