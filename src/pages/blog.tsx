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
  useBreakpointValue,
  Flex,
  Button,
  Skeleton,
} from '@chakra-ui/react'
import { colors } from '@/constants'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { endpoint } from '@/constants'
import Link from 'next/link'
import { slugify, formatMonthYear } from '.'

const Blog = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const userId = 1
  const [selectedPosts, setSelectedPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAllPosts() {
      setIsLoading(true)
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
            query GetAllPosts {
              getAllPosts {
                id
                title
                content
                author {
                  id
                  name
                }
                created_at
                updated_at
              }
            }
          `
          }),
        })

        const { data } = await response.json()
        setSelectedPosts(data.getAllPosts)
        console.log(selectedPosts)
      } catch (error) {
        console.log('Error fetching posts', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllPosts()
  }, [userId])

  const isSmallLayout = useBreakpointValue({ base: true, md: false })
  const textSize = useBreakpointValue({ base: 'lg', md: 'xl' })
  const yearSize = useBreakpointValue({ base: 'md', md: 'lg' })
  return (
    <Box
      width="100%"
      bg={colors[colorMode].bg_color}
      color={colors[colorMode].text_color}
      p={5}
    >
      <Flex justify="space-between" align="center" mb={5}>
        <Heading as="h1" size={textSize} color={colors[colorMode].header_text}>
          All Posts
        </Heading>
      </Flex>
      <Heading as="h2" size={yearSize} color={colors[colorMode].header_text} mb={"10px"}>
          2024
        </Heading>
      <VStack spacing={0} align="stretch">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                height="20px"
                my="10px"
                bg={colors[colorMode].bg_color}
              />
            ))
          : selectedPosts?.map((post: any, index: number) => (
              <Link href={`/blog/${slugify(post.title)}`} passHref key={post.id}>
                <Box
                  as="a"
                  borderBottom="1px"
                  borderColor={colors[colorMode].border_color}
                  pb={1}
                  mb={1}
                  _hover={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                  sx={{
                    '.post-title': {
                      transition: 'color 0.2s',
                    },
                    '&:hover .post-title': {
                      color: colors[colorMode].header_text,
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <Box
                    borderBottom="1px"
                    borderColor={colors[colorMode].border_color}
                    pb={2}
                    mb={3}
                  >
                    <Flex justify="space-between" align="center">
                      <Text
                        fontSize={textSize}
                        fontWeight="bold"
                        className="post-title"
                        color={colors[colorMode].latest_post_title}
                      >
                        {post.title}
                      </Text>
                      {!isSmallLayout && (
                        <Text
                          fontSize="md"
                          color={colors[colorMode].date_color}
                          className="post-date"
                        >
                          {formatMonthYear(post.created_at)}
                        </Text>
                      )}
                    </Flex>
                  </Box>
                </Box>
              </Link>
            ))}
      </VStack>
    </Box>
  )
}

export default Blog
