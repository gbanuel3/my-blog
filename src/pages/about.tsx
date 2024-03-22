import React from 'react'
import { Box, Container, Heading, Text, Image, VStack } from '@chakra-ui/react'
import Head from 'next/head'

const About = () => {
  return (
    <>
      <Head>
        <title>About | Gil</title>
      </Head>
      <Container maxW="container.lg" py={10}>
        <VStack spacing={10} alignItems="center">
          <Heading as="h1" size="2xl">
            About Me
          </Heading>
          <Image
            borderRadius="full"
            boxSize="150px"
            src="https://via.placeholder.com/150"
            alt="Profile image"
          />
          <Text fontSize="lg">
            Hey there! I&#39;m deeply passionate about the intersection of technology
            and design, and I find immense joy in creating work that&#39;s not just
            meaningful but truly impactful. My love for tech isn&#39;t just about the
            gadgets and software; it&#39;s about how these tools can transform ideas
            into tangible outcomes that resonate with people.
          </Text>
          <Text fontSize="lg">
            When I step away from my code editor, you&#39;ll likely find me embracing
            the great outdoors, whether that&#39;s a serene hike, a challenging rock
            climb, or simply enjoying a quiet moment under the sky. But that&#39;s not
            all - I&#39;m a huge fan of live music. There&#39;s something magical about
            experiencing music in its raw, live form that just captivates me.
          </Text>
          <Text fontSize="lg">
            I&#39;m also an avid reader, always on the lookout for the next book that
            will broaden my horizons or deepen my understanding of the latest technology
            trends. And when I&#39;m in the mood for a bit of strategic thinking, I love
            to get lost in a good strategy game. It&#39;s a fantastic way to keep my
            mind sharp and often provides a fresh perspective on problem-solving. Of
            course, staying active is crucial to me, so running and rock climbing are my
            go-tos for physical activity. They&#39;re not just hobbies; they&#39;re part
            of my journey to maintain balance and well-being in a tech-driven world. And
            yes, when the mood strikes, coding for fun is still one of my favorite
            pastimes. There&#39;s always something new to learn, explore, and create in
            the vast world of coding.
          </Text>
        </VStack>
      </Container>
    </>
  )
}

export default About
