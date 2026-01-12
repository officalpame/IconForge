// Icon Types
export interface IconStyle {
  path: string
  // Optional second path for duotone icons
  path2?: string
  // Optional viewBox and dimensions
  viewBox?: number[]
  width?: number
  height?: number
}

export interface Icon {
  id: string
  name: string
  label: string
  unicode: string
  searchTerms: string[]
  styles: {
    solid?: IconStyle
    regular?: IconStyle
    duotone?: IconStyle
  }
}

export type IconStyleType = 'solid' | 'regular' | 'duotone' | 'all'
export type ExportSize = 64 | 128 | 256 | 512
