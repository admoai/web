import cn from 'clsx'

const Line = ({ className }) => {
  return (
    <span
      className={cn(
        className,
        'block w-full h-px bg-white absolute duration-[var(--duration)] ease transition-transform'
      )}
    />
  )
}
export default function XButton({ className, ...rest }) {
  return (
    <div className={cn('w-3.5 relative', className)} {...rest}>
      <Line className={cn('translate-y-0 rotate-45')} />
      <Line className={cn('translate-y-0 -rotate-45')} />
    </div>
  )
}
