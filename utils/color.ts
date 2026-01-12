// SVG zu Canvas Konvertierung
export const svgToCanvas = async (
  svgElement: SVGElement,
  width: number,
  height: number
): Promise<Canvas | null> => {
  try {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    // Transparenter Hintergrund
    ctx.clearRect(0, 0, width, height)

    return canvas
  } catch (error) {
    console.error('Fehler bei SVG zu Canvas Konvertierung:', error)
    return null
  }
}

// Validiere Hex-Farbe
export const isValidHexColor = (hex: string): boolean => {
  return /^#[0-9A-F]{6}$/i.test(hex)
}

// Konvertiere Hex zu RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

// Konvertiere RGB zu Hex
export const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
      .toUpperCase()
  )
}
