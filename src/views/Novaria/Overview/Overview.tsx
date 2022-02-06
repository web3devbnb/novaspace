import React from 'react'
import styled from 'styled-components'
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
`

const Overview: React.FC = () => {
  return (
    <Page>
      <GameHeader>MAP</GameHeader>
      <Body>
        <GameMenu pageName="overview" />
      </Body>
    </Page>
  )
}

export default Overview
