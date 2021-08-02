import React, { useState } from 'react'
import { Card, CardBody, Heading, Text, Button, useModal, Flex, CardHeader } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import {
  useMoneyPotBNBReward,
  useMoneyPotBUSDReward,
  useDistributedMoneyPotBNB,
  useDistributedMoneyPotBUSD,
} from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { useHarvestRewards } from 'hooks/useHarvest'
import { useSwapToNova } from 'hooks/useUnstake'
import { getNovaAddress, getSNovaAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import useTokenBalance from '../../../hooks/useTokenBalance'
import StatsCard from './StatsCard'
import Stats from './Stats'

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin: 8px;
`

const CardImage = styled.img`
  margin-bottom: 0px;
  margin-top: 0px;
  margin: auto;
  align-items: center;
  text-align: center;
`

const Actions = styled.div`
  margin-top: 24px;
`
const MoneyedPotCard = () => {
  const TranslateString = useI18n()
  const bnbReward = useMoneyPotBNBReward()
  const busdReward = useMoneyPotBUSDReward()
  const distributedMoneyPotWBNB = useDistributedMoneyPotBNB()
  const distributedMoneyPotBUSD = useDistributedMoneyPotBUSD()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestRewards()

  return (
    <StatsCard title="My Rewards">
      <Row style={{ justifyContent: 'center' }}>
        <div style={{ padding: '0 10px' }}>
          <CardImage src="/images/farms/bnb.png" alt="bnb logo" width={120} height={120} />
          <Text fontSize="24px">{TranslateString(999, 'BNB ')}</Text>
          <CardValue fontSize="20px" value={getBalanceNumber(bnbReward)} decimals={3} />
        </div>
        <div style={{ padding: '0 10px' }}>
          <CardImage src="/images/farms/busd.png" alt="busd logo" width={120} height={120} />
          <Text fontSize="24px">{TranslateString(999, ' BUSD ')}</Text>
          <CardValue fontSize="20px" value={getBalanceNumber(busdReward)} decimals={3} />
        </div>
      </Row>
      <Row style={{ paddingTop: '20px' }}>
        <Button
          fullWidth
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
      <div>
        <Heading
          size="lg"
          style={{
            textShadow: 'rgba(56, 255, 0, 0.58) 2px 2px 8px, rgba(0, 255, 0, 0.584) -2px -2px 8px',
            padding: '20px 15px 0',
          }}
        >
          Total Rewards
        </Heading>
        <Stats
          stats={[
            { label: TranslateString(999, 'Total BNB'), value: distributedMoneyPotWBNB[0] },
            { label: TranslateString(999, 'BNB/sNOVA'), value: distributedMoneyPotWBNB[1] },
            { label: TranslateString(999, 'Total BUSD'), value: distributedMoneyPotBUSD[0] },
            { label: TranslateString(999, 'BUSD/sNOVA'), value: distributedMoneyPotBUSD[1] },
            { label: TranslateString(999, 'Last Reward Block'), value: distributedMoneyPotBUSD[2] },
          ]}
        />
      </div>
    </StatsCard>
  )
}

export default MoneyedPotCard
