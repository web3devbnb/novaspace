import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import SNovaStakingCard from './sNovaStakingCard'
import FarmStakingCard from './FarmStakingCard'

const StyledStatsCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  background: transparent;
`
const StatsCard = () => {
    const TranslateString = useI18n()
return (
    <StyledStatsCard>
      
        <SNovaStakingCard />
        <FarmStakingCard />
        
      
    </StyledStatsCard>
  )
}

export default StatsCard
