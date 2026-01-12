// Color Utils
export function useColor() {
  const validateHex = (hex: string): boolean => {
    return /^#[0-9A-F]{6}$/i.test(hex)
  }

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    if (!validateHex(hex)) return null
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b]
      .map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
      .toUpperCase()
  }

  return {
    validateHex,
    hexToRgb,
    rgbToHex
  }
}
