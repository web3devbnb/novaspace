import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
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
import { ConnectedAccountContext } from 'App'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'
import LocationCard from './LocationCard'
import OpenBattlesTable from './OpenBattlesTable'
import PlayersTable from './PlayersTable'
import YourFleetStats from './YourFleetStats'

const Page = styled.div`
  font-family: 'BigNoodle', sans-serif;

  background-image: url('/images/novaria/mapBG.jpg');
  background-size: cover;

  font-size: 15px;
  margin-top: -105px;
  color: #5affff;

  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: -75px;
  }
`

const Row = styled.div`
  flex-wrap: no-wrap;
  display: flex;
`

const Body = styled.div`
  margin: 10px 10px 10px 0px;
  padding: 15px 15px 15px 0px;
  // width: 100%;
  // min-height: 550px;
  position: relative;
  aspect-ratio: 15/8;

  ${({ theme }) => theme.mediaQueries.md} {
    // fix background later
    background-image: url('/images/novaria/border.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 10px 10px 10px 10px;
    padding: 15px;
  }
`

const Header = styled.text`
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin: 12px 0 10px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 18px;
  }
`

const Content = styled.div`
  // display: grid;
  // grid-template-columns: 2fr 3fr 2fr;
  // position: inherit;
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
`

const OpenBattlesCard = styled.div`
  background-image: url('/images/novaria/locationTableBorder.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 20px 10px;
  padding: 10px;
  max-height: 45%;
  min-height: 200px;
  min-width: 350px
  max-width: 450px;
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 450px;
  }



`

const PlayersCard = styled.div`
  background-image: url('/images/novaria/locationTableBorder.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 20px 10px;
  padding: 10px;
  max-height: 45%;
  min-height: 200px;
  min-width: 350px
  max-width: 450px;
`

const RightCol = styled.div`
  padding: 15px;
  margin-left: 15px;
  border-left: 1px solid gray;
  max-width: 250px;
`

const CoordInput = styled.input`
  width: 4em;
  background: transparent;
  -moz-appearance: textfield;
  color: white;
  border: 1px solid #5affff;
  border-radius: 5px;
`

const InputControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin: 0px 8px 0px 8px;
  gap: 5px;
  border-bottom: 1px solid #5affff;
`

const YourFleetCard = styled.div``
const BattleProgressCard = styled.div``

const Location: React.FC = () => {
  const account = useContext(ConnectedAccountContext)

  const fleetLocation = useGetFleetLocation(account)
  const location = useLocation()
  const loadedCoords =
    typeof location.state === 'undefined' ? { x: fleetLocation.X, y: fleetLocation.Y } : location.state[0]

  const [X, setX] = useState(loadedCoords.x)
  const [Y, setY] = useState(loadedCoords.y)

  const placeInfo = useGetPlaceInfo(X, Y)

  const battlesAtLocation = useGetBattlesAtLocation(X, Y)
  const fleetsAtLocation = useGetFleetsAtLocation(X, Y)

  const fleetSize = useGetFleetSize(account)
  const fleetPower = useGetAttackPower(account)
  const fleetMineral = useGetFleetMineral(account)
  const fleetMaxMineral = useGetMaxMineralCapacity()

  // An empty place is a place with no name.
  // if (!placeInfo.name) {
  //   return null
  // }

  return (
    <Page className="fontsforweb_bignoodletitling">
      <GameHeader location={fleetLocation} playerMineral={fleetMineral} />
      <Row>
        <GameMenu pageName="location" />
        <Body>
          <Content>
            <LocationCard
              placename={placeInfo.name}
              placetype={placeInfo.type}
              placeX={X}
              placeY={Y}
              mineral={placeInfo.mineral}
              salvage={placeInfo.scrap}
              shipyard={placeInfo.shipyard}
              refinery={placeInfo.refinery}
              isMining={placeInfo.mining}
              fleetLocation={fleetLocation}
            />
            <div>
              <InputControl>
                SEARCH LOCATION:
                <CoordInput type="number" min="0" value={X} onChange={(e) => setX(parseFloat(e.target.value))} />
                ,
                <CoordInput type="number" min="0" value={Y} onChange={(e) => setY(parseFloat(e.target.value))} />
              </InputControl>

              <OpenBattlesCard>
                <Header>OPEN BATTLES</Header>
                <OpenBattlesTable battles={battlesAtLocation.slice(0, 5)} />
              </OpenBattlesCard>
              <PlayersCard>
                <Header>PLAYERS</Header>
                <PlayersTable players={fleetsAtLocation.slice(0, 5)} />
              </PlayersCard>
            </div>
            <RightCol>
              <YourFleetCard>
                <Header>YOUR FLEET</Header>
                <YourFleetStats
                  fleetSize={fleetSize}
                  fleetPower={fleetPower}
                  fleetMineral={fleetMineral}
                  fleetMaxMineral={fleetMaxMineral}
                />
              </YourFleetCard>
              <BattleProgressCard>
                <Header>BATTLE PROGRESS</Header>
              </BattleProgressCard>
            </RightCol>
          </Content>
        </Body>
      </Row>
    </Page>
  )
}

export default Location
