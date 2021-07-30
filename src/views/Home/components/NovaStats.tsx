import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getNovaAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceNovaBusd } from '../../../state/hooks'

const StyledNovaStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  background: transparent;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const NovaStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getNovaAddress())
  const farms = useFarms()
  const eggPrice = usePriceNovaBusd()
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const novaSupply = getBalanceNumber(circSupply)
  const marketCap = eggPrice.times(circSupply)

  let NovaPerBlock = 0
  if (farms && farms[0] && farms[0].NovaPerBlock) {
    NovaPerBlock = new BigNumber(farms[0].NovaPerBlock).div(new BigNumber(10).pow(18)).toNumber()
  }

  return (
    <StyledNovaStats>
      <CardBody>
        <Row>
          <Text fontSize="14px">{TranslateString(10005, 'Market Cap')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total Minted')}</Text>
          {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply)} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total Burned')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(10004, 'Circulating Supply')}</Text>
          {novaSupply && <CardValue fontSize="14px" value={novaSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">NOVA/block</Text>
          <Text bold fontSize="14px">
            {NovaPerBlock}
          </Text>
        </Row>
      </CardBody>
    </StyledNovaStats>
  )
}

export default NovaStats
