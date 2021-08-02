import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Button, Text, useModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import NovaHarvestBalance from './NovaHarvestBalance'
import NovaWalletBalance from './NovaWalletBalance'
import useTokenBalance, {
  useSNovaPenalty,
  useSNovaTotalSupply,
  useSNovaBurnedBalance,
} from '../../../hooks/useTokenBalance'
import { getSNovaAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'
import StatsCard from './StatsCard'
import SwapToNovaModal from './SwapToNovaModal'
import { useSwapToNova } from '../../../hooks/useUnstake'
import Stats from './Stats'

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const SNovaedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const novaBalance = getBalanceNumber(useTokenBalance(getSNovaAddress()))

  const totalSupply = useSNovaTotalSupply()
  const burnedBalance = useSNovaBurnedBalance(getSNovaAddress())

  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const novaSupply = getBalanceNumber(circSupply)

  const sNovaBalance = useTokenBalance(getSNovaAddress())
  const { onUnstake } = useSwapToNova()
  const [onPresentSwapToNova] = useModal(<SwapToNovaModal max={sNovaBalance} onConfirm={onUnstake} tokenName="sNova" />)
  const swapPenalty = useSNovaPenalty()
  const penalty = Number(swapPenalty) / 10 ** 10

  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  const stats = [
    { label: TranslateString(536, 'Total Minted'), value: getBalanceNumber(totalSupply) },
    { label: TranslateString(538, 'Total Burned'), value: getBalanceNumber(burnedBalance) },
    { label: TranslateString(10004, 'Circulating Supply'), value: novaSupply },
  ]

  return (
    <StatsCard
      actions={
        account ? (
          <Row>
            <Button onClick={onPresentSwapToNova}>{TranslateString(999, 'Swap to NOVA')}</Button>
            <Text fontSize="14px">
              {penalty.toFixed(2)}% {TranslateString(999, 'Penalty')}
            </Text>
          </Row>
        ) : null
      }
      title="sNOVA Stats"
    >
      <img src="/images/tokens/snova.png" alt="snova logo" width={128} height={128} />
      <div>
        <Label style={{ paddingTop: '25px' }}>Pending sNOVA</Label>
        <NovaHarvestBalance earningsSum={earningsSum} />
      </div>
      <div>
        <Label>sNOVA Balance</Label>
        <NovaWalletBalance novaBalance={novaBalance} />
      </div>
      <Actions>
        {account ? (
          <Button
            id="harvest-all"
            disabled={balancesWithValue.length <= 0 || pendingTx}
            onClick={harvestAllFarms}
            fullWidth
          >
            {pendingTx ? 'Collecting sNOVA' : TranslateString(999, `Harvest all (${balancesWithValue.length})`)}
          </Button>
        ) : (
          <UnlockButton fullWidth />
        )}
      </Actions>
      <Stats stats={stats} />
    </StatsCard>
  )
}

export default SNovaedStakingCard
