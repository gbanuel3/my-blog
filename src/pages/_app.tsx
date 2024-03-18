import { ChakraProvider, VStack, ColorModeScript, Container } from '@chakra-ui/react'
import { ComponentType } from 'react'
import GlobalStyle from '@/styles/global_style'
import Theme from '@/styles/theme'
import NavigationBar from '@/components/navigation_bar'

function MyApp({
  Component,
  pageProps,
}: {
  Component: ComponentType<any>
  pageProps: any
}) {
  return (
    <ChakraProvider theme={Theme}>
      <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
      <GlobalStyle />
      <Container maxW="800px">
        <NavigationBar />
        <VStack spacing={8} width="100%">
          <Component {...pageProps} />
        </VStack>
      </Container>
    </ChakraProvider>
  )
}

export default MyApp
