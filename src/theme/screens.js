const breakpoints = require('./breakpoints')

module.exports = {
  xxs: { min: `${breakpoints.xxs}px` },
  xs: { min: `${breakpoints.xs}px` },
  sm: { min: `${breakpoints.sm}px` },
  md: { min: `${breakpoints.md}px` },
  medium: { min: `${breakpoints.medium}px` },
  mediumLarge: { min: `${breakpoints.mediumLarge}px` },
  'max-content': { min: `${breakpoints['max-content']}px` },
  lg: { min: `${breakpoints.lg}px` },
  xl: { min: `${breakpoints.xl}px` },
  xxl: { min: `${breakpoints.xxl}px` }
}
