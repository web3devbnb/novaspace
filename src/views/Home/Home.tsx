import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from './components/FarmStakingCard'
import LotteryCard from './components/LotteryCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'
import Divider from './components/Divider'
import SNovaStakingCard from './components/sNovaStakingCard'
import StatsCard from './components/StatsCard'
import MoneyedPotCard from './components/MoneyPotCard'

const Hero = styled.div`
  
background-image: url(images/TVLbg.png);
background-position: right;
  background-repeat: no-repeat;
  background-position: right;
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: auto;
  margin-bottom: 0px;
  padding-top: 15px;
  text-align: left;

  ${({ theme }) => theme.mediaQueries.lg} {
   
    text-align: left;
    image-size: 10px;
    height: 150px;
    padding-top: 55px;
    padding-right: 1px;
  }
  
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: 8;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 4;
      border: 1px solid;
      border-color: #00aaff;
    }
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 4;
      border: 1px solid;
      border-color: #00aaff;
    }
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 4;
      border: 1px solid;
      border-color: #00aaff;
    }
  }

  
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xxl" mb="24px" color="#FFFFFF" style={{
          textShadow:'2px 2px 5px #00aaff95, -2px -2px 5px #00aaff95 ', 
          paddingRight:'385px'
          }}>
           DASHBOARD
           
        </Heading>
        <TotalValueLockedCard />
        
      </Hero>
      <div>
      <Divider />
        <Cards>
          
          
          <FarmStakingCard />
          <SNovaStakingCard />
          <MoneyedPotCard />
          
        </Cards>
      </div>
    </Page>
  )
}

export default Home
