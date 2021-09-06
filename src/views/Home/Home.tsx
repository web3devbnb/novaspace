import React from 'react'
import styled from 'styled-components'
import { BaseLayout } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import Header from 'components/Header'
import FarmStakingCard from './components/FarmStakingCard'
import Divider from './components/Divider'
import SNovaStakingCard from './components/sNovaStakingCard'

import MoneyedPotCard from './components/MoneyPotCard'

const Cards = styled(BaseLayout)`
  justify-content: center;
  margin-bottom: 48px;
  margin-top: 32px;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-gap: 50px;
    padding: 0 25px;
  }

  & > div {
    grid-column: span 8;
    width: 100%;

    ${({ theme }) => theme.mediaQueries.md} {
      grid-column: span 4;
    }

    ${({ theme }) => theme.mediaQueries.xl} {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {
  return (
    <Page>
      <Header>DASHBOARD</Header>
      <Divider />
      <Cards>
        <FarmStakingCard />
        <SNovaStakingCard />
        <MoneyedPotCard />
      </Cards>
    </Page>
  )
}

export default Home
