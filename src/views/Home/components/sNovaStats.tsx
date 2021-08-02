import React from 'react'
import { Card, CardBody, Heading, Text, Button, useModal } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSNovaPenalty, useSNovaTotalSupply, useSNovaBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getSNovaAddress } from 'utils/addressHelpers'
import { useSwapToNova } from 'hooks/useUnstake'
import SwapToNovaModal from './SwapToNovaModal'
import useTokenBalance from '../../../hooks/useTokenBalance'
import CardValue from './CardValue'

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

const SnovaStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useSNovaTotalSupply()
  const burnedBalance = useSNovaBurnedBalance(getSNovaAddress())

  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const novaSupply = getBalanceNumber(circSupply)
  const sNovaBalance = useTokenBalance(getSNovaAddress())
  const { onUnstake } = useSwapToNova()
  const [onPresentSwapToNova] = useModal(<SwapToNovaModal max={sNovaBalance} onConfirm={onUnstake} tokenName="sNova" />)
  const swapPenalty = useSNovaPenalty()
  const penalty = Number(swapPenalty)/10**10

  return (
    <StyledNovaStats>
      <CardBody>
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
        <Row style={{ paddingTop: '10px' }}>
          <Button onClick={onPresentSwapToNova}>{TranslateString(999, 'Swap to Nova')}</Button>

          
          <Text fontSize="14px" >{penalty.toFixed(2)}% {TranslateString(999, 'Penalty')}</Text>
          
        </Row>
      </CardBody>
    </StyledNovaStats>
  )
}

export default SnovaStats
