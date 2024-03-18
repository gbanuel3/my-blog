import React from 'react'
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  useColorModeValue,
  Container,
  useColorMode,
} from '@chakra-ui/react'
import { colors } from '@/constants'
import Head from 'next/head'

const Blog = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.800', 'gray.100')

  return (
    <>
      <Head>
        <title>Blog | Gil</title>
      </Head>
      <Container maxW="container.lg" p={4} bg={colors[colorMode].bg_color}>
        <VStack spacing={8} alignItems="center" w="full">
          <Heading as="h1" size="xl" mb={4}>
            Blog Posts
          </Heading>
          {[1, 2, 3].map((post) => (
            <Box key={post} p={5} shadow="md" borderWidth="1px" bg={bgColor} w="full">
              <Heading fontSize="xl">Post Title {post}</Heading>
              <Text mt={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </Text>
              <HStack mt={4}>
                <Tag colorScheme="blue">React</Tag>
                <Tag colorScheme="red">Chakra UI</Tag>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Container>
    </>
  )
}

export default Blog
