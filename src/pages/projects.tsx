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
  useColorMode,
  useBreakpointValue,
  Flex,
  Button,
  Grid,
  Skeleton,
} from '@chakra-ui/react'
import { colors } from '@/constants'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { endpoint } from '@/constants'
import Link from 'next/link'
import { formatMonthYear } from '.'

const Projects = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const [selectedProjects, setSelectedProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const userId = 1

  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true)
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
            query GetAllProjects {
              getAllProjects {
                id
                releaseDate
                name
                description
                sourceUrl
                demoUrl
                articleUrl
                favoritesCount
                author {
                  id
                  name
                }
                is_hightlighted
              }
            }
          `,
          }),
        })

        const { data } = await response.json()
        setSelectedProjects(data.getAllProjects)
        console.log(selectedProjects)
      } catch (error) {
        console.log('Error fetching projects', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [userId])


  const textSize = useBreakpointValue({ base: 'lg', md: 'xl' })
  const btnSize = useBreakpointValue({ base: 'lg', md: 'md' })
  return (
    <Box p={5} color="white" mt={'25px'}>
      <Flex justify="space-between" align="center" mb={5}>
        <Heading as="h1" size={textSize} color={colors[colorMode].header_text}>
          All Projects
        </Heading>
      </Flex>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={3}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                height="20px"
                my="10px"
                bg={colors[colorMode].bg_color}
              />
            ))
          : selectedProjects.map((project: any, index: any) => (
              <VStack
                key={index}
                p={5}
                borderRadius="lg"
                align="flex-start"
                spacing={4}
                boxShadow="lg"
                bg={colors[colorMode].project_box_color}
                width="100%"
              >
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color={colors[colorMode].project_year}
                >
                  {formatMonthYear(project?.releaseDate)}
                </Text>
                <Link href={project.sourceUrl} passHref key={project.id}>
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color={colors[colorMode].project_title}
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {project?.name}
                  </Text>
                </Link>
                <Text
                  fontSize="md"
                  color={colors[colorMode].project_description}
                  noOfLines={3}
                  lineHeight={'tight'}
                >
                  {project?.description}
                </Text>
                <Flex gap={'3px'} align={'center'}>
                  <Button
                    as={Link}
                    href={`${project.sourceUrl}`}
                    isDisabled={!project?.sourceUrl}
                    colorScheme="gray"
                    size={btnSize}
                  >
                    Source
                  </Button>
                  <Button
                    as={Link}
                    href={`/blog/${project.articleUrl}`}
                    isDisabled={!project?.articleUrl}
                    colorScheme="gray"
                    size={btnSize}
                  >
                    Article
                  </Button>
                  <Button
                    as={Link}
                    href={`${project.demoUrl}`}
                    isDisabled={!project?.demoUrl}
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

export default Projects
