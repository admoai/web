import cn from 'clsx'

export default function DownloadIcon ({ className }) {
  return (
    <svg viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' className={cn(className, 'w-4')}>
      <path d='M9.9987 6H12.6654L7.9987 10.6667L3.33203 6H5.9987V2H9.9987V6ZM3.33203 13.3333V12H12.6654V13.3333H3.33203Z' fill='currentColor'/>
    </svg>
  )
}
