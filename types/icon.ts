// Icon Types
export interface IconStyle {
  path: string
}

export interface Icon {
  id: number
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

export type IconStyleType = 'solid' | 'regular' | 'duotone'
export type ExportSize = 64 | 128 | 256 | 512
