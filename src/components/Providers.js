'use client'
import { Provider } from 'jotai'

import ScrollProvider from './ScrollProvider'

export default function Providers({ children }) {
  return (
    <ScrollProvider>
      <Provider>{children}</Provider>
    </ScrollProvider>
  )
}
