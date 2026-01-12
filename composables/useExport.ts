import type { ExportSize } from '~/types/icon'

// PNG Export
export function useExport() {
  const exportToPNG = async (
    svgElement: SVGElement,
    size: ExportSize,
    color: string,
    secondaryColor?: string
  ): Promise<Blob | null> => {
    try {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size

      const ctx = canvas.getContext('2d')
      if (!ctx) return null

      ctx.clearRect(0, 0, size, size)

      const svgClone = svgElement.cloneNode(true) as SVGElement
      svgClone.setAttribute('width', size.toString())
      svgClone.setAttribute('height', size.toString())

      const svgString = new XMLSerializer().serializeToString(svgClone)
      const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svg)

      return new Promise((resolve) => {
        const img = new Image()
        
        img.onload = () => {
          ctx.drawImage(img, 0, 0, size, size)
          URL.revokeObjectURL(url)
          canvas.toBlob((blob) => resolve(blob), 'image/png')
        }

        img.onerror = () => {
          URL.revokeObjectURL(url)
          resolve(null)
        }

        img.src = url
      })
    } catch (error) {
      console.error('Export error:', error)
      return null
    }
  }

  const downloadBlob = (blob: Blob, filename: string): void => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = async (blob: Blob): Promise<boolean> => {
    try {
      if (!navigator.clipboard?.write) return false
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      return true
    } catch {
      return false
    }
  }

  return {
    exportToPNG,
    downloadBlob,
    copyToClipboard
  }
}
