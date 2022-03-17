import React from 'react'
import styled from 'styled-components'
import { BaseLayout } from '@pancakeswap-libs/uikit'
import showCountdown from 'utils/countdownTimer'
import Page from 'components/layout/Page'
import Header from 'components/Header'
import FarmStakingCard from './components/FarmStakingCard'
import SNovaStakingCard from './components/sNovaStakingCard'
import MoneyedPotCard from './components/MoneyPotCard'
import TradeRouteCard from './components/TradeRouteCard'
import SubHero from './components/SubHero'
import Banner2 from './components/Banner2'
import NovariaCard from './components/NovariaCard'
import NovariaTeaser from './components/NovariaTeaser'

const Cards = styled(BaseLayout)`
  display: flex;
  flex-wrap: wrap;
  wrap-direction: row;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
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
    //  grid-column: span 2;
    // width: 100%;

    // ${({ theme }) => theme.mediaQueries.md} {
    //   grid-column: span 4;
    // }

    ${({ theme }) => theme.mediaQueries.lg} {
      //  grid-column: span 4;
    }
  }
`

const Hero = styled.div`
  margin-bottom: 30px;
`

const Teaser = styled.div`
  text-align: center;
  // object-position: center;
  // justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  max-width: 1270px;
  margin-top: 20px;
`

const NovariaCountdown = styled.div`
  margin-top: 10px;
  font-size: 3rem;
  color: gold;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 9rem;
  }
`

const Dashboard: React.FC = () => {

  const novariaTimer = showCountdown(new Date(1647547200000))

  return (
    <Page
    // style={{maxWidth:"100%", marginLeft: 'auto', marginRight: 'auto'}}
    >
      <Hero>
        <Header>Welcome</Header>
      
        <SubHero />
      </Hero>

      <NovariaCard title="novaria" />
      <Banner2 title="dex" />
      <TradeRouteCard title="trade-routes" />

      <Teaser>
        <NovariaTeaser title="teaser" />
      </Teaser>

      {/* <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}> */}
      <Cards id="stats">
        <FarmStakingCard />
        <SNovaStakingCard />
        <MoneyedPotCard />
      </Cards>
      {/* </ExpandingWrapper> */}
    </Page>
  )
}

export default Dashboard
