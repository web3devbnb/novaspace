import { AbiItem } from 'web3-utils'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import MapAbi from 'config/abi/Map.json'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { useGetPlaceId, useGetPlaceInfo, } from 'hooks/useNovaria'
import contracts from 'config/constants/contracts'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'



const Page = styled.div`
  background-Image: url('/images/novaria/mapBG.jpg');
  background-size: cover;
  font-size: 15px;
  margin-top: -105px;
  color: #5affff;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: -75px;
  }
`

const Body = styled.div`
  margin: 10px 50px 10px 150px;
  // fix background later
  background-image: url('/images/home/starsBackground.jpg');
  background-size: cover;
  height: 500px;
  display: flex;

`

const CoordInput = styled.input`
  width: 4em;
  background: transparent;
  -moz-appearance: textfield;
  color: white;
`

const InputControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 10px;
  color: white;
  gap: 5px;
`

const PlaceMenu = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
`

const Header = styled.text`
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin: 10px;
`

const Item = styled.div`
  margin: 2px;
  margin-left: 8px;
`

const Col = styled.div`
  flex-direction: column;
  margin: 10px;
  display: flex;
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
