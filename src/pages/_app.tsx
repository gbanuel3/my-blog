import { ChakraProvider, VStack, ColorModeScript, Container } from '@chakra-ui/react'
import { ComponentType } from 'react'
import GlobalStyle from '@/styles/global_style'
import Theme from '@/styles/theme'
import NavigationBar from '@/components/navigation_bar'
import SocialMedia from '@/components/social_media'
import React from 'react'
import DefaultMetaTags from '@/components/DefaultMetaTags'

function MyApp({
  Component,
  pageProps,
}: {
  Component: ComponentType<any>
  pageProps: any
}) {
  return (
    <React.StrictMode>
        <ChakraProvider theme={Theme}>
          <DefaultMetaTags />
          <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
          <GlobalStyle />
          <Container maxW="800px">
            <NavigationBar />
            <VStack spacing={8} width="100%">
              <Component {...pageProps} />
            </VStack>
            <SocialMedia />
          </Container>
        </ChakraProvider>
    </React.StrictMode>
  )
}

export default MyApp
