import { TTokens } from '@core/types'
import { getKeys } from '@core/utils/getKeys'

import { sanitizeName } from './sanitizeName'

export const toCss = ({ colorData, typography, shadows }: TTokens): string => {
  const content = [':root {']

  colorData.forEach((color) => {
    if (color.baseColor) {
      content.push(`  --color-${sanitizeName(color.name)}: ${color.baseColor};`)
    }

    getKeys(color.variants).forEach((key) => {
      if (color.variants[key]) {
        content.push(
          `  --color-${sanitizeName(color.name)}-${sanitizeName(key)}: ${
            color.variants[key]
          };`
        )
      }
    })
  })

  typography.fontSizes.forEach((fontSize) => {
    content.push(
      `  --font-size-${sanitizeName(fontSize.name)}: ${fontSize.value}${
        fontSize.unit
      };`
    )
  })

  shadows.forEach((shadow) => {
    content.push(
      `  --box-shadow-${sanitizeName(shadow.name)}: ${shadow.value};`
    )
  })

  content.push(`}`)

  return content.join('\n')
}
