import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { colors, endpoint } from '@/constants'
import {
  Skeleton,
  useColorMode,
  Heading,
  Box,
  Text,
  Button,
  Link,
  VStack,
  SkeletonText,
  Container,
  Divider,
  HStack,
  Avatar,
} from '@chakra-ui/react'
import React from 'react'

const BlogPost = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState<{
    id: string
    title: string
    content: string
    slug: string
    author: {
      id: string
      name: string
    }
    created_at: string
    updated_at: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogFromSlug() {
      setIsLoading(true)
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
            query GetBlogFromSlug($slug: String!) {
              getBlogFromSlug(slug: $slug) {
                id
                title
                content
                slug
                author {
                  id
                  name
                }
                created_at
                updated_at
              }
            }
          `,
            variables: { slug: slug },
          }),
        })

        const { data } = await response.json()
        setPost(data.getBlogFromSlug)
      } catch (error) {
        console.log('Error fetching blog from slug', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogFromSlug()
  }, [slug])

  const textColor = colors[colorMode].text_color
  return (
    <Container maxW="container.md" pt={10}>
      {isLoading ? (
        <VStack spacing={4}>
          <Skeleton height="40px" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </VStack>
      ) : post ? (
        <article>
          <Heading as="h1" size="2xl" mb={4}>
            {post.title}
          </Heading>
          <HStack justifyContent="space-between" mb={8}>
            <HStack>
              <Avatar name={post.author?.name} src="/favicon.ico" size={'lg'} />
              <VStack align="left">
                <Text fontWeight="bold">{post.author?.name}</Text>
                <Text color="gray.500" fontSize="sm">
                  {new Date(post.created_at).toLocaleDateString()}
                </Text>
              </VStack>
            </HStack>
          </HStack>
          <Divider mb={8} />
          <Box
            className='blog-content'
            color={textColor}
            lineHeight="tall"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      ) : (
        <Box textAlign="center" py={10} px={6} bg={colors[colorMode].bg_color}>
          <Heading as="h2" size="xl" mt={6} mb={2}>
            Sorry, this blog does not exist!
          </Heading>
          <Text color={textColor}>
            The page blog are looking for does not seem to exist, or is coming soon!
          </Text>
          <Button colorScheme="gray" size="lg" mt={4} onClick={() => router.push('/')}>
            Go Home
          </Button>
        </Box>
      )}
    </Container>
  )
}

export default BlogPost
