import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { ShibanovaTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends ShibanovaTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
  }
  body {
    background: ${({ theme }) => theme.colors.gradients.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
