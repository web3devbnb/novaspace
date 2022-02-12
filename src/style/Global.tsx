import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { ShibanovaTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends ShibanovaTheme {}
}
const spacebgMobile = "url('/images/home/bgspaceMobile.jpg')"
const novariaMobileBG = "url('/images/home/novariaBGMobile.jpg')"
const novariaBG = "url('/images/home/mainBackground-dark.jpg')"
const spaceBG = "url('/images/home/bgspaceBig.jpg')"
const novariaSpace = "url('/images/novaria/mapBG.jpg')"
const novariaShipyard = "url('/images/novaria/shipyardBG.jpg')"

const GlobalStyle = createGlobalStyle<{isNovaria: boolean, isNovariaSpace: boolean, isShipyard: boolean, isStandard: boolean}>`
@font-face {
  font-family: 'BigNoodle';
  src:  url('./fonts/bignoodletitling.woff') format('woff'), url('./fonts/bignoodletitling.ttf') format('truetype');
}
  * {
    font-family: 'Montserrat', sans-serif;
    font-family: 'Poppins', sans-serif;
    // font-family: 'BigNoodle';
  }
  body {
     background-image: ${({isNovaria}) => (isNovaria ? novariaMobileBG : '')};
     background-image: ${({isStandard}) => (isStandard ? spacebgMobile : '')};
     background-image: ${({isNovariaSpace}) => (isNovariaSpace ? novariaSpace : '')};
     background-image: ${({isShipyard}) => (isShipyard ? novariaShipyard : '')};

     background-size: 100% auto;
     background-repeat: repeat-y;

    img {
      height: auto;
      max-width: 100%;
    }

    ${({ theme }) => theme.mediaQueries.md} {
      background-image: ${({isNovaria}) => (isNovaria ? novariaBG : '')};
      background-image: ${({isStandard}) => (isStandard ? spaceBG : '')};
      background-image: ${({isNovariaSpace}) => (isNovariaSpace ? novariaSpace : '')};
      background-image: ${({isShipyard}) => (isShipyard ? novariaShipyard : '')};
      
      background-size: ${({isNovaria}) => (isNovaria ? 'cover' : '100% auto')};
      background-repeat: ${({isNovaria}) => (isNovaria ? 'none' : 'repeat-y')};
      background-position: center;
    }
  }
`

export default GlobalStyle
