/** @type {import('tailwindcss').Config} */

const screens = require('./src/theme/screens.js')
const colors = require('./src/theme/colors.js')
const zIndex = require('./src/theme/zIndex')
const fontSize = require('./src/theme/fontSizes')
const breakpoints = require('./src/theme/breakpoints.js')
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens,
    colors,
    zIndex,
    extend: {
      screens: {
        betterhover: { raw: '(hover: hover)' }
      },
      fontSize,
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        heading: ['var(--font-heading)', ...defaultTheme.fontFamily.serif]
      },
      animation: {
        fade: 'fadeIn 0.5s ease-in forwards'
      },
      keyframes: () => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }),
      boxShadow: {
        custom: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: [
    plugin(function ({ matchUtilities, theme, addUtilities }) {
      matchUtilities(
        {
          gutter: (value) => {
            const prefix = value === 'm' ? 'margin' : 'padding'
            return {
              [`${prefix}-right`]: theme('spacing')[5],
              [`${prefix}-left`]: theme('spacing')[5],
              [`@media (min-width: ${theme('screens').md.min})`]: {
                [`${prefix}-right`]: theme('spacing')[11],
                [`${prefix}-left`]: theme('spacing')[11]
              }
            }
          }
        },
        {
          values: {
            m: 'm',
            p: 'p'
          }
        }
      )
      addUtilities({
        '.max-content': {
          'max-width': `${breakpoints['max-content']}px`,
          width: '100%',
          'margin-left': 'auto',
          'margin-right': 'auto'
        },
        '.max-content-p': {
          'max-width': `calc(${breakpoints['max-content']}px - ${
            theme('spacing')[11]
          } - ${theme('spacing')[11]})`,
          'margin-left': 'auto',
          'margin-right': 'auto',
          width: '100%'
        },
        '.full-width': {
          'margin-left': `-${theme('spacing')[5]}`,
          'margin-right': `-${theme('spacing')[5]}`,
          [`@media (min-width: ${theme('screens').md.min})`]: {
            'margin-left': `-${theme('spacing')[11]}`,
            'margin-right': `-${theme('spacing')[11]}`
          },
          [`@media (min-width: ${breakpoints['max-content']}px)`]: {
            'margin-left': `calc(-1 * (((100vw - var(--scrollbarWidth) - ${
              breakpoints['max-content']
            }px) / 2) + ${theme('spacing')[11]}))`,
            'margin-right': `calc(-1  * (((100vw - var(--scrollbarWidth) - ${
              breakpoints['max-content']
            }px) / 2) + ${theme('spacing')[11]}))`
          }
        }
      })
    })
  ]
}
