import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
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
  useGetPlayerBattle,
  useGetPlayerBattleStatus,
  useGetCurrentTravelCooldown,
  useGetPlayer,
  useGetCurrentMiningCooldown,
} from 'hooks/useNovaria'
import { ConnectedAccountContext } from 'App'
import { Text } from '@pancakeswap-libs/uikit'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'
import LocationCard from './LocationCard'
import OpenBattlesTable from './OpenBattlesTable'
import PlayersTable from './PlayersTable'
import YourFleetStats from './YourFleetStats'
import BattleStatus from './BattleStatus'

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
  background: #00000050;

  ${({ theme }) => theme.mediaQueries.lg} {
    // fix background later
    background: transparent;
    background-image: url('/images/novaria/border.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 10px 10px 10px 10px;
    padding: 15px;
  }
`

const Header = styled(Text)`
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

const LeftCol = styled.div``
const CenterCol = styled.div``

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
const BattleProgressCard = styled.div`
  margin-top: 10px;
`

const Location: React.FC = () => {
  const account = useContext(ConnectedAccountContext)

  const fleetLocation = useGetFleetLocation(account)
  const location = useLocation()
  const loadedCoords =
    typeof location.state === 'undefined' ? { x: fleetLocation.X, y: fleetLocation.Y } : location.state[0]

  const [placeX, setX] = useState(loadedCoords.x)
  const [placeY, setY] = useState(loadedCoords.y)

  const placeInfo = useGetPlaceInfo(placeX, placeY)
  console.log('PLACE INFO', placeInfo)
  const battlesAtLocation = useGetBattlesAtLocation(placeX, placeY)
  console.log('battles at location', battlesAtLocation)

  const fleetsAtLocation = useGetFleetsAtLocation(placeX, placeY)

  const fleetSize = useGetFleetSize(account)
  const fleetPower = useGetAttackPower(account)
  const fleetMineral = useGetFleetMineral(account)
  const fleetMaxMineral = useGetMaxMineralCapacity(account)
  const currentTravelCooldown = new Date(useGetCurrentTravelCooldown(account)*1000).toLocaleString()
  const currentMiningCooldown = new Date(useGetCurrentMiningCooldown(account)*1000).toLocaleString()
  const playerBattleStatus = useGetPlayerBattleStatus(account) 
  const playerBattleInfo = useGetPlayerBattle(account)
  const playerEXP = useGetPlayer(account.toString()).experience

  return (
    <Page className="fontsforweb_bignoodletitling">
      <GameHeader location={fleetLocation} playerMineral={fleetMineral} exp={playerEXP}/>
      <Row>
        <GameMenu pageName="location" />
        <Body>
          <Content>
            <LeftCol>
              <LocationCard
                placename={placeInfo.name}
                placetype={placeInfo.type}
                placeX={placeX}
                placeY={placeY}
                mineral={placeInfo.mineral}
                salvage={placeInfo.scrap}
                shipyard={placeInfo.shipyard}
                refinery={placeInfo.refinery}
                isMining={placeInfo.isMining}
                fleetLocation={fleetLocation}
              />
            </LeftCol>
            <CenterCol>
              <InputControl>
                SEARCH LOCATION:
                <CoordInput type="number" min="0" value={placeX} onChange={(e) => setX(parseFloat(e.target.value))} />
                ,
                <CoordInput type="number" min="0" value={placeY} onChange={(e) => setY(parseFloat(e.target.value))} />
              </InputControl>

              <OpenBattlesCard>
                <Header>OPEN BATTLES</Header>
                <OpenBattlesTable battles={battlesAtLocation} placeX={placeX} placeY={placeY} />
              </OpenBattlesCard>
              <PlayersCard>
                <Header>PLAYERS</Header>
                <PlayersTable players={fleetsAtLocation} />
              </PlayersCard>
            </CenterCol>
            <RightCol>
              <YourFleetCard>
                <Header>YOUR FLEET</Header>
                <YourFleetStats
                  fleetSize={fleetSize}
                  fleetPower={fleetPower}
                  fleetMineral={fleetMineral}
                  fleetMaxMineral={fleetMaxMineral}
                  currentTravelCooldown={currentTravelCooldown}
                  currentMiningCooldown={currentMiningCooldown}
                />
              </YourFleetCard>
              <BattleProgressCard>
                <Header>BATTLE PROGRESS</Header>
                <BattleStatus playerBattleInfo={playerBattleInfo} playerBattleStatus={playerBattleStatus} />
              </BattleProgressCard>
            </RightCol>
          </Content>
        </Body>
      </Row>
    </Page>
  )
}

export default Location
