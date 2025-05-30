import cn from 'clsx'
import { forwardRef } from 'react'

const family = {
  sans: 'font-sans',
  serif: 'font-serif'
}

// TODO: awaiting Typography style-guide
const defaultSize = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'text-fluid-body',
  note: 'text-fluid-body-small',
  'extra-small': 'text-fluid-extra-small',
  'small-caps': 'text-fluid-body-small uppercase',
  'extra-small-caps': 'text-14 uppercase md:text-13',
  small: 'text-16',
  uc: 'text-12 uppercase' // waiting for design-token to be created in Figma
}

// Apply specific serif vs sans size here;
const typography = {
  sans: {
    ...defaultSize
  },
  serif: {
    ...defaultSize
  }
}

const Text = forwardRef(
  ({ as = 'p', variant = 'sans', size = 'body', className, ...rest }, ref) => {
    const Component = as
    const style = typography[variant][size]
    return (
      <Component
        ref={ref}
        className={cn(style, family[variant], className)}
        {...rest}
      />
    )
  }
)
Text.displayName = 'Text'
export default Text

export const Heading = ({ size, as, ...props }) => {
  return <Text variant='sans' as={as} size={size || as} {...props} />
}
