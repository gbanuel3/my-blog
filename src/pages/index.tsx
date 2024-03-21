require('dotenv').config()
import {
  Box,
  Button,
  Text,
  useColorMode,
  Flex,
  Heading,
  Image,
  VStack,
  useBreakpointValue,
  Stack,
  StackDirection,
} from '@chakra-ui/react'
import { colors, endpoint } from '@/constants'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Skeleton } from '@chakra-ui/react'

function formatMonthYear(dateString: string): string {
  const date = new Date(dateString)

  const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })
  return formatter.format(date)
}

function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const stackDirection = useBreakpointValue<'column' | 'row'>({
    base: 'column',
    md: 'row',
  })
  const isBaseLayout = useBreakpointValue({ base: true, md: false })
  const headerSize = useBreakpointValue({ base: 'xl', md: '2xl' })
  const textSize = useBreakpointValue({ base: 'lg', md: 'xl' })
  return (
    <Stack
      direction={stackDirection} // Stack direction changes based on breakpoint
      bg={colors[colorMode].bg_color}
      p={{ base: 4, md: 8 }}
      align="center"
      spacing={4} // Adjust spacing between items in the stack
    >
      <Image
        src="/climber.png"
        boxSize={{ base: '150px', md: '200px' }} // Adjust the image size responsively
        objectFit="cover"
        alt="Rock Climbing"
        order={isBaseLayout ? 0 : 1}
      />
      <Box textAlign={{ base: 'center', md: 'left' }}>
        <Heading as="h1" size={headerSize} mb={2} color={colors[colorMode].header_text}>
          Welcome, I&#39;m Gil
        </Heading>
        <Text fontSize={textSize} color={colors[colorMode].text_color}>
          Recent Computer Science graduate and aspiring Software Engineer. I&#39;ve
          created this space to document my post-grad journey and to share my various
          hobbies!
        </Text>
      </Box>
    </Stack>
  )
}

function LatestPosts() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [selectedRecentPosts, setSelectedRecentPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const userId = 1

  useEffect(() => {
    async function fetchRecentPosts() {
      setIsLoading(true)
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
            query GetRecentPosts($user_id: Int!) {
              getRecentPosts(user_id: $user_id) {
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
          `,
            variables: { user_id: userId },
          }),
        })

        const { data } = await response.json()
        setSelectedRecentPosts(data.getRecentPosts)
      } catch (error) {
        console.log('Error fetching posts', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentPosts()
  }, [userId])

  const isSmallLayout = useBreakpointValue({ base: true, md: false })
  const textSize = useBreakpointValue({ base: 'lg', md: 'xl' })
  return (
    <Box
      width="100%"
      bg={colors[colorMode].bg_color}
      color={colors[colorMode].text_color}
      p={5}
    >
      <Flex justify="space-between" align="center" mb={5}>
        <Heading as="h1" size={textSize} color={colors[colorMode].header_text}>
          Latest Posts
        </Heading>
        <Button as={Link} href="/blog" colorScheme="gray">
          View all
        </Button>
      </Flex>
      <VStack spacing={0} align="stretch">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} height="20px" my="10px" bg={colors[colorMode].bg_color}/>
            ))
          : selectedRecentPosts?.map((post: any, index: number) => (
              <Link href={`/blog/${post.id}`} passHref key={post.id}>
                <Box
                  as="a" // Make the Box act as an anchor tag
                  borderBottom="1px"
                  borderColor={colors[colorMode].border_color}
                  pb={2}
                  mb={3}
                  _hover={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                  sx={{
                    '.post-title': {
                      transition: 'color 0.2s',
                    },
                    '&:hover .post-title': {
                      color: colors[colorMode].header_text, // Ensure this color is defined
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

function Highlights() {
  return (
    <>
    </>
  )
}

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Head>
        <title>Gil Banuelos</title>
      </Head>
      <VStack fontSize="xl" p={5} bg={colors[colorMode].bg_color}>
        <Header />
        <LatestPosts />
        <Highlights />
      </VStack>
    </>
  )
}
