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
  Grid,
  Spacer,
  HStack,
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

function formatMonthDayYear(dateString: string): string {
  const date = new Date(dateString)

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  return formatter.format(date)
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
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
      direction={stackDirection}
      bg={colors[colorMode].bg_color}
      p={{ base: 4, md: 8 }}
      align="center"
      spacing={4}
    >
      <Image
        src="/climber.png"
        boxSize={{ base: '150px', md: '200px' }}
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
              <Skeleton
                key={index}
                height="20px"
                my="10px"
                bg={colors[colorMode].bg_color}
              />
            ))
          : selectedRecentPosts?.map((post: any, index: number) => (
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
  const { colorMode, toggleColorMode } = useColorMode()

  const [selectedHighlights, setSelectedHighlights] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const userId = 1

  useEffect(() => {
    async function fetchHighlights() {
      setIsLoading(true)
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
            query GetHighlights {
              getHighlights {
                id
                title
                content
                author {
                  id
                  name
                }
                created_at
                updated_at
                icon
              }
            }
          `,
          }),
        })

        const { data } = await response.json()
        setSelectedHighlights(data.getHighlights)
      } catch (error) {
        console.log('Error fetching highlights', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHighlights()
  }, [userId])

  const textSize = useBreakpointValue({ base: 'lg', md: 'xl' })
  return (
    <Box
      background={colors[colorMode].bg_color}
      borderRadius="lg"
      p={4}
      width={'100%'}
      mb={'2px'}
    >
      <Flex justify="space-between" mb={5}>
        <Heading as="h1" size={textSize} color={colors[colorMode].header_text}>
          Highlights
        </Heading>
        <Spacer />
      </Flex>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
        gap={4}
        color={colors[colorMode].grid_color}
        alignItems="stretch" // Add this to stretch the items vertically
        gridAutoRows="1fr" // This makes the rows have equal height
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                height="20px"
                my="10px"
                bg={colors[colorMode].bg_color}
              />
            ))
          : selectedHighlights?.map((item: any, index: any) => (
              <Link href={`/blog/${slugify(item.title)}`} passHref key={item.id}>
                <HStack
                  as="a"
                  key={index}
                  align="center"
                  justify="left"
                  p={2}
                  background={colors[colorMode].bg_color}
                  borderRadius="lg"
                  spacing={4}
                  border="0.5px solid"
                  borderColor={colors[colorMode].grid_color}
                  width="100%"
                  height="100%"
                  _hover={{ textDecoration: 'none' }}
                  sx={{
                    '.grid-title': {
                      transition: 'color 0.2s',
                    },
                    '&:hover .grid-title': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <Image
                    src={item.icon}
                    boxSize={{ base: '40px', md: '60px' }}
                    objectFit="cover"
                    alt="Photo Icon"
                    ml={"3px"}
                  />
                  <VStack spacing={0} align="start">
                    <Text fontSize="sm" color={colors[colorMode].grid_date}>
                      {formatMonthDayYear(item.created_at)}
                    </Text>
                    <Text
                      fontSize={textSize}
                      className="grid-title"
                      fontWeight="500"
                      color={colors[colorMode].grid_text}
                      _hover={{ textDecoration: 'underline' }}
                    >
                      {item.title}
                    </Text>
                  </VStack>
                </HStack>
              </Link>
            ))}
      </Grid>
    </Box>
  )
}

function Projects() {
  const { colorMode, toggleColorMode } = useColorMode()
  const projects = [
    {
      year: 'May 2024',
      title: 'Blockchain Voting',
      description: 'Host an election using blockchain technology',
    },
    {
      year: 'May 2024',
      title: 'Blockchain Voting',
      description: 'Host an election using blockchain technology',
    },
    {
      year: 'May 2024',
      title: 'Blockchain Voting',
      description: 'Host an election using blockchain technology',
    },
    {
      year: 'May 2024',
      title: 'Blockchain Voting',
      description: 'Host an election using blockchain technology',
    },
    {
      year: 'May 2024',
      title: 'Blockchain Voting',
      description: 'Host an election using blockchain technology',
    },
    {
      year: 'May 2024',
      title: 'Blockchain Voting',
      description: 'Host an election using blockchain technology',
    },
  ]
  const textSize = useBreakpointValue({ base: 'lg', md: 'xl' })
  const btnSize = useBreakpointValue({ base: 'md', md: 'xs' })
  return (
    <Box p={5} color="white">
      <Flex justify="space-between" align="center" mb={5}>
        <Heading as="h1" size={textSize} color={colors[colorMode].header_text}>
          Projects
        </Heading>
        <Button as={Link} href="/projects" colorScheme="gray">
          View all
        </Button>
      </Flex>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={3}>
        {projects.map((project, index) => (
          <VStack
            key={index}
            p={5}
            borderRadius="lg"
            align="flex-start"
            spacing={4}
            boxShadow="lg"
            bg={colors[colorMode].project_box_color}
          >
            <Text
              fontSize="lg"
              fontWeight="bold"
              color={colors[colorMode].project_year}
            >
              {project.year}
            </Text>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={colors[colorMode].project_title}
            >
              {project.title}
            </Text>
            <Text fontSize="md" color={colors[colorMode].project_description}>
              {project.description}
            </Text>
            <Flex gap={'3px'} align={'center'}>
              <Button
                as={Link}
                href="/blog/"
                isDisabled={false}
                colorScheme="gray"
                size={btnSize}
              >
                Source
              </Button>
              <Button
                as={Link}
                href="/blog"
                isDisabled={false}
                colorScheme="gray"
                size={btnSize}
              >
                Article
              </Button>
              <Button
                as={Link}
                href="/blog"
                isDisabled={false}
                colorScheme="gray"
                size={btnSize}
              >
                Demo
              </Button>
            </Flex>
          </VStack>
        ))}
      </Grid>
    </Box>
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
        <Projects />
      </VStack>
    </>
  )
}
