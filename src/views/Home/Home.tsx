import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import { BaseLayout, Flex, Text, Card } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import Header from 'components/Header'
import SimpleImageSlider from "react-simple-image-slider"
import MoneyPotCard from './components/MoneyPotCard'
import VaultsCard from './components/VaultCard'
import FarmsCard from './components/FarmCard'
import TradesCard from './components/TradeCard'
import Defi2Card from './components/DefiCard'
import CandleCard from './components/CandleCard'
import Announcements from './components/Announcements'
import Banner from "./components/Banner"
import Divider from "./assets/divider.png"


const Body = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
  margin 0 20px;
  max-width: 2800px;
`

const Col = styled(Flex)`
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  justify-content: center;
  width: 99%;
  margin: 0 5px;
  max-width: 800px;


  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 10px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 47%;
  }
 
`

const Main = styled(Flex)`
  width: 95%;
  margin: 10px 0 0 0;
  flex-direction: column;
  object-position: center bottom;
  justify-content: center;
  // padding: 32px 16px;

  // border-radius: 30px;
  // border: 2px solid ${({ theme }) => theme.colors.primary};

`
const Announcement = styled(Text)`
  text-align: center;
  text-weight: bold;
  background-image: url('/images/home/divider.png')
  background-position: center;
  background-size: cover;
`
const Img = styled.img`
  object-position: center bottom;
`

const Home: React.FC = () => {
  

  
  return (
    <Page 
      
    >
      <Header>WELCOME!</Header>
      
      <Body>
        {/* TO-DO: replace static announcements banner with announcements.tsx?
        <Announcements /> */}
        <Main>
          <Announcement glowing>
            Want to Launch Your Project to the Moon? Apply 
            <a target="_blank" rel="noreferrer" style={{color:"gold"}}
            href="https://forms.gle/hH2ikfTqaznbTjAe8"> HERE!</a>
          </Announcement>
          <Img src={Divider} alt="divider" style={{}} />
        </Main>
        <Banner />
          <Col>  
            <FarmsCard />                          
            {/* <VaultsCard />
            <CandleCard /> */}
          </Col>
          <Col>
            <MoneyPotCard />
            <Defi2Card />
            <TradesCard />              
          </Col>
        
      </Body>
    </Page>
  )
}

export default Home
