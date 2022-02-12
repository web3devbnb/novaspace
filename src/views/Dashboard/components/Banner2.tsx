import React from 'react'
import { Button, Flex, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import logo2 from '../assets/novadexbig-min.png'

const Row = styled(Flex)`
    height: 500px;
    width: 95%;
    flex-direction: column;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('/images/home/dexbgbig.jpg');
    background-position: left ;
    align-items: center;
    justify-content: center;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 30px;
    // position: relative;
    margin: 20px auto;
    

    ${({ theme }) => theme.mediaQueries.md} {
        flex-wrap: wrap;
        flex-direction: column;
        background-position: left;
      }
  }
`

const Img2 = styled.img`
  ${({ theme }) => theme.mediaQueries.md} {
  }
`
const ColLeft = styled.div`
  width: 90%;
  // align-self: center;
  align-items: center;
  text-align: center;
  margin: 10px;
  display: flex;
`
const ColRight = styled.div`
  width: 90%;
  align-self: center;
  margin: 10px;
  align-items: center;
`

const Description = styled(Text)`
  font-size: 20px;
  color: white;
  font-weight: medium;
  text-align: center;
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`

const Banner2 = ({ title }: { title: string }) => {
  return (
    <Row>
      <ColLeft>
        <a id={title} href="https://swap.shibanova.io" rel="noreferrer noopener">
          <Img2 src={logo2} alt="launchpad redefined" />
        </a>
      </ColLeft>

      <ColRight>
        <Description glowing>
          NovaDex is a decentralized exchange (DEX) on the Binance Smart Chain. Users can exchange any tokens on the
          DEX that have provided liquidity. Trade fees are disbursed to sNOVA holders in the daily money pot!
        </Description>
        <ButtonRow>
          <a
            href="https://swap.shibanova.io/#/swap?outputCurrency=0x56E344bE9A7a7A1d27C854628483Efd67c11214F"
            rel="noopener noreferrer"
          >
            <Button style={{ margin: '0 10px' }}>Buy NOVA</Button>
          </a>
          <a
            href="https://docs.shibanova.io/shibanova-documentation/how-to-defi"
            target="blank"
            rel="noopener noreferrer"
          >
            <Button style={{ margin: '0 10px' }}>Learn More</Button>
          </a>
        </ButtonRow>
      </ColRight>
    </Row>
  )
}

export default Banner2
