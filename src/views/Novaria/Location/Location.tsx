import { AbiItem } from 'web3-utils'
import React, { useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import MapAbi from 'config/abi/Map.json'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import contracts from 'config/constants/contracts'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'

const Page = styled.div``

const Body = styled.div`
  margin: 10px 50px 10px 150px;
  // fix background later
  background-image: url('/images/home/starsBackground.jpg');
  background-size: cover;
`

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const PlanetImageCard = styled.div``
const PlanetInfoCard = styled.div``
const OpenBattlesCard = styled.div``
const PlayersCard = styled.div``
const YourFleetCard = styled.div``
const BattleProgressCard = styled.div``

const Location: React.FC = () => {
  return (
    <Page>
      <GameHeader>LOCATION</GameHeader>
      <Body>
        <GameMenu />
        <Content>
          <div>
            <PlanetImageCard />
            <PlanetInfoCard>
              <div>HAVEN</div>
            </PlanetInfoCard>
          </div>
          <div>
            <OpenBattlesCard>
              <div>OPEN BATTLES</div>
            </OpenBattlesCard>
            <PlayersCard>
              <div>PLAYERS</div>
            </PlayersCard>
          </div>
          <div>
            <YourFleetCard>
              <div>YOUR FLEET</div>
            </YourFleetCard>
            <BattleProgressCard>
              <div>BATTLE PROGRESS</div>
            </BattleProgressCard>
          </div>
        </Content>
      </Body>
    </Page>
  )
}

export default Location
