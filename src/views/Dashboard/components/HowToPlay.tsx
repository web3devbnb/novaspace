import React from 'react'
import styled from 'styled-components'
import { darkColors } from '@pancakeswap-libs/uikit'
import howto1 from '../assets/howto1.png'
import howto2 from '../assets/howto2.png'
import howto3 from '../assets/howto3.png'
import novaria from '../assets/novariaLogoSmall.png'

const Body = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: ${darkColors.text};
  margin-top: 5px;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: initial;
  }
`

const Heading = styled.div`
  color: ${darkColors.text};
  font-size: 1.3rem;
  margin-top: 15px;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: left;
  }
`

const Border = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid ${darkColors.backgroundDisabled};
  border-radius: 5px;
`

const ItemSquare = styled.a`
  height: 250px;
  width: 100%;
  background: #0c0b15;
  border: 1px solid ${darkColors.backgroundDisabled};
  // border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 300px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    &:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    &:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }
`

const ItemImg = styled.img`
  width: 70%;
  height: auto;
  margin-right: auto;
  margin-left: auto;
`

const HowToInfo = [
  {
    id: 0,
    title: 'Transfer BNB to your Crypto Wallet',
    img: howto1,
    link: 'https://academy.binance.com/en/articles/how-to-get-started-with-binance-smart-chain-bsc',
  },
  {
    id: 1,
    title: 'Connect Your Wallet',
    img: howto2,
    link: 'https://docs.novaspace.io/NovaSpace-documentation/how-to-connect-a-wallet',
  },
  {
    id: 2,
    title: 'Buy NOVA Tokens',
    img: howto3,
    link: 'https://dex.novaspace.io/#/swap?outputCurrency=0x10ED43C718714eb63d5aA57B78B54704E256024E',
  },
  {
    id: 3,
    title: 'Play Soon!',
    img: novaria,
    link: '/',
  },
]

const HowToPlay = () => {
  return (
    <div>
      <Heading>How To Play</Heading>
      <Body>
        {HowToInfo.map((item, idx) => {
          return (
            <ItemSquare key={item.id} href={item.link} target="_blank" rel="noreferrer noopener">
              <ItemImg alt={item.title} src={item.img} />
              {item.title}
            </ItemSquare>
          )
        })}
      </Body>
    </div>
  )
}
export default HowToPlay
