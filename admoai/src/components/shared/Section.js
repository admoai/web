import cn from 'clsx'
import { forwardRef } from 'react'

export const gutterPaddingClasses = {
  none: '',
  sm: 'px-5 md:px-10',
  lg: 'px-5 md:px-[2.8125rem]'
}

const Section = forwardRef(
  (
    {
      className,
      as: Component = 'section',
      grid = false,
      width = 'w-auto',
      contain = false,
      fullWidth = false,
      bottomMargin = true,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          className,
          width,
          grid && 'grid-layout',
          contain && 'max-content gutter-p',
          fullWidth && 'full-width',
          bottomMargin && 'mb-16 md:mb-28'
        )}
        {...props}
      />
    )
  }
)
Section.displayName = 'Section'
export default Section
