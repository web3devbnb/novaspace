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

const StyledCard = styled(Card)`
  text-align: center;
`
const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin: 8px;
`

const Block = styled.div`
  margin-bottom: 0px;
`
const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
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
    <StyledCard gradientBorder>
      <CardHeader>
        <Heading style={{ fontSize: 32 }} glowing>
          My Rewards
        </Heading>
      </CardHeader>
      <CardBody>
        <Row>
          <CardImage src="/images/farms/bnb.png" alt="bnb logo" width={120} height={120} />
          <CardImage src="/images/farms/busd.png" alt="busd logo" width={120} height={120} />
        </Row>

        <Row>
          <CardValue fontSize="24px" value={getBalanceNumber(bnbReward)} decimals={3} />
          <Text fontSize="24px">{TranslateString(999, 'BNB ')}</Text>

          <CardValue fontSize="24px" value={getBalanceNumber(busdReward)} decimals={3} />
          <Text fontSize="24px">{TranslateString(999, ' BUSD ')}</Text>
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
            size="xl"
            mb="10px"
            style={{
              textShadow: '2px 2px 8px #00aaff95, -2px -2px 8px #00FF0095 ',
              padding: '20px',
            }}
          >
            Total Rewards
          </Heading>
          <Row>
            <Text fontSize="14px">{TranslateString(999, 'Total BNB')}</Text>
            {distributedMoneyPotWBNB[0]}
          </Row>
          <Row>
            <Text fontSize="14px">{TranslateString(999, 'BNB/sNOVA')}</Text>
            {distributedMoneyPotWBNB[1]}
          </Row>

          {/* BUSD distributedMoneyPot */}
          <Row>
            <Text fontSize="14px">{TranslateString(999, 'Total BUSD')}</Text>
            {distributedMoneyPotBUSD[0]}
          </Row>
          <Row>
            <Text fontSize="14px">{TranslateString(999, 'BUSD/sNOVA')}</Text>
            {distributedMoneyPotBUSD[1]}
          </Row>
          <Row>
            <Text fontSize="14px">{TranslateString(999, 'Last Reward Block')}</Text>
            {distributedMoneyPotBUSD[2]}
          </Row>
        </div>
      </CardBody>
    </StyledCard>
  )
}

export default MoneyedPotCard
