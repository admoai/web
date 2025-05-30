import A11yEmoji from 'a11y-react-emoji'
import React from 'react'

const Emoji = ({ symbol, size = '2em' }) => (
  <>
    <A11yEmoji symbol={symbol} style={{ fontSize: size }} />
    <svg aria-hidden style={{ display: 'none' }} /> {/* disable the border in sanity */}
  </>
)

export default Emoji
