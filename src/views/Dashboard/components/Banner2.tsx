import React from 'react'
import { Button, Flex, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import logo2 from '../assets/novadexbig-min.png'

const Row = styled(Flex)`
    min-height: 500px;
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
        <a id={title} href="https://dex.NovaSpace.io " rel="noreferrer noopener">
          <Img2 src={logo2} alt="launchpad redefined" />
        </a>
      </ColLeft>

      <ColRight>
        <Description glowing>
          NovaSpaceDex is a decentralized exchange (DEX) on the Binance Smart Chain. Users can exchange any tokens on
          the DEX that have liquidity. Trade fees are disbursed to sNOVA holders in the daily money pot!
        </Description>
        <ButtonRow>
          <a
            href="https://dex.NovaSpace.io/#/swap?outputCurrency=0x56e344be9a7a7a1d27c854628483efd67c11214f"
            rel="noopener noreferrer"
          >
            <Button style={{ margin: '0 10px' }}>Buy NOVA</Button>
          </a>
          <a
            href="https://docs.NovaSpace.io/NovaSpace-documentation/how-to-defi"
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
