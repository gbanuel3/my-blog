import React from 'react'
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  VStack,
  useColorModeValue,
  Container,
  Heading,
  useColorMode
} from '@chakra-ui/react'
import { colors } from '@/constants'

const ProjectsPage = () => {
    const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.800', 'gray.100')

  return (
    <Container maxW="container.lg" p={4} bg={colors[colorMode].bg_color}>
      <VStack spacing={8} alignItems="center" w="full">
        <Heading as="h1" size="xl" mb={4}>
          Projects
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {[1, 2, 3, 4].map((project) => (
            <Box
              key={project}
              p={5}
              shadow="md"
              borderWidth="1px"
              bg={bgColor}
              maxW="sm"
              borderRadius="lg"
            >
              <Image
                borderRadius="lg"
                src={`https://via.placeholder.com/400x200?text=Project+${project}`}
                alt={`Project ${project}`}
              />
              <Text mt={2} fontSize="xl" color={textColor} fontWeight="semibold">
                Project {project}
              </Text>
              <Text mt={2} color={textColor}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default ProjectsPage
