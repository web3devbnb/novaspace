import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import { usePriceCakeBusd } from '../../../state/hooks'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getCakeAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'
import SnovaStats from './sNovaStats'

const StyledSNovaStakingCard = styled(Card)`
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
  margin-right: 0px;
  margin-left: 0px;
  border-radius: 30px;
  background-color: transparent;
  text-align: center;
  border: 1px;
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
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const eggPrice = usePriceCakeBusd().toNumber()
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

  return (
    <StyledSNovaStakingCard>
      <CardBody>
        <Heading
          size="xl"
          mb="0px"
          style={{
            textShadow: '2px 2px 10px #d4af3780, -2px -2px 10px #d4af3780 ',
          }}
        >
          sNova Stats
        </Heading>
        <CardImage src="/images/tokens/snova.png" alt="snova logo" width={128} height={128} />
        <Block>
          <Label style={{ paddingTop: '25px' }}>Pending sNOVA</Label>
          <CakeHarvestBalance earningsSum={earningsSum} />
        </Block>
        <Block>
          <Label>sNOVA Balance</Label>
          <CakeWalletBalance cakeBalance={cakeBalance} />
        </Block>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              fullWidth
            >
              {pendingTx ? 'Collecting Nova' : TranslateString(999, `Harvest all (${balancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton fullWidth />
          )}
        </Actions>
        <SnovaStats />
      </CardBody>
    </StyledSNovaStakingCard>
  )
}

export default SNovaedStakingCard
