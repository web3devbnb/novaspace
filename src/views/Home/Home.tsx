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

// background-image: url(images/TVLbg.png);
// background-position: right;

const Hero = styled.div`
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  flex-direction: grid;
  //margin: auto;
  margin-bottom: 0px;
  padding-top: 15px;
  text-align: left;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    image-size: 100px;
    padding-top: 0px;
    padding-right: 1px;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: center;
  margin-bottom: 48px;
  margin-top: 32px;

  & > div {
    grid-column: 4;
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

const Header = ({ children }) => (
  <Hero>
    <Heading as="p" size="xl" glowing mb="28px" color="#FFFFFF" style={{ fontWeight: 700 }}>
      {children}
    </Heading>
    <div style={{ position: 'absolute', right: '10vw', bottom: -4 }}>
      <TotalValueLockedCard />
    </div>
  </Hero>
)

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Header>DASHBOARD</Header>
      <Divider />
      <Cards>
        <FarmStakingCard />
        <SNovaStakingCard />
        <MoneyedPotCard />
      </Cards>
    </Page>
  )
}

export default Home
