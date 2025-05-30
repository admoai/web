import { Box, Card, Flex, Heading, Inline, Text } from '@sanity/ui'
import React from 'react'
function NoteField(props) {
  const { options } = props.schemaType
  const { icon, headline, message, tone } = options
  const CustomIcon = icon
  return (
    <Card padding={[3, 3, 4]} radius={3} shadow={1} tone={tone || 'primary'}>
      {headline && (
        <Box marginBottom={3}>
          <Inline space={[1]}>
            {icon && <CustomIcon />}
            <Heading size={1}>{headline}</Heading>
          </Inline>
        </Box>
      )}
      <Flex align='center'>
        {icon && !headline && <CustomIcon />}
        <Box marginLeft={!headline ? 4 : 0}>
          {headline && <Text size={[1, 1, 1]}>{message}</Text>}
          {!headline && <Heading size={1}>{message}</Heading>}
        </Box>
      </Flex>
    </Card>
  )
}
export default NoteField
