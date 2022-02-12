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
<<<<<<< HEAD
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;

`
=======
  // display: flex;
`

const LocationInfo = styled.div`
  height: 100%;
  margin: 15px 25px;
`
const LocationHeader = styled.text`
  color: white;
  font-weight: bold;
  font-size: 18px;
  margin-top: 100px;
`

const HavenImageCard = styled.div`
  background-image: url('/images/novaria/haven.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(300px, 300px, 300px);
`
const PlanetImageCard = styled.div``
const PlanetInfoCard = styled.div``
>>>>>>> 85802673c63a683ea28ad87a021a7b9b4958e3fa

const OpenBattlesCard = styled.div`
  background-image: url('/images/novaria/locationTableBorder.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 20px 10px;
  padding: 10px;
  max-height: 45%;
  min-height: 200px;
<<<<<<< HEAD
  min-width: 350px
  max-width: 450px;
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 450px;
  }



=======
  max-width: 400px;
>>>>>>> 85802673c63a683ea28ad87a021a7b9b4958e3fa
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
    <Page className='fontsforweb_bignoodletitling'>
      <GameHeader location={location} playerMineral={fleetMineral} />
      <Row>
        <GameMenu pageName="location" />
        <Body>
          <Content>
            <LocationCard 
              placename={placeInfo.name} 
              placetype={placeInfo.type} 
              placeX={location.X} 
              placeY={location.Y} 
              mineral={placeInfo.mineral} 
              salvage={placeInfo.scrap} 
              shipyard={placeInfo.shipyard} 
              refinery={placeInfo.refinery} 
            />
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
