import HeaderLogo from '../Graphics/HeaderLogo'
import cn from 'clsx'

export default function AnchorButton({ text, className }) {
  return (
    <div className={cn(className, 'anchor-button')}>
      <HeaderLogo className={'icon-logo w-[22px]'} />
      <span className='text-fluid-body'>{text}</span>
    </div>
  )
}
