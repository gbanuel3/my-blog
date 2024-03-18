import { Global, css } from '@emotion/react'
import { useColorModeValue, useColorMode } from '@chakra-ui/react'
import { colors } from '@/constants'

const GlobalStyle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Global
      styles={css`
        body {
          background-color: ${colors[colorMode].bg_color} !important;
          margin: 0;
          padding: 0;
        }
      `}
    />
  )
}

export default GlobalStyle
