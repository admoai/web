import cn from 'clsx'

export default function HeaderLogo({ className }) {
  return (
    <svg
      className={cn(className)}
      width='60'
      height='45'
      viewBox='0 0 60 45'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        className='transition-colors easing duration'
        d='M13.727 0.935547L0.746094 43.6341L0.746094 44.4381L17.5208 44.4381L20.06 4.80597H21.5762L24.1019 44.4381L40.8755 44.4381V43.6306L27.8956 0.935547H13.727Z'
        fill='#EBE9DC'
      />
      <path
        d='M43.7562 44.4381L30.5847 0.935547H45.7665L59.9225 44.4381H43.7562Z'
        fill='#EBE9DC'
        className='transition-colors easing duration'
      />
    </svg>
  )
}
