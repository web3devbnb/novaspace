import React, { useContext } from 'react'
import styled from 'styled-components'
import { useGetFleetLocation, useGetFleetMineral, useGetPlayer } from 'hooks/useNovaria'
import { ConnectedAccountContext } from 'App'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'
import logo from '../assets/novariaLogoMain.png'

const Page = styled.div`
  background-image: url('/images/novaria/shipyardBG.jpg');
  background-size: cover;
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
  margin: 40px 50px 200px 50px;
  // background: #0000ae80;
  //height: 500px;
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

const Overview: React.FC = () => {
  const account = useContext(ConnectedAccountContext)
  const fleetLocation = useGetFleetLocation(account)
  const fleetMineral = useGetFleetMineral(account)
  const playerEXP = useGetPlayer(account.toString()).experience

  return (
    <Page>
      <GameHeader location={fleetLocation} playerMineral={fleetMineral} exp={playerEXP} />
      <Row>
        <GameMenu pageName="overview" />
        <Body>
          <div style={{ background: '#11427399', padding: 15, textAlign: 'center' }}>
            <img src={logo} style={{}} alt="novaria logo" />
            <Header>Welcome to the Legend of Novaria</Header>
            <Text>
              This is the testing phase of the game, so it&apos;s important to know that the game can be reset at any
              moment, and all progress and in game purchases will be lost. The point of testing is not to make money,
              but to find bugs and help us get them fixed!
              <br />
              <br />
              Normally, the overview page would have some game stats (implemented soon) and news. If you are unsure of
              how to start your adventure, we suggest heading over to the shipyard and building some ships! You will
              need a fleet size of at least 25 to be able to travel anywhere.
              <br />
              <br />
              The basic premise of the game is to build ships, travel to mining planets, and harvest mineral to refine
              into NOVA! However, the trip can be dangerous! The only safe location is a planet with a refinery.
              Everywhere else, Players can attack each other and destroy each other&apos;s ships to create salvage.
              Salvage can be collected by your mining ships and stored as mineral to also be refined into NOVA.
              <br />
              <br />
              Good Luck!
            </Text>
          </div>
        </Body>
      </Row>
    </Page>
  )
}

export default Overview
