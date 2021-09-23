import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { Timeline } from 'react-twitter-widgets'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getNovaAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms } from '../../../state/hooks'
import StatsCard from './StatsCard'


const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin: 8px 0;
`

const CardImage = styled.img`
  margin-bottom: 0px;
  margin-top: 0px;
  margin: auto;
  align-items: center;
  text-align: center;
`

const VaultCard = () => {
  const TranslateString = useI18n()

  return (
    <StatsCard title="Vaults">
      <CardBody>
       <Text>CuedeOil and AutoShark - make pretty</Text>
      </CardBody>
    </StatsCard>
  )
}

export default VaultCard
