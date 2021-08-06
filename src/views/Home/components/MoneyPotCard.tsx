import React, { useState } from 'react'
import { Card, CardBody, Heading, Text, useModal, Flex, Link } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import {
  useMoneyPotBNBReward,
  useMoneyPotBUSDReward,
  useDistributedMoneyPotBNB,
  useDistributedMoneyPotBUSD,
  useNextMoneyPot,
} from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { useHarvestRewards } from 'hooks/useHarvest'
import { useSwapToNova } from 'hooks/useUnstake'
import { getNovaAddress, getSNovaAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import useTokenBalance from '../../../hooks/useTokenBalance'
import StatsCard from './StatsCard'
import Stats from './Stats'

import UnlockButton from '../../../components/UnlockButton'
import HarvestButton from './HarvestButton'

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

const NextMoneyPotCard = styled(Text)`
  position: relative;
  font-size: 12px;
  padding: 10px;
  border-radius: 32px;
  background-clip: padding-box;
  border: solid 1px ${({ theme }) => theme.colors.primary};

  & > a {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const MoneyPotCard = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const bnbReward = useMoneyPotBNBReward()
  const busdReward = useMoneyPotBUSDReward()
  const distributedMoneyPotWBNB = useDistributedMoneyPotBNB()
  const distributedMoneyPotBUSD = useDistributedMoneyPotBUSD()
  const nextMoneyPot = useNextMoneyPot()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestRewards()

  const sendTx = async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      console.log('Error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  return (
    <StatsCard title="My Rewards">
      <Row style={{ justifyContent: 'center' }}>
        <div style={{ padding: '0 10px' }}>
          <CardImage src="/images/farms/bnb.png" alt="bnb logo" width={120} height={120} />
          <Text bold fontSize="20px">
            {TranslateString(999, 'BNB ')}
          </Text>
          <CardValue fontSize="18px" value={getBalanceNumber(bnbReward)} decimals={3} />
        </div>
        <div style={{ padding: '0 10px' }}>
          <CardImage src="/images/farms/busd.png" alt="busd logo" width={120} height={120} />
          <Text bold fontSize="20px">
            {TranslateString(999, ' BUSD ')}
          </Text>
          <CardValue fontSize="18px" value={getBalanceNumber(busdReward)} decimals={3} />
        </div>
      </Row>
      <Row style={{ paddingTop: '20px' }}>
        {account ? (
          <HarvestButton
            fullWidth
            disabled={bnbReward?.toNumber() === 0 || busdReward?.toNumber() === 0 || pendingTx}
            onClick={sendTx}
          >
            {TranslateString(999, 'Harvest Rewards')}
          </HarvestButton>
        ) : (
          <UnlockButton fullWidth />
        )}
      </Row>
      <div>
        <Heading
          size="lg"
          style={{
            textShadow: 'rgba(56, 255, 0, 0.58) 2px 2px 8px, rgba(0, 255, 0, 0.584) -2px -2px 8px',
            padding: '20px 15px 0',
          }}
        >
          Moneypot
        </Heading>
        <Stats
          stats={[
            {
              label: TranslateString(999, 'Total Value'),
              value: getBalanceNumber(distributedMoneyPotWBNB[0]),
            },
            { label: TranslateString(999, '$ per sNOVA'), value: getBalanceNumber(distributedMoneyPotWBNB[1]) },
            { label: TranslateString(999, 'Last Reward Block'), value: distributedMoneyPotBUSD[2] },
          ]}
        />
        <NextMoneyPotCard>
          Next Moneypot starts rewarding at block{' '}
          <a target="_blank" rel="noreferrer" href={`https://bscscan.com/block/${nextMoneyPot?.toNumber()}`}>
            #{nextMoneyPot?.toNumber()}
          </a>
        </NextMoneyPotCard>
      </div>
    </StatsCard>
  )
}

export default MoneyPotCard
