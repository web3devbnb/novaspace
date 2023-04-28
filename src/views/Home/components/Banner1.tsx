import React from 'react'
import { Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import logo1 from '../assets/launchdefined.png'
import logo2 from '../assets/novapadlogo.png'
import rocket from '../assets/rocket_2.png'

const Row = styled(Flex)`
    height: 300px;
    flex-direction: column;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('/images/home/BG_SPACE.png');
    background-position: bottom right;
    align-items: center;
    justify-content: space-evenly;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 30px;

    ${({ theme }) => theme.mediaQueries.md} {
        flex-wrap: nowrap;
        flex-direction: row;
        background-position: center;
      }

  }

`

const Img1 = styled.img`
  display: flex;
  width: 50%;
  height: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 30%;
    margin-top: 40px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 25%;
    padding-bottom: 20px;
    margin-left: -50px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 20%;
    margin-left: -80px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 25%;
    margin-left: -20%;
  }
`
const Img2 = styled.img`
  display: flex;
  width: 350px;
  height: auto;
  margin-bottom: 50px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 90%;
    margin-top: -10px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 60%;
    margin-top: auto;
    padding-top: 20px;
    margin-bottom: auto;
    margin-left: -20%;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 50%;
    padding-top: 0px;
    margin-right: 40px;
    margin-bottom: auto;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    width: auto;
    height: 290px;
    margin-top: auto;
    padding-top: 20px;
  }
`
const Img3 = styled.img`
    display: flex;
    width: 50%;
    height: auto;
    position: absolute;
    bottom: 1px;
    right: 10px;
    ${({ theme }) => theme.mediaQueries.sm} {
        width: 40%;
        bottom: 1px;
        right: 10px;
       }
       ${({ theme }) => theme.mediaQueries.md} {
        width: 30%;
          }
          ${({ theme }) => theme.mediaQueries.lg} {
            width: 30%;
              }
          ${({ theme }) => theme.mediaQueries.xl} {
              height: 250px;
              margin-right: 100px
              margin-bottom: 0px;
              width: auto;
             }
`

const Banner1 = () => {
  return (
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
  )
}

export default Banner1
