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
} from 'hooks/useNovaria'
import { ConnectedAccountContext } from 'App'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'
import OpenBattlesTable from '../Location/OpenBattlesTable'
import logo from '../assets/novariaLogoMain.png'

const Page = styled.div`
  background-size: cover;
  color: #5affff;
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
`

const Row = styled.div`
  flex-wrap: wrap;
  display: flex;
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
`

const OpenBattlesCard = styled.div`
  margin: 20px 10px;
  padding: 10px;
  max-height: 45%;
  min-height: 200px;
  min-width: 350px
  max-width: 450px;
  border: 1px solid #5affff;
  background: #00000099;
  
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 450px;
  }
`

const SubHeader = styled.div`
  font-size: 0.75rem;
  color: gray;
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

  const playerCount = useGetPlayerCount()
  const recentLocationBattles = useGetBattlesAtLocation(fleetLocation.X, fleetLocation.Y, 1)

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
              This is the testing phase of the game, so it&apos;s important to know that the game can be reset at any
              moment, and all progress and in game purchases will be lost. However, it is still definitely possible to 
              earn NOVA and make a profit!
              <br />
              <br />
              If you are unsure of
              how to start your adventure, we suggest heading over to the shipyard and building ships at Haven! You will
              need a fleet size of at least 25 to be able to travel anywhere.
              <br />
              <br />
              The basic premise of the game is to build ships, travel to mining planets, and harvest mineral to refine
              into NOVA! However, the trip can be dangerous! The only safe location is a planet with a refinery.
              Everywhere else, Players can attack each other and destroy each other&apos;s ships to create salvage.
              Salvage can be collected by your mining ships and stored as mineral to be refined into NOVA.
              <br />
              <br />
              Good Luck!
            </Text>
          </div>
          <div style={{ background: '#11427399', padding: 15, textAlign: 'center' }}>
            Total Players: {playerCount}
            <OpenBattlesCard>
              <Header>Your Recent Battles</Header>
              <SubHeader>(Only shows battles at your current location)</SubHeader>
              <OpenBattlesTable
                battles={recentLocationBattles}
                status={playerBattleStatus}
                currentLocation
                resolved
                account={account}
              />
            </OpenBattlesCard>
          </div>
        </Body>
      </Row>
    </Page>
  )
}

export default Overview
