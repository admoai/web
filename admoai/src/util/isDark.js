export default function isDark(hex) {
  if (!hex) return
  hex = hex?.replace('#', '')
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return brightness < 128
}
