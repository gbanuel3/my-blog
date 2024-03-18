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

function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const stackDirection = useBreakpointValue<'column' | 'row'>({
    base: 'column',
    md: 'row',
  })
  const isBaseLayout = useBreakpointValue({ base: true, md: false })
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
        <Heading as="h1" size="2xl" mb={2} color={colors[colorMode].header_text}>
          Welcome, I&#39;m Gil
        </Heading>
        <Text fontSize="xl" color={colors[colorMode].text_color}>
          Recent Computer Science graduate and aspiring Software Engineer. I&#39;ve
          created this space to document my post-grad journey and to share my various
          hobbies!
        </Text>
      </Box>
    </Stack>
  )
}

function LatestPosts() {
  const [user, setUser] = useState(null)
  const userId = 1

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query GetUser($id: Int!) {
              getUser(id: $id) {
                id
                name
                email
              }
            }
          `,
          variables: { id: userId },
        }),
      })

      const { data } = await response.json()
      setUser(data.getUser)
    }

    fetchData()
  }, [userId])

  return <></>
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
      </VStack>
    </>
  )
}
