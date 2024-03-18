import { Box, Button, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { colors } from '@/constants'

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box textAlign="center" fontSize="xl" p={5} bg={colors[colorMode].bg_color}>
      <Text>Welcome to your Chakra + Next.js project! Test Deployment!</Text>
    </Box>
  )
}
