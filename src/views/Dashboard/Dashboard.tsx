import React, { useMemo, useState, useRef } from 'react'
import styled from 'styled-components'
import { BaseLayout, Flex, Text } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import Header from 'components/Header'
import NeonButton from './components/NeonButton'
import ExpandableSectionButton from './components/ExpandableSectionButton'
import FarmStakingCard from './components/FarmStakingCard'
import SNovaStakingCard from './components/sNovaStakingCard'
import MoneyedPotCard from './components/MoneyPotCard'
import TradeRouteCard from './components/TradeRouteCard'
import SubHero from './components/SubHero'
import Banner2 from './components/Banner2'
import Divider from './assets/divider.png'
import NovariaCard from './components/NovariaCard'
import NovariaTeaser from './components/NovariaTeaser'

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

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

const Hero = styled.div`
  margin-bottom: 30px;
`


const Img = styled.img`
  width: 95%;
  align-self: flex-end;

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



const Dashboard: React.FC = () => {

  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const myRef = useRef(null)

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
