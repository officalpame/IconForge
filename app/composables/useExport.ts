// Composable für PNG-Export
export const useExport = () => {
  const exportToPNG = (
    svgElement: SVGElement,
    size: number,
    color: string,
    secondaryColor?: string
  ): Promise<Blob | null> => {
    return new Promise((resolve) => {
      try {
        // Erstelle Canvas
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(null)
          return
        }

        // Transparenter Hintergrund
        ctx.clearRect(0, 0, size, size)

        // Konvertiere SVG zu Datenbild
        const svgString = new XMLSerializer().serializeToString(svgElement)
        const svg = new Blob([svgString], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(svg)

        // Lade SVG-Bild
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0, size, size)
          URL.revokeObjectURL(url)

          // Konvertiere zu PNG
          canvas.toBlob((blob) => {
            resolve(blob)
          }, 'image/png')
        }
        img.onerror = () => {
          URL.revokeObjectURL(url)
          resolve(null)
        }
        img.src = url
      } catch (error) {
        console.error('Fehler beim PNG-Export:', error)
        resolve(null)
      }
    })
  }

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = (blob: Blob): Promise<boolean> => {
    return new Promise(async (resolve) => {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ])
        resolve(true)
      } catch (error) {
        console.error('Fehler beim Kopieren in Zwischenablage:', error)
        resolve(false)
      }
    })
  }

  return {
    exportToPNG,
    downloadBlob,
    copyToClipboard
  }
}
