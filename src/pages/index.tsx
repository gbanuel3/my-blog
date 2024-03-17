import { Box, Button, Text, useColorMode } from '@chakra-ui/react'

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box textAlign="center" fontSize="xl" p={5}>
      <Text>Welcome to your Chakra + Next.js project!</Text>
      <Button onClick={toggleColorMode} mt={4}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </Box>
  )
}
