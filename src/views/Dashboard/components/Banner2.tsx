import React from "react";
import { Flex} from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import logo1 from '../assets/fees-min.png'
import logo2 from '../assets/novadexbig-min.png'
import logo3 from '../assets/banner2logo-min.png'

const Row = styled(Flex)`
    height: 150px;
    width: 100%;
    flex-direction: row;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('/images/home/dexbgbig.jpg');
    background-position: left ;
    align-items: center;
    justify-content: space-evenly;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 30px;
    position: relative;
    margin: 10px 5px;

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
    ${({ theme }) => theme.mediaQueries.xs} {
        width: 0;
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
    ${({ theme }) => theme.mediaQueries.xs} {
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
            
             }
`
const Img3 = styled.img`
    display: flex;
    width: 50%;
    height: auto;
    position: absolute;
    bottom: -50px;
    right: 50px;
    ${({ theme }) => theme.mediaQueries.xs} {
        width: 0;
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
             
             }
`



const Banner2 = () => {
    return (
      <a href="https://swap.shibanova.io" rel="noreferrer noopener">
        <Row>
            <Img1 src={logo1} alt="launchpad redefined" />
            <Img2 src={logo2} alt="launchpad redefined" />
            <Img3 src={logo3} alt="launchpad redefined" /> 
        </Row>
      </a>
    )
}

export default Banner2