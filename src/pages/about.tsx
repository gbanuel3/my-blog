import React from 'react'
import { Box, Container, Heading, Text, Image, VStack } from '@chakra-ui/react'

const About = () => {
  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={10} alignItems="flex-start">
        <Heading as="h1" size="2xl">
          About Us
        </Heading>
        <Image
          borderRadius="full"
          boxSize="150px"
          src="https://via.placeholder.com/150"
          alt="Profile image"
        />
        <Text fontSize="lg">
          I am a passionate professional with a love for technology, design, and creating
          meaningful work. With a background in both development and design, I blend
          aesthetic vision with technical know-how to create seamless digital
          experiences.
        </Text>
        <Text fontSize="lg">
          When I am not coding or pushing pixels, you will find me in the great outdoors or
          indulging my love for seeing live music. I am also an avid reader and enjoy
          exploring the latest in technology trends.
        </Text>
      </VStack>
    </Container>
  )
}

export default About
