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
     background-image: url('/images/home/dexmobilebg2.png');
     background-size: 100% auto;
    background-repeat: repeat-y;
    background-position: center;

    // background: ${({ theme }) => theme.colors.gradients.background};

    img {
      height: auto;
      max-width: 100%;
    }

    ${({ theme }) => theme.mediaQueries.md} {
      background-image: url('/images/home/dexbg.png');
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
`

export default GlobalStyle
