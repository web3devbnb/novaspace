import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceNovaBusd } from 'state/hooks'
import styled from 'styled-components'
import useStake from '../../../../hooks/useStake'
import HarvestButton from '../../../Home/components/HarvestButton'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { onStake } = useStake(pid)

  const rawEarningsBalance = getBalanceNumber(earnings)
  const novaPrice = usePriceNovaBusd().toNumber()
  const displayBalance = rawEarningsBalance.toLocaleString()
  const earnedValue = (Number(displayBalance) * novaPrice).toLocaleString(undefined, {
    style: 'decimal',
    maximumFractionDigits: 2,
  })
  console.log('earned value', earnedValue)
  console.log('nova price', novaPrice)
  console.log('displayBalance', Number(displayBalance))
  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>
        {displayBalance} (${earnedValue})
      </Heading>
      <BalanceAndCompound>
        {/* {pid === 5 ? //0716 */}
        {pid === 0 ? (
          <Button
            disabled={rawEarningsBalance === 0 || pendingTx}
            size="sm"
            variant="secondary"
            marginBottom="15px"
            onClick={async () => {
              setPendingTx(true)
              await onStake(rawEarningsBalance.toString())
              setPendingTx(false)
            }}
          >
            {TranslateString(999, 'Compound')}
          </Button>
        ) : null}
        <HarvestButton
          disabled={rawEarningsBalance === 0 || pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            setPendingTx(false)
          }}
        >
          {TranslateString(999, 'Harvest')}
        </HarvestButton>
      </BalanceAndCompound>
    </Flex>
  )
}

export default HarvestAction
