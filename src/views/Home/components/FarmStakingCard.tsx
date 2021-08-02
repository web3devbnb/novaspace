import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Button } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import NovaHarvestBalance from './NovaHarvestBalance'
import NovaWalletBalance from './NovaWalletBalance'
import { usePriceNovaBusd, useFarms } from '../../../state/hooks'
import useTokenBalance, { useTotalSupply, useBurnedBalance } from '../../../hooks/useTokenBalance'
import { getNovaAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'
import StatsCard from './StatsCard'
import Stats from './Stats'

const Block = styled.div`
  margin-bottom: 0px;
`

const CardImage = styled.img`
  margin-bottom: 0px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const novaBalance = getBalanceNumber(useTokenBalance(getNovaAddress()))
  const eggPrice = usePriceNovaBusd().toNumber()
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

  // Stats
  const farms = useFarms()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getNovaAddress())
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const novaSupply = getBalanceNumber(circSupply)
  const marketCap = usePriceNovaBusd().times(circSupply)

  let NovaPerBlock = '0'

  if (farms[0]?.NovaPerBlock) {
    NovaPerBlock = new BigNumber(farms[0].NovaPerBlock).div(new BigNumber(10).pow(18)).toFixed(2)
  }

  const stats = [
    { label: TranslateString(10005, 'Market Cap'), value: getBalanceNumber(marketCap) },
    { label: TranslateString(536, 'Total Minted'), value: getBalanceNumber(totalSupply) },
    { label: TranslateString(538, 'Total Burned'), value: getBalanceNumber(burnedBalance) },
    { label: TranslateString(10004, 'Circulating Supply'), value: novaSupply },
    { label: 'NOVA/block', value: NovaPerBlock },
  ]

  return (
    <StatsCard title="NOVA Stats">
      <CardImage src="/images/tokens/nova.png" alt="nova logo" width={128} height={128} />
      <Block>
        <Label>Pending NOVA</Label>
        <NovaHarvestBalance earningsSum={earningsSum} />
        <Label>~${(eggPrice * earningsSum).toFixed(2)}</Label>
      </Block>
      <Block>
        <Label>NOVA Balance</Label>
        <NovaWalletBalance novaBalance={novaBalance} />
        <Label>~${(eggPrice * novaBalance).toFixed(2)}</Label>
      </Block>
      <Actions>
        {account ? (
          <Button
            id="harvest-all"
            disabled={balancesWithValue.length <= 0 || pendingTx}
            onClick={harvestAllFarms}
            fullWidth
          >
            {pendingTx ? 'Collecting NOVA' : TranslateString(999, `Harvest all (${balancesWithValue.length})`)}
          </Button>
        ) : (
          <UnlockButton fullWidth />
        )}
      </Actions>
      <Stats stats={stats} />
    </StatsCard>
  )
}

export default FarmedStakingCard
