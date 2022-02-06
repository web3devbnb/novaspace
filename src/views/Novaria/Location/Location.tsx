import React from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'
import {
  useGetAttackPower,
  useGetBattlesAtLocation,
  useGetFleetLocation,
  useGetFleetSize,
  useGetPlaceInfo,
} from 'hooks/useNovaria'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'

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
  const { account } = useWallet()
  const location = useGetFleetLocation(account)
  const placeInfo = useGetPlaceInfo(location.X, location.Y)
  const battlesAtLocation = useGetBattlesAtLocation(location.X, location.Y)
  const fleetSize = useGetFleetSize(account)
  const fleetPower = useGetAttackPower(account)

  console.log('account: ', typeof account, account)
  console.log('x, y:', location.X, location.Y)
  console.log('place info:', placeInfo)
  console.log('battles:', battlesAtLocation)
  console.log('fleet size:', fleetSize)
  console.log('fleet power:', fleetPower)

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
              {battlesAtLocation.map((el) => el)}
            </OpenBattlesCard>
            <PlayersCard>
              <Header>PLAYERS</Header>
            </PlayersCard>
          </div>
          <div>
            <YourFleetCard>
              <Header>YOUR FLEET</Header>
              {fleetSize}
              {fleetPower}
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
