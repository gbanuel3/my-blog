import { Box, Button, Text, useColorMode, Flex, Heading, Image, VStack } from '@chakra-ui/react'
import { colors } from '@/constants'

function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex
      bg={colors[colorMode].bg_color}
      p={{ base: 4, md: 8 }} // Padding responsive values
      align="center" // Vertically center the contents
      justify="space-between" // Spread the child components
    >
      <Box>
        <Heading as="h1" size="2xl" mb={2} color={colors[colorMode].header_text}>
          Welcome, I&#39;m Gil
        </Heading>
        <Text fontSize="2xl" color={colors[colorMode].text_color}>
          Recent Computer Science graduate and aspiring Software Engineer. I&#39;ve created this space to document my post-grad journey and to share my various hobbies! 
        </Text>
      </Box>
      <Image
        src="/climber.png" // Replace with the path to your illustration
        htmlWidth="200px" // Set the width of the illustration
        htmlHeight="auto" // Keep the aspect ratio of the illustration
        alt="Rock Climbing"
      />
    </Flex>
  );
}

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <VStack fontSize="xl" p={5} bg={colors[colorMode].bg_color}>
      <Header />
    </VStack>
  )
}
