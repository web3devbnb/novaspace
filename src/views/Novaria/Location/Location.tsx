import React from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'
import {
  useGetAttackPower,
  useGetBattlesAtLocation,
  useGetFleetLocation,
  useGetFleetMineral,
  useGetFleetsAtLocation,
  useGetFleetSize,
  useGetMaxMineralCapacity,
  useGetPlaceInfo,
} from 'hooks/useNovaria'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'
import OpenBattlesTable from './OpenBattlesTable'
import PlayersTable from './PlayersTable'

const Page = styled.div`
  background-image: url('/images/novaria/mapBG.jpg');
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

const Header = styled.text`
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin: 10px;
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
  const { account } = useWallet()

  const location = useGetFleetLocation(account)
  const placeInfo = useGetPlaceInfo(location.X, location.Y)

  const battlesAtLocation = useGetBattlesAtLocation(location.X, location.Y)
  const fleetsAtLocation = useGetFleetsAtLocation(location.X, location.Y)

  const fleetSize = useGetFleetSize(account)
  const fleetPower = useGetAttackPower(account)
  const fleetMineral = useGetFleetMineral(account)
  const fleetMaxMineral = useGetMaxMineralCapacity()

  console.log('account: ', typeof account, account)
  console.log('x, y:', location.X, location.Y)
  console.log('place info:', placeInfo)
  console.log('battles:', battlesAtLocation)
  console.log('fleets:', fleetsAtLocation)
  console.log('fleet size:', fleetSize)
  console.log('fleet power:', fleetPower)
  console.log('fleet mineral:', fleetMineral)
  console.log('fleet max mineral:', fleetMaxMineral)

  // An empty place is a place with no name.
  if (!placeInfo.name) {
    return null
  }

  return (
    <Page>
      <GameHeader>LOCATION</GameHeader>
      <Body>
        <GameMenu pageName="location" />
        <Content>
          <div>
            <PlanetImageCard />
            <PlanetInfoCard>
              <Header>{placeInfo.name}</Header>
            </PlanetInfoCard>
          </div>
          <div>
            <OpenBattlesCard>
              <Header>OPEN BATTLES</Header>
              <OpenBattlesTable battles={battlesAtLocation.slice(0, 5)} />
            </OpenBattlesCard>
            <PlayersCard>
              <Header>PLAYERS</Header>
              <PlayersTable players={fleetsAtLocation.slice(0, 5)} />
            </PlayersCard>
          </div>
          <div>
            <YourFleetCard>
              <Header>YOUR FLEET</Header>
              <div>FLEET SIZE: {fleetSize}</div>
              <div>FLEET POWER: {fleetPower}</div>
              <div>FLEET MINERAL: {fleetMineral}</div>
              <div>FLEET MAX MINERAL: {fleetMaxMineral}</div>
            </YourFleetCard>
            <BattleProgressCard>
              <Header>BATTLE PROGRESS</Header>
            </BattleProgressCard>
          </div>
        </Content>
      </Body>
    </Page>
  )
}

export default Location
