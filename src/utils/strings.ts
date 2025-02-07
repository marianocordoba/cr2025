/**
 * Generate a color from a string
 *
 * @param value - The string to generate the color from
 * @returns The generated color in #RRGGBB format
 *
 * @example
 * ```ts
 * const color = getColorFromString('Hello, world!')
 * console.log(color) // #fecaca
 * ```
 */
export function getColorFromString(value: string): string {
  const colors = [
    '#fecaca', // Red
    '#fed7aa', // Orange
    '#fde68a', // Yellow
    '#d9f99d', // Lime
    '#bbf7d0', // Green
    '#99f6e4', // Teal
    '#a5f3fc', // Cyan
    '#bfdbfe', // Blue
    '#e9d5ff', // Purple
    '#fbcfe8', // Pink
  ]

  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash)
  }

  const index = Math.abs(hash % colors.length)
  return colors[index]
}

/**
 * Get the significant characters from a string
 *
 * @param value - The string to get the significant characters from
 * @returns The significant characters
 *
 * @example
 * ```ts
 * const characters = getSignificantCharacters('Hello, world!')
 * console.log(characters) // HW
 * ```
 */
export function getSignificantCharacters(value: string): string {
  if (value.length <= 3) {
    return value.toUpperCase()
  }

  return value
    .split(' ')
    .filter((word) => word.length > 3)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
}
