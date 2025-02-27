import { Box, Button, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import { TFontSizeVariant } from '@core/types'

import { EditFontSizeModal } from './EditFontSizeModal'
import { FontSizeRow } from './FontSizeRow'

export function FontSizesSection({
  fontSizeData,
  onUpdateFontSizeData,
}: {
  fontSizeData: TFontSizeVariant[]
  onUpdateFontSizeData: (newFontSizeData: TFontSizeVariant[]) => void
}) {
  const {
    isOpen: isAddVariantModalOpen,
    onOpen: onAddVariantModalOpen,
    onClose: onAddVariantModalClose,
  } = useDisclosure()

  fontSizeData.sort((fontOne, fontTwo) => {
    if (fontOne.unit === fontTwo.unit) return fontOne.value - fontTwo.value
    const fontUnits = ['rem', 'em', 'px']
    return fontUnits.indexOf(fontOne.unit) - fontUnits.indexOf(fontTwo.unit)
  })

  return (
    <Box>
      <Heading fontSize={28} fontWeight="black">
        Font Sizes
      </Heading>
      <Stack css={{ marginTop: '24px' }} spacing={12}>
        {fontSizeData.map((fontSizeVariant, index) => {
          return (
            <FontSizeRow
              key={`${index}-${fontSizeVariant.name}`}
              fontSizeData={fontSizeVariant}
              onUpdateFontSizeVariant={(
                updatedFontSizeData: TFontSizeVariant
              ) => {
                const newFontSizeData = [...fontSizeData]
                const fontSizeIndex = fontSizeData.findIndex(
                  (ec) => ec.name === fontSizeVariant.name
                )
                newFontSizeData[fontSizeIndex] = updatedFontSizeData

                onUpdateFontSizeData(newFontSizeData)
              }}
              onDeleteFontSizeVariant={() => {
                const newFontSizeData = fontSizeData.filter(
                  (v) => v.name !== fontSizeVariant.name
                )

                onUpdateFontSizeData(newFontSizeData)
              }}
            />
          )
        })}
        <Button
          css={{ height: '50px', fontSize: '18px', fontWeight: 'bold' }}
          onClick={() => onAddVariantModalOpen()}
        >
          Add New Font Size
        </Button>
      </Stack>
      <EditFontSizeModal
        isAdding={true}
        isOpen={isAddVariantModalOpen}
        onClose={onAddVariantModalClose}
        onUpdateFontSizeVariant={(newVariant: TFontSizeVariant) => {
          const updatedFontSizeData = [...fontSizeData, newVariant]
          onUpdateFontSizeData(updatedFontSizeData)
        }}
      />
    </Box>
  )
}
