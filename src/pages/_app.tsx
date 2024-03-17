import { ChakraProvider } from '@chakra-ui/react'
import { ComponentType } from 'react'
import GlobalStyle from '@/styles/GlobalStyle'

function MyApp({
  Component,
  pageProps,
}: {
  Component: ComponentType<any>
  pageProps: any
}) {
  return (
    <ChakraProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
