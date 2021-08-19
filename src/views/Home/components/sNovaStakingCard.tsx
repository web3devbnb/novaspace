import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Button, Text, useModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useAllHarvest, useSNovaHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import useSNovaFarmsWithBalance from 'hooks/useSNovaFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import NovaHarvestBalance from './NovaHarvestBalance'
import NovaWalletBalance from './NovaWalletBalance'
import useTokenBalance, {
  useSNovaPenalty,
  useSNovaTotalSupply,
  useSNovaBurnSupply,
  useBurnedBalance,
} from '../../../hooks/useTokenBalance'
import { getSNovaAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'
import StatsCard from './StatsCard'
import SwapToNovaModal from './SwapToNovaModal'
import { useSwapToNova } from '../../../hooks/useUnstake'
import Stats from './Stats'
import useSNovaEarnings from '../../../hooks/useSNovaEarnings'
import HarvestButton from './HarvestButton'
import QuestionHelper from '../../../components/QuestionHelper'

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const SNovaStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const farmsSNovaWithBalance = useSNovaFarmsWithBalance()
  const totalSupply = useSNovaTotalSupply()
  const burnedBalance = useSNovaBurnSupply()
  const burnedNova = burnedBalance ? getBalanceNumber(burnedBalance) : 0
  const fakeburn = useBurnedBalance(getSNovaAddress())

  const theSupply = totalSupply ? totalSupply.minus(fakeburn) : new BigNumber(0)
  const circSupply = getBalanceNumber(theSupply)

  const mintedSupply = totalSupply ? totalSupply.minus(-burnedBalance) : new BigNumber(0)
  const minted = getBalanceNumber(mintedSupply)

  const sNovaBalance = useTokenBalance(getSNovaAddress())
  const { onUnstake } = useSwapToNova()
  const swapPenalty = useSNovaPenalty()
  const penalty = (Number(swapPenalty) / 10 ** 10).toFixed(2)
  const [onPresentSwapToNova] = useModal(
    <SwapToNovaModal penalty={penalty} max={sNovaBalance} onConfirm={onUnstake} tokenName="sNOVA" />,
  )

  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const snovaEarnings = useSNovaEarnings()
  const earningsSNovaSum = snovaEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)

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

  const balancesSNovaWithValue = farmsSNovaWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)
  const { onSNovaReward } = useSNovaHarvest(balancesSNovaWithValue.map((farmWithBalance) => farmWithBalance.pid))
  const harvestSNovaFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onSNovaReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onSNovaReward])

  const stats = [
    { label: TranslateString(536, 'Total Minted'), value: minted },
    { label: TranslateString(538, 'Total Burned'), value: burnedNova },
    { label: TranslateString(10004, 'Circulating Supply'), value: circSupply },
  ]

  return (
    <StatsCard
      actions={
        account && sNovaBalance.comparedTo(0) > 0 ? (
          <Row>
            <Button onClick={onPresentSwapToNova}>{TranslateString(999, 'Swap to NOVA')}</Button>
            <Text fontSize="14px">
              {penalty}% {TranslateString(999, 'Penalty')}
            </Text>
          </Row>
        ) : null
      }
      title="sNOVA Stats"
    >
      <img src="/images/tokens/snova.png" alt="snova logo" width={128} height={128} />
      <div>
        <Label style={{ paddingTop: '25px' }}>Pending sNOVA</Label>
        <NovaHarvestBalance earningsSum={earningsSNovaSum} />
      </div>
      <div>
        <Label>
          sNOVA Balance
          <QuestionHelper
            text={TranslateString(
              999,
              'sNOVA is the share token for ShibaNova. Holders get rewarded with dividends from the Money Pot. sNOVA can only be obtained through NOVA-BNB and NOVA-BUSD farms.',
            )}
          />
        </Label>
        <NovaWalletBalance novaBalance={getBalanceNumber(sNovaBalance)} />
      </div>
      <Actions>
        {account ? (
          <HarvestButton
            id="harvest-snova"
            disabled={balancesSNovaWithValue.length <= 0 || pendingTx}
            onClick={harvestSNovaFarms}
            fullWidth
          >
            {pendingTx
              ? TranslateString(999, 'Collecting sNOVA')
              : TranslateString(999, `Harvest all sNOVA (${balancesSNovaWithValue.length})`)}
          </HarvestButton>
        ) : (
          <UnlockButton fullWidth />
        )}
      </Actions>
      <Stats stats={stats} />
    </StatsCard>
  )
}

export default SNovaStakingCard
