import React from 'react'
import { Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import logo1 from '../assets/launchdefined.png'
import logo2 from '../assets/novapadlogo.png'
import rocket from '../assets/rocket_2.png'

const Row = styled.div`
    display: flex;
    height: 150px;
    width: 100%;
    flex-direction: row;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('/images/home/BG_SPACE.png');
    background-position: bottom right;
    align-items: center;
    justify-content: space-evenly;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 30px;
    margin: 10px 5px;

    ${({ theme }) => theme.mediaQueries.md} {
        flex-wrap: nowrap;
        flex-direction: row;
        background-position: center;
      }

  }

`

const Img1 = styled.img`
  display: flex;
  width: 25%;
  height: auto;
  margin-left: 15px;
  ${({ theme }) => theme.mediaQueries.sm} {
  }
  ${({ theme }) => theme.mediaQueries.md} {
  }
  ${({ theme }) => theme.mediaQueries.lg} {
  }
  ${({ theme }) => theme.mediaQueries.xl} {
  }
`
const Img2 = styled.img`
  display: flex;
  height: auto;
  max-height: 95%;
  position: center;
  width: 40%;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 60%;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 40%;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
  }
  ${({ theme }) => theme.mediaQueries.xl} {
  }
`
const Img3 = styled.img`
  display: flex;
  width: 30%;
  height: auto;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 0;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    height: 100%;
    width: 30%;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
  }
  ${({ theme }) => theme.mediaQueries.xl} {
  }
`

const Banner1 = () => {
  return (
    <a href="/novapad">
      <Row>
        <Img1 src={logo1} alt="launchpad redefined" />
        <Img2 src={logo2} alt="launchpad redefined" />
        <Img3 src={rocket} alt="launchpad rocket" />
        {/* <Col1>
                <img src={logo1} alt="launchpad redefined" />
            </Col1>
            
            <Col2>
                <img src={logo2} alt="launchpad redefined" />
            </Col2>
            <Col3>
                <img src={rocket} alt="launchpad rocket" />
            </Col3> */}
      </Row>
    </a>
  )
}

export default Banner1
