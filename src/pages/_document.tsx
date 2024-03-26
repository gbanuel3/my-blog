import { ColorModeScript } from '@chakra-ui/react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import Theme from '@/styles/theme'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
        <meta name="title" content="Gil Banuelos" />
          <meta name="description" content="Software Engineer + Tech Enthusiast" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://gil.technology/" /> 
          <meta property="og:title" content="Gil Banuelos" />
          <meta property="og:description" content="Software Engineer + Tech Enthusiast" />
          <meta property="og:image" content="https://gil.technology/logo.png" /> 

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://gil.technology/" /> 
          <meta property="twitter:title" content="Gil Banuelos" />
          <meta property="twitter:description" content="Software Engineer + Tech Enthusiast" />
          <meta property="twitter:image" content="https://gil.technology/logo.png" /> 
        </Head>
        <body>
          <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
