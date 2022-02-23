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
  useGetPlaceInfo,
  useGetPlayerBattle,
  useGetPlayerBattleStatus,
  useGetCurrentTravelCooldown,
  useGetPlayer,
  useGetCurrentMiningCooldown,
  useGetShipyards,
  useGetMaxFleetSize,
  useGetMaxMineralCapacity,
  useGetMiningCapacity,
  useGetShipClasses,
  useGetShips,
} from 'hooks/useNovaria'
import { ConnectedAccountContext } from 'App'
import { Text } from '@pancakeswap-libs/uikit'
import { getWeb3 } from 'utils/web3'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'
import LocationCard from './LocationCard'
import OpenBattlesTable from './OpenBattlesTable'
import PlayersTable from './PlayersTable'
import YourFleetStats from './YourFleetStats'
import BattleStatus from './BattleStatus'
import PlaceControls from './PlaceControls'
import ShipyardTakeover from './ShipyardTakeover'

const Page = styled.div`
  font-family: 'BigNoodle', sans-serif;

 // background-image: url('/images/novaria/mapBG.jpg');
  background-size: cover;

  font-size: 15px;
  color: #5affff;

  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
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
const TakeOverMenu = styled.div`
  margin: 10px;
  margin-left: 0px;
`
const BattleProgressCard = styled.div`
  margin-top: 10px;
`

const Location: React.FC = () => {
  const web3 = getWeb3()

  const account = useContext(ConnectedAccountContext)

  const shipClasses = useGetShipClasses()
  const playerFleet = useGetShips(account)

  const fleetLocation = useGetFleetLocation(account)
  const location = useLocation()
  const loadedCoords =
    typeof location.state === 'undefined' ? { x: fleetLocation.X, y: fleetLocation.Y } : location.state[0]

  const [placeX, setX] = useState(loadedCoords.x)
  const [placeY, setY] = useState(loadedCoords.y)

  const placeInfo = useGetPlaceInfo(placeX, placeY)
  const battlesAtLocation = useGetBattlesAtLocation(placeX, placeY)

  const fleetsAtLocation = useGetFleetsAtLocation(placeX, placeY)

  const fleetSize = useGetFleetSize(account)
  const maxFleetSize = useGetMaxFleetSize(account)
  const fleetPower = useGetAttackPower(account)
  const fleetMineral = useGetFleetMineral(account)
  const mineralCapacity = useGetMaxMineralCapacity(account)
  const miningCapacity = useGetMiningCapacity(account)
  const currentTravelCooldown = new Date(useGetCurrentTravelCooldown(account) * 1000)
  const currentMiningCooldown = new Date(useGetCurrentMiningCooldown(account) * 1000)
  const playerBattleStatus = useGetPlayerBattleStatus(account)
  const playerBattleInfo = useGetPlayerBattle(account)
  const player = useGetPlayer(account.toString())
  const playerEXP = player.experience
  const playerName = player.name
  const shipyards = useGetShipyards()
  const isDiscoverer = placeInfo.discoverer === account

  const currentLocation = fleetLocation.X === placeX.toString() && fleetLocation.Y === placeY.toString()

  return (
    <Page className="fontsforweb_bignoodletitling">
      <GameHeader location={fleetLocation} playerMineral={fleetMineral} exp={playerEXP}  playerName={playerName} />
      <Row>
        <GameMenu pageName="location" />
        <Body>
          <Content>
            <LeftCol>
              <LocationCard
                playerMineral={fleetMineral}
                fleetSize={fleetSize}
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
                canTravel={placeInfo.canTravel}
                currentLocation={currentLocation}
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
                <OpenBattlesTable battles={battlesAtLocation} status={playerBattleStatus} />
              </OpenBattlesCard>
              <PlayersCard>
                <Header>PLAYERS</Header>
                <PlayersTable players={fleetsAtLocation} playerBattleStatus={playerBattleStatus} />
              </PlayersCard>
            </CenterCol>
            <RightCol>
              <YourFleetCard>
                <Header>MY FLEET</Header>
                <YourFleetStats
                  fleetSize={fleetSize}
                  maxFleetSize={maxFleetSize}
                  fleetPower={fleetPower}
                  miningCapacity={web3.utils.fromWei(miningCapacity)}
                  mineralCapacity={web3.utils.fromWei(mineralCapacity)}
                  shipClasses={shipClasses}
                  playerFleet={playerFleet}
                  currentTravelCooldown={currentTravelCooldown}
                  currentMiningCooldown={currentMiningCooldown}
                />
              </YourFleetCard>
              <BattleProgressCard>
                <Header>BATTLE PROGRESS</Header>
                <BattleStatus playerBattleInfo={playerBattleInfo} playerBattleStatus={playerBattleStatus} />
              </BattleProgressCard>
              {shipyards
                .filter((shipyard) => shipyard.coordX === placeX.toString() && shipyard.coordY === placeY.toString())
                .map((shipyard) => (
                  <TakeOverMenu>
                    <Header>Shipyard Takeover</Header>
                    <ShipyardTakeover
                      account={account}
                      shipyard={shipyard}
                      placeX={placeX}
                      placeY={placeY}
                      refinery={placeInfo.refinery}
                    />
                  </TakeOverMenu>
                ))}
              <PlaceControls
                placeType={Number(placeInfo.type)}
                placeX={placeX}
                placeY={placeY}
                placeName={placeInfo.name}
                isDiscoverer={isDiscoverer}
              />
            </RightCol>
          </Content>
        </Body>
      </Row>
    </Page>
  )
}

export default Location
