import React from 'react'
import styled from 'styled-components'
import { BaseLayout, Flex, Text } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import Header from 'components/Header'
import FarmStakingCard from './components/FarmStakingCard'
import SNovaStakingCard from './components/sNovaStakingCard'
import MoneyedPotCard from './components/MoneyPotCard'
import VaultsCard from './components/VaultCard'
import FarmsCard from './components/FarmCard'
import TradesCard from './components/TradeCard'
import Defi2Card from './components/DefiCard'
import CandleCard from './components/CandleCard'
import Banner1 from './components/Banner1'
import Banner2 from './components/Banner2'
import Divider from './assets/divider.png'
import teaserBanner from './assets/teaserBanner2.jpg'

const Cards = styled(BaseLayout)` 
   display: flex;
  flex-wrap: wrap;
  wrap-direction: row;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 15px;
  max-width: 95%;
  text-align: center;
  align-items: stretch;
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.mediaQueries.md} {
    // grid-gap: 35px;
   // padding: 0 25px;
  }
  & > div {
     grid-column: span 2;
   // width: 100%;

    // ${({ theme }) => theme.mediaQueries.md} {
    //   grid-column: span 4;
    // }

    ${({ theme }) => theme.mediaQueries.lg} {
    //  grid-column: span 4;
    }
  }
`

const Body = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
  margin 0 0px;
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
const Announcement = styled(Text)`
  text-align: center;
  text-weight: bold;
  margin-top: 10px;
 
`
const Img = styled.img`
  object-position: center bottom;
`

const Teaser = styled.div`
  text-align: center;
  // object-position: center;
  // justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
`

const Banner = styled.img`
  border-radius: 25px;
  width: 0px;

  // ${({ theme }) => theme.mediaQueries.xs} {
  //   width: 0px;
  // }
  
  ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
  }
`

const Video = styled.video`
  border-radius: 25px;
  width: 100%;
  
  // ${({ theme }) => theme.mediaQueries.xs} {
  //   width: 100%;
  // }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 0;
  }
`

const Dashboard: React.FC = () => {
  return (
    <Page style={{maxWidth: 1400, marginLeft: 'auto', marginRight: 'auto'}}>
      <Header>Welcome</Header>
      {/* <Divider /> */}
      <Announcement glowing>
        The DEX, launchpad and yield farm that rewards holders with 75% of the platform fees in the daily <span style={{color:"gold"}} > MONEY POT</span>!
        <Img src={Divider} alt="divider"  />
      </Announcement>
      <Teaser><a href='/novaria'>
        <Banner src={teaserBanner} alt="Novaria, the battle is coming" />
        <Video controls loop>
          <source src='/videos/guy_2_3.mp4' type='video/mp4' />
        </Video></a>
      </Teaser>
      
      <Cards>
        <FarmStakingCard />
        <SNovaStakingCard />
        <MoneyedPotCard />
      </Cards>
      <Body>
          <Col>  
            <FarmsCard />                          
            {/* <VaultsCard />
            <CandleCard /> */}
          </Col>
          <Col>
            {/* <Banner1 /> */}
            <Banner2 />
            {/* <TradesCard />               */}
          </Col>

      </Body>
      
    </Page>
  )
}

export default Dashboard
