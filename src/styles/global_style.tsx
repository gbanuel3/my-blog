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
        
        .blog-content p {
          font-size: 1.1rem;
          font-weight: 400;
          margin: 1em 0;
        }
        .blog-content h1 {
          font-size: 2.2rem;
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        .blog-content h2 {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        .blog-content h4 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        .blog-content h5 {
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        .blog-content h6 {
          font-size: 1rem;
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        .blog-content a {
          color: ${colors[colorMode].link_color};
          text-decoration: underline;
        }
        .blog-content ul {
          font-size: 1.1rem;
          font-weight: 400;
          padding-left: 20px;
          margin-bottom: 1em;
        }
        .blog-content ol {
          font-size: 1.1rem;
          font-weight: 400;
          padding-left: 20px;
          margin-bottom: 1em;
        }
        .blog-content li {
          font-size: 1.1rem;
          font-weight: 400;
          margin-bottom: 0.5em;
        }
        .blog-content blockquote {
          border-left: 4px solid ${colors[colorMode].blockquote_border_color};
          padding-left: 1em;
          margin-bottom: 1em;
          font-style: italic;
          background: ${colors[colorMode].blockquote_bg_color};
        }
        .blog-content code {
          font-family: monospace;
          background-color: ${colors[colorMode].code_bg_color};
          padding: 0.2em 0.4em;
          border-radius: 3px;
        }
        .blog-content pre {
          background-color: ${colors[colorMode].pre_bg_color};
          padding: 1em;
          overflow-x: auto;
          border-radius: 3px;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          margin-bottom: 1em;
          padding: 1em;
        }
        .blog-content hr {
          border: 0;
          height: 1px;
          background-color: ${colors[colorMode].hr_color};
          margin-bottom: 1em;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1em;
        }
        .blog-content th,
        .blog-content td {
          border: 1px solid ${colors[colorMode].table_border_color};
          padding: 0.5em;
        }
      `}
    />
  )
}

export default GlobalStyle
