import { ChakraProvider, VStack, ColorModeScript } from '@chakra-ui/react'
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
      <NavigationBar />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
