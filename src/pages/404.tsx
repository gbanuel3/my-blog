import { Box, Heading, Text, Button, useColorMode } from '@chakra-ui/react';
import { colors } from '@/constants';
import Link from 'next/link';

export default function Custom404() {
     const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box textAlign="center" py={10} px={6} bg={colors[colorMode].bg_color}>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        404 - Page Not Found
      </Heading>
      <Text color={'gray.500'}>
        The page you're looking for does not seem to exist.
      </Text>
      <Button colorScheme="teal" size="lg" mt={4}>
        <Link href="/">Go Home</Link>
      </Button>
    </Box>
  );
}