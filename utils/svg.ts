// SVG Rendering und Manipulation
export const renderSVGPath = (path: string, viewBox: string = '0 0 512 512'): SVGElement => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', viewBox)

  const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  pathElement.setAttribute('d', path)
  pathElement.setAttribute('fill', 'currentColor')

  svg.appendChild(pathElement)
  return svg
}

// Clipp Pfad für Duotone Icons
export const applyDuotoneColors = (
  svgElement: SVGElement,
  primaryColor: string,
  secondaryColor: string
): SVGElement => {
  const paths = svgElement.querySelectorAll('path')

  if (paths.length >= 2) {
    paths[0].setAttribute('fill', primaryColor)
    paths[1].setAttribute('fill', secondaryColor)
  } else if (paths.length === 1) {
    paths[0].setAttribute('fill', primaryColor)
  }

  return svgElement
}

// Exportiere SVG als Data URL
export const svgToDataUrl = (svgElement: SVGElement): string => {
  const serializer = new XMLSerializer()
  const svgString = serializer.serializeToString(svgElement)
  const encoded = encodeURIComponent(svgString)
  return `data:image/svg+xml;charset=utf-8,${encoded}`
}

// Laden von SVG mit Farbe
export const loadSvgWithColor = (path: string, color: string): SVGElement => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 512 512')
  svg.style.color = color

  const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  pathElement.setAttribute('d', path)
  pathElement.setAttribute('fill', 'currentColor')

  svg.appendChild(pathElement)
  return svg
}
