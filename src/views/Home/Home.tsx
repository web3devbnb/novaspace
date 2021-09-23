import React from 'react'
import styled from 'styled-components'
import { BaseLayout, Flex, Text, Heading, Card } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import Header from 'components/Header'
import Divider from './components/Divider'
import BG from './components/BG_SPACE.png'
import novapad from './components/novapadlogo.png'
import novadex from './components/novadexlogo.png'
import defi2 from './components/defi20_badge2.png'
import VaultCard from './components/VaultCard'
import FarmCard from './components/FarmCard'
import StatsCard from './components/StatsCard'


const Body = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
`
const Row = styled(Flex)`
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  justify-content: center;
  width: 100%;
`

const Main = styled.div`
  background-image: url('/images/BG_SPACE.png');
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 15px;
  padding: 32px 16px;
  text-align: center;
  flex-direction: row;
  border-radius: 15px;
`
const Sub = styled(Card)`
  height: 150px;
  background-image: url('/images/BG_SPACE.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 50%;
  justify-content: center;
  text-align: center;
  margin: 5px;
  border-radius: 15px;
  box-shadow:  22px 22px 44px #001a57,
  -22px -22px 44px #0030a5;
`

const Img = styled.img`
  width: 33%;
  height: undefined;
  aspectRatio: 2/1;
  margin-left:auto;
  margin-right:auto;
`

const Img2 = styled.img`
  width: 33%;
  height: 33%;
  margin-left: 5px;
  margin-right:auto;
`

const Home: React.FC = () => {
  return (
    <Page>
      <Header>ShibaNova</Header>
      <Divider />
      <Body>
        <Row>
          <Main>
            <Img src={novapad} alt="novapad"  />
            <Img src={novadex} alt="novadex"  />
            <Img src={defi2} alt="defi2.0"  />
            <Text>main component - novadex, novapad, novanetwork</Text>
          </Main>
        </Row>
        <Row>
          <Sub>
            <FarmCard />
          </Sub>
          <Sub>
              <Text>audit logos here?</Text>
          </Sub>
        </Row>
        <Row>
          <Sub>
            <VaultCard />
          </Sub>
          <Sub>
            <StatsCard title="Cointiger">
              <Text>Buy Nova on CoinTiger</Text>
            </StatsCard>
          </Sub>
        </Row>
      </Body>
    </Page>
  )
}

export default Home
