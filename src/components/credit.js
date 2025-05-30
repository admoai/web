'use client'

import { useEffect } from 'react'

export const asciiArt = `
.-. .-..-.   .-..-. .-. 
| | | | \ \_/ )/| | | | 
| | | |  \   (_)| | | | 
| | | |   ) (   | | | | 
| '-')|   | |   | '-')| 
'---(_)  /(_|   '---(_) 
        (__)            
`

// export const htmlAsciiArt = `
// <!--[if lt IE 3]>
// {asciiArt}
//                                                      Site by nightjar.co 🥰
// <![endif]-->
// `

export function useConsoleCredit() {
  useEffect(() => {
    // console.log(
    //   '%c🇵🇸🇵🇸🇵🇸 FREE PALESTINE 🍉🍉🍉',
    //   'font-family:monospace;font-size:20px;line-height:20px;'
    // )
    // console.log(
    //   '%chttps://bdsmovement.net',
    //   'font-family:monospace;font-size:12px;line-height:12px;'
    // )
    console.log(
      '%cSite by Sasha 🥰',
      'color:white;background:black;font-weight:bold;padding:10px'
    )
    console.log(
      `%c${asciiArt}`,
      'font-family:monospace;font-size:8px;line-height:10px;'
    )
  }, [])
}
