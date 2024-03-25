import React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Link,
  Image,
} from "@chakra-ui/react"

const About = () => {
  return (
    <Container maxW="container.md" py={10}>
      <Heading as="h1" mb={6}>
        About Me
      </Heading>
      <Text fontSize="lg" mb={4}>
        Hi there! I&#39;m Gildardo Banuelos, an enthusiast of all things technology. In December
        2023, I completed my Computer Science degree at MIT, marking the end of an
        educational journey filled with significant learning and hands-on experience.
      </Text>
      <Text fontSize="lg" mb={4}>
        My time at MIT was complemented with internships at Meta, Morgan Stanley, and
        Google. These experiences allowed me to hone my skills in software engineering,
        work with incredible mentors, and contribute to impactful projects.
      </Text>
      <Text fontSize="lg" mb={4}>
        When I&#39;m not diving into code, you can find me working on new chess strategies,
        playing poker with friends, or experimenting with new technical development
        projects. I&#39;m also an avid runner, lifter, and rock climber, activities that keep my
        energy levels high and my focus sharp.
      </Text>
      <Text fontSize="lg" mb={4}>
        I&#39;ve created this space to share my thoughts, experiences, and projects with the world.
        Maybe I&#39;ll inspire someone else to do the same. If you have any questions or comments, feel 
        free to contact me via email or any of my social media profiles. 
      </Text>

      <Heading as="h2" size="lg" mt={10} mb={4}>
        Publications
      </Heading>
      <UnorderedList>
        <ListItem>
          <Link
            href="https://courses.csail.mit.edu/6.857/2022/projects/Dave-Johnson-Banuelos-Seeyave.pdf"
            isExternal
            color="blue.500"
          >
            Flood and Loot Attack - Lightning Network
          </Link>
        </ListItem>
      </UnorderedList>
    </Container>
  )
}

export default About
