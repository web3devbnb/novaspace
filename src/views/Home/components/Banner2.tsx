import React from 'react'
import { Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import logo1 from '../assets/fees.png'
import logo2 from '../assets/novadexbig.png'
import logo3 from '../assets/banner2logo.png'

const Row = styled(Flex)`
    height: 300px;
    flex-direction: column;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('/images/home/banner2bg.png');
    background-position: top left ;
    align-items: center;
    justify-content: space-evenly;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 30px;
    position: relative;

    ${({ theme }) => theme.mediaQueries.md} {
        flex-wrap: nowrap;
        flex-direction: row;
        background-position: left;
      }
  }
`
const Img1 = styled.img`
  display: flex;
  width: 50%;
  height: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40%;
    margin-top: 10px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 25%;
    // margin-left: -25%;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 20%;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 25%;
  }
`
const Img2 = styled.img`
  display: flex;
  width: 80%;
  height: auto;
  margin-bottom: 70px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 60%;
    margin-top: 10px;
    margin-left: -20%;
    margin-bottom: 0px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 33%;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 0%;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 33%;
    padding-top: 0px;
    margin-right: 40px;
    margin-bottom: auto;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    width: auto;
    height: 240px;
    margin-right: 0px;
    margin-top: auto;
  }
`
const Img3 = styled.img`
    display: flex;
    width: 50%;
    height: auto;
    position: absolute;
    bottom: -50px;
    right: 50px;
    ${({ theme }) => theme.mediaQueries.sm} {
        width: 30%;
        bottom: 10px;
        right: -11%;
       }
       ${({ theme }) => theme.mediaQueries.md} {
        width: 20%;
        position: static;
        margin-right: -10px;
          }
          ${({ theme }) => theme.mediaQueries.lg} {
            width: 20%;
              }
          ${({ theme }) => theme.mediaQueries.xl} {
              height: 250px;
              margin-right: 100px
              margin-bottom: 0px;
              width: auto;
             }
`

const Banner2 = () => {
  return (
    <Row>
      <Img1 src={logo1} alt="launchpad redefined" />
      <Img2 src={logo2} alt="launchpad redefined" />
      <Img3 src={logo3} alt="launchpad redefined" />
    </Row>
  )
}

export default Banner2
