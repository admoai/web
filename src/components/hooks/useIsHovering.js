import { primaryInput } from 'detect-it'
import { useCallback, useState } from 'react'

export default function useIsHovering () {
  const [isHovering, setHover] = useState(false)

  const onMouseOver = useCallback(() => setHover(true), [setHover])
  const onMouseLeave = useCallback(() => setHover(false), [setHover])

  const events = primaryInput === 'touch' ? {} : { onMouseOver, onMouseLeave }

  return [isHovering, events]
}
