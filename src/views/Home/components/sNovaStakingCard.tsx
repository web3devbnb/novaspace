import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, CardHeader } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useAllHarvest, useSNovaHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import useSNovaFarmsWithBalance from 'hooks/useSNovaFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import NovaHarvestBalance from './NovaHarvestBalance'
import NovaWalletBalance from './NovaWalletBalance'
import useSNovaEarnings from '../../../hooks/useSNovaEarnings'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getSNovaAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'
import SnovaStats from './sNovaStats'

const StyledCard = styled(Card)`
  text-align: center;
`

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

const SNovaedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const novaBalance = getBalanceNumber(useTokenBalance(getSNovaAddress()))
  const farmsSNovaWithBalance = useSNovaFarmsWithBalance()
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

  return (
    <StyledCard gradientBorder>
      <CardHeader>
        <Heading style={{ fontSize: 32 }} glowing>
          sNova Stats
        </Heading>
      </CardHeader>
      <CardBody>
        <CardImage src="/images/tokens/snova.png" alt="snova logo" width={128} height={128} />
        <Block>
          <Label style={{ paddingTop: '25px' }}>Pending sNOVA</Label>
          <NovaHarvestBalance earningsSum={earningsSNovaSum} />
        </Block>
        <Block>
          <Label>sNOVA Balance</Label>
          <NovaWalletBalance novaBalance={novaBalance} />
        </Block>
        <Actions>
          {account ? (
            <Button
            id="harvest-snova"
            disabled={balancesSNovaWithValue.length <= 0 || pendingTx}
            onClick={harvestSNovaFarms}
            fullWidth
            >
              {pendingTx
                ? TranslateString(999, 'Collecting sNOVA')
                : TranslateString(999, `Harvest all sNOVA (${balancesSNovaWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton fullWidth />
          )}
        </Actions>
        <SnovaStats />
      </CardBody>
    </StyledCard>
  )
}

export default SNovaedStakingCard
