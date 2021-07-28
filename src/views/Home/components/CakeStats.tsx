import React, { useState } from 'react'
import { Card, CardBody, Heading, Text, Button, useModal } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import {
  useTotalSupply,
  useBurnedBalance,
  useSNovaTotalSupply,
  useSNovaBurnedBalance,
  useMoneyPotBNBReward,
  useMoneyPotBUSDReward,
  useDistributedMoneyPotBNB,
  useDistributedMoneyPotBUSD
} from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { useHarvestRewards } from 'hooks/useHarvest'
import { useSwapToNova } from 'hooks/useUnstake'
import { getCakeAddress, getSNovaAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'
import SwapToNovaModal from './SwapToNovaModal'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const totalSNovaSupply = useSNovaTotalSupply()
  const burnedSNovaBalance = useSNovaBurnedBalance(getSNovaAddress())
  const farms = useFarms();
  const eggPrice = usePriceCakeBusd();
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = eggPrice.times(circSupply);
  const bnbReward = useMoneyPotBNBReward()
  const busdReward = useMoneyPotBUSDReward()
  const distributedMoneyPotWBNB = useDistributedMoneyPotBNB()
  const distributedMoneyPotBUSD = useDistributedMoneyPotBUSD()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestRewards()
  const sNovaBalance = useTokenBalance(getSNovaAddress())
  const { onUnstake } = useSwapToNova()

  const [onPresentSwapToNova] = useModal(
    <SwapToNovaModal max={sNovaBalance} onConfirm={onUnstake} tokenName="sNova" />,
  )

  let NovaPerBlock = 0;
  if(farms && farms[0] && farms[0].NovaPerBlock){
    NovaPerBlock = new BigNumber(farms[0].NovaPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'Egg Stats')}
        </Heading>
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
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New EGG/block')}</Text>
          <Text bold fontSize="14px">{NovaPerBlock}</Text>
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(999, 'Total SNova Minted')}</Text>
          {totalSNovaSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSNovaSupply)} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(999, 'Total SNova Burned')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedSNovaBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(999, 'Total BNB Reward')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(bnbReward)} decimals={3} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(999, 'Total BUSD Reward')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(busdReward)} decimals={3} />
        </Row>
        <Row>
          <Button
            disabled={pendingTx}
            onClick={async () => {
              setPendingTx(true)
              await onReward()
              setPendingTx(false)
            }}
          >
            {TranslateString(999, 'Harvest Rewards')}
          </Button>
        </Row>
        {/* BNB distributedMoneyPot */}
        <Row>
          <Text fontSize="14px">{TranslateString(999, 'Distributed Money Pot BNB tokenAmount')}</Text>
          {distributedMoneyPotWBNB[0]}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(999, 'Distributed Money Pot BNB accTokenPerShare')}</Text>
          {distributedMoneyPotWBNB[1]}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(999, 'Distributed Money Pot BNB lastRewardBlock')}</Text>
          {distributedMoneyPotWBNB[2]}
        </Row>
        {/* BUSD distributedMoneyPot */}
        <Row>
          <Text fontSize="14px">{TranslateString(999, 'Distributed Money Pot BUSD tokenAmount')}</Text>
          {distributedMoneyPotBUSD[0]}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(999, 'Distributed Money Pot BUSD accTokenPerShare')}</Text>
          {distributedMoneyPotBUSD[1]}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(999, 'Distributed Money Pot BUSD lastRewardBlock')}</Text>
          {distributedMoneyPotBUSD[2]}
        </Row>
        <Row>
          <Button
            onClick={onPresentSwapToNova}
          >
            {TranslateString(999, 'Swap to Nova')}
          </Button>
        </Row>

      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
