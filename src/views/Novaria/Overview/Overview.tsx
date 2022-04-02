import React, { useContext } from 'react'
import styled from 'styled-components'
import {
  useGetBattlesAtLocation,
  useGetPlayerBattleStatus,
  useGetFleetLocation,
  useGetFleetMineral,
  useGetMaxMineralCapacity,
  useGetPlayer,
  useGetPlayerCount,
  useGetFleetMineralRefined,
  useGetFleetSize,
  useGetMaxFleetSize,
  useGetAttackPower,
  useGetMiningCapacity,
  useGetCurrentMiningCooldown,
  useGetCurrentTravelCooldown,
  useGetPlayerBattle,
  useGetShipyards,
  useGetShipClasses,
  useGetShips
} from 'hooks/useNovaria'
import { ConnectedAccountContext } from 'App'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'
import YourFleetStats from '../Location/YourFleetStats'
import OpenBattlesTable from '../Location/OpenBattlesTable'
import ShipyardList from './ShipyardStats/ShipyardList'
import logo from '../assets/novariaLogoMain.png'

const Page = styled.div`
  background-size: cover;
  color: #5affff;
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
`
 
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-wrap: nowrap;
  }
`
const Body = styled.div`
  margin: 20px 10px 200px 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  border: 1px solid #5affff;
  padding: 10px;
  color: white;
  
`

const Header = styled.div`
  font-size: 20px;
  padding-bottom: 10px;
`

const Text = styled.div`
  font-size: 15px;
  text-align: left;
  max-width: 900px;
`

const OpenBattlesCard = styled.div`
  margin: 20px 10px;
  padding: 10px;
  // max-height: 50%;
  min-height: 200px;
  min-width: 350px
  max-width: 450px;
  border: 1px solid #5affff;
  background: #00000099;
  
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 450px;
  }
`

const StatsContainer = styled.div`
  margin: 20px 10px;
  padding: 10px;
  max-width: 450px;
  border: 1px solid #5affff;
  background: #00000099;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 450px;
  }
`

const StatsRow = styled.div`
  display:flex;
  justify-content: space-between;
  text-align: initial;
`

const StatsCol = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0px;

`

const StatsItem = styled.div`
  margin: 5px 0px;

`

const SubHeader = styled.div`
  font-size: 0.75rem;
  color: gray;
`

const StatsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #11427399;
  padding: 15;
  text-align: center;
`

const ShipyardSubHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  color: #289794;
`

const Overview: React.FC = () => {
  const account = useContext(ConnectedAccountContext)
  const fleetLocation = useGetFleetLocation(account)
  const fleetMineral = useGetFleetMineral(account)
  const mineralCapacity = useGetMaxMineralCapacity(account)
  const player = useGetPlayer(account.toString())
  const playerEXP = player.experience
  const playerName = player.name
  const playerBattleStatus = useGetPlayerBattleStatus(account)
  const refinedMineral = (useGetFleetMineralRefined(account)/10**18).toFixed(2)

  const fleetSize = useGetFleetSize(account)
  const maxFleetSize = useGetMaxFleetSize(account)
  const fleetPower = useGetAttackPower(account)
  const miningCapacity = useGetMiningCapacity(account)
  const currentTravelCooldown = new Date(useGetCurrentTravelCooldown(account) * 1000)
  const currentMiningCooldown = new Date(useGetCurrentMiningCooldown(account) * 1000)
  const playerBattleInfo = useGetPlayerBattle(account)
  const shipClasses = useGetShipClasses()
  const playerFleet = useGetShips(account)

  const shipyards = useGetShipyards()

  const playerCount = useGetPlayerCount()
  const currentTime = Math.round((new Date()). getTime() / 1000)
  const recentLocationBattles = useGetBattlesAtLocation(fleetLocation.X, fleetLocation.Y, 2, currentTime)

  return (
    <Page>
      <GameHeader
        location={fleetLocation}
        playerMineral={fleetMineral}
        playerMineralCapacity={mineralCapacity}
        exp={playerEXP}
        playerName={playerName}
      />
      <Row>
        <GameMenu pageName="overview" />
        <Body>
          <div style={{ background: '#11427399', padding: 15, textAlign: 'center' }}>
            <img src={logo} style={{}} alt="novaria logo" />
            <Header>Welcome to the Legend of Novaria</Header>
            <Text>
              You are about to embark on a journey to explore the world of Novaria.
              The mysterious Draken forces have pushed Humanity to the edge of the galaxy. They have been repelled for now, but we never know when they will strike again.
              <br />
              <br />
              By building ships, mining planets, and refining mineral into NOVA, you can help humanity rebuild. Along the way, you will meet friends and foes - are you cunning enough to figure out who will help you or destroy you?            
              <br />
              <br />
              The journey will be perilous - the challenges will seem insurmountable - but the time to act is NOW!  Are you ready to begin your mission?
              <br />
              <br />
              Good Luck!
              <br />
              <br />
              <a href='https://docs.shibanova.io/shibanova-documentation/legend-of-novaria' rel='noopener noreferrer' target='blank' style={{color:'#5affff'}}>[LEARN MORE]</a>
            </Text>
          </div>
          
          <StatsSection>
            
            <OpenBattlesCard>
              <Header>My Recent Battles</Header>
              <SubHeader>(Only shows battles at your current location)</SubHeader>
              <OpenBattlesTable
                battles={recentLocationBattles}
                status={playerBattleStatus}
                currentLocation
                resolved
                account={account}
              />
            </OpenBattlesCard>
            <StatsContainer>
              <Header>Stats</Header>
              <StatsRow>
                <StatsCol>
                  <StatsItem>Total Players: </StatsItem>
                  <StatsItem>My Total Refined Mineral: </StatsItem>
                </StatsCol>
                <StatsCol>
                  <StatsItem>{playerCount}</StatsItem>
                  <StatsItem>{refinedMineral}</StatsItem>
                </StatsCol>
              </StatsRow>
              <Header style={{marginTop:5}}>My Fleet</Header>
              <YourFleetStats 
                    playerBattleInfo={playerBattleInfo}
                    fleetSize={fleetSize}
                    maxFleetSize={maxFleetSize}
                    fleetPower={fleetPower}
                    miningCapacity={miningCapacity}
                    mineralCapacity={mineralCapacity}
                    shipClasses={shipClasses}
                    playerFleet={playerFleet}
                    currentTravelCooldown={currentTravelCooldown}
                    currentMiningCooldown={currentMiningCooldown}
                    fleetLocation={fleetLocation} />
            </StatsContainer>
            <StatsContainer>
              <Header>Shipyards</Header>
              <ShipyardSubHeader>
                <span style={{textAlign:'left'}} >Name</span>
                <span style={{textAlign:'right'}} >Location</span>
                <span style={{textAlign:'right'}} >Takeover?</span>
              </ShipyardSubHeader>
                {shipyards.map((shipyard) => {
                  return(
                    <ShipyardList shipyard={shipyard} />
                  )
                })}

            </StatsContainer>
          </StatsSection>
        </Body>
      </Row>
    </Page>
  )
}

export default Overview
