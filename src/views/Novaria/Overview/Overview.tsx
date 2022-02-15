import React, { useContext, useState } from 'react'
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

const Page = styled.div`
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
  margin: 10px 50px 10px 150px;
  // background: #00000080;
  height: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`

const Overview: React.FC = () => {
  const account = useContext(ConnectedAccountContext)
  const fleetLocation = useGetFleetLocation(account)
  const fleetMineral = useGetFleetMineral(account)


  return (
    <Page>
      <GameHeader location={fleetLocation} playerMineral={fleetMineral} />
      <Row>
          <GameMenu pageName="overview" />
        <Body>
          <p>
            Welcome to the Legend of Novaria! This is the testing phase of the game, 
            so it&apos;s important to know that the game can be reset at any moment, 
            and all progress and spent nova will be lost. The point of testing is not 
            to make money, but to find bugs and help us get them fixed!
          </p><br />
          <p>
            Normally, the overview page would have some game stats (implemented soon) 
            and news. If you are unsure of how to start your adventure, we suggest 
            heading over to the shipyard and building some ships! You will need a fleet 
            size of at least 25 to be able to travel anywhere. 
          </p><br />
          <p>
            The basic premise of the game is to build ships, travel to mining planets,
            and harvest mineral to refine into NOVA! However, the trip can be dangerous!
            The only safe location is a planet with a refinery. Everywhere else, Players 
            can attack each other and destroy each other&apos;s ships to create salvage. 
            Salvage can be collected by your mining ships and stored as mineral to also 
            be refined into NOVA. 
          </p><br />
          <p>
            Good Luck!
          </p>
        </Body>
      </Row>
    </Page>
  )
}

export default Overview
