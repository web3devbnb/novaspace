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

const Hero = styled.div`
  

  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: auto;
  margin-bottom: 0px;
  padding-top: 16px;
  text-align: left;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url(images/TVLbg.png);
background-position: right;
    text-align: left;
    image-size: 10px;
    height: 135px;
    padding-top: 35px;
    padding-right: 150px;
  }
  
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 4;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xxl" mb="24px" color="#FFFFFF" style={{textShadow:'2px 2px 5px #00aaff95, -2px -2px 5px #00aaff95 ', paddingRight:'255px'}}>
           DASHBOARD
           
        </Heading>
        <TotalValueLockedCard />
        
      </Hero>
      <div>
      <Divider />
        <Cards>
          
          <TwitterCard/>
          <FarmStakingCard />
          <CakeStats />
          
        </Cards>
      </div>
    </Page>
  )
}

export default Home
