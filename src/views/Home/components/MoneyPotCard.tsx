import React, { useState } from 'react'
import { Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'

import useTokenBalance, {
  useMoneyPotBNBReward,
  useMoneyPotBUSDReward,
  useMoneyPotOldBNBReward,
  useMoneyPotOldBUSDReward,
  useDistributedMoneyPotBNB,
  useDistributedMoneyPotBUSD,
  useNextMoneyPot,
  useSNovaTotalSupply,
} from 'hooks/useTokenBalance'
import { usePriceBnbBusd, usePriceNovaBusd } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { useHarvestRewards, useHarvestRewardsOld } from 'hooks/useHarvest'
import { getSNovaAddress } from 'utils/addressHelpers'

import StatsCard from './StatsCard'
import Stats from './Stats'
import QuestionHelper from '../../../components/QuestionHelper'
import UnlockButton from '../../../components/UnlockButton'
import HarvestButton from './HarvestButton'
import CardValue from './CardValue'

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin: 8px 0;
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
  const bnbUserRew = Number(bnbReward) / 10 ** 18
  const busdReward = useMoneyPotBUSDReward()
  const busdUserRew = Number(busdReward) / 10 ** 18
  const distributedMoneyPotWBNB = useDistributedMoneyPotBNB()
  const distributedMoneyPotBUSD = useDistributedMoneyPotBUSD()
  const sNovaSupply = useSNovaTotalSupply()
  const sNovaBalance = useTokenBalance(getSNovaAddress())
  const nextMoneyPot = useNextMoneyPot()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestRewards()
  const { onRewardOld } = useHarvestRewardsOld()
  const bnbPrice = usePriceBnbBusd()
  const moneypotBNBValue = (Number(bnbPrice) * distributedMoneyPotWBNB[0]) / 10 ** 18
  const moneypotBUSDValue = distributedMoneyPotBUSD[0] / 10 ** 18
  const moneypotValue = moneypotBUSDValue + moneypotBNBValue
  const sNovaShare = (moneypotValue / Number(sNovaSupply)) * 10 ** 18
  const totalvalue = (distributedMoneyPotWBNB[0] * Number(bnbPrice)) / 10 ** 18 + distributedMoneyPotBUSD[0] / 10 ** 18
  const rewardTotal = Number(bnbPrice) * bnbUserRew + busdUserRew
  const share = (Number(sNovaBalance) / Number(sNovaSupply)) * 100
  const novaPrice = usePriceNovaBusd().toNumber()
  const dailyROI = (sNovaShare / novaPrice) * 100
  // old money pot
  const oldbnbReward = useMoneyPotOldBNBReward()
  const oldbusdReward = useMoneyPotOldBUSDReward()
  const bnbUserRewOld = Number(oldbnbReward) / 10 ** 18
  const busdUserRewOld = Number(oldbusdReward) / 10 ** 18
  const oldrewardTotal = Number(bnbPrice) * bnbUserRewOld + busdUserRewOld

  const sendTx = async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  // const sendTxOld = async () => {
  //   setPendingTx(true)
  //   try {
  //     await onRewardOld()
  //   } catch (error) {
  //     console.log('error: ', error)
  //   } finally {
  //     setPendingTx(false)
  //   }
  // }

  const stats = [
    { label: 'USD/sNOVA', value: sNovaShare || 0, prefix: '$' },
    { label: 'YOUR SHARE', value: share || 0, suffix: '%' },
    { label: 'LAST REWARD BLOCK', value: distributedMoneyPotBUSD[2] },
  ]

  return (
    <StatsCard title="Money Pot">
      <Row style={{ justifyContent: 'center', padding: '0 0 0px 0' }}>
        <CardValue fontSize="34px" value={totalvalue || 0} prefix="$" decimals={2} />
        <QuestionHelper
          text={TranslateString(
            999,
            'The pot is distributed out to all sNOVA holders. Your reward/snova is delivered every block. The pot is updated daily with the fees from the previous day.',
          )}
        />
      </Row>
      <Text glowing bold style={{ padding: '0 0 3px 0' }}>
        Daily ROI {dailyROI.toFixed(2)}%
      </Text>
      <Row style={{ justifyContent: 'center' }}>
        <div style={{ padding: '5px 20px' }}>
          <CardImage src="/images/farms/bnb.png" alt="bnb logo" width={90} height={90} />
          <Text bold fontSize="20px">
            {TranslateString(999, 'WBNB ')}
          </Text>
          <CardValue fontSize="18px" value={bnbUserRew || 0} decimals={4} />
        </div>
        <div style={{ padding: '0 20px' }}>
          <CardImage src="/images/farms/busd.png" alt="busd logo" width={90} height={90} />
          <Text bold fontSize="20px">
            {TranslateString(999, ' BUSD ')}
          </Text>
          <CardValue fontSize="18px" value={busdUserRew || 0} decimals={4} />
        </div>
      </Row>
      <Row style={{ paddingTop: '0px' }}>
        {account ? (
          <HarvestButton
            disabled={bnbReward?.toNumber() === 0 || busdReward?.toNumber() === 0 || pendingTx}
            onClick={sendTx}
          >
            {TranslateString(999, 'Harvest Rewards - $')}
            {rewardTotal.toFixed(2)}
          </HarvestButton>
        ) : (
          <UnlockButton fullWidth />
        )}
      </Row>
      {/* Harvest old reward */}
      {/* <Row >
        {account ? (
          <HarvestButton
            fullWidth
            disabled={oldbnbReward?.toNumber() === 0 || oldbusdReward?.toNumber() === 0 || pendingTx}
            onClick={sendTxOld}            
          >
            {TranslateString(999, 'Harvest Old Rewards - $')}{oldrewardTotal.toFixed(2)} 
          </HarvestButton>
        ) : (
          <UnlockButton fullWidth />
        )}
      
      </Row> */}
      <div>
        <Stats stats={stats} />
        <Row style={{ justifyContent: 'center', padding: '7px 0 0px 0' }}>
          <NextMoneyPotCard>
            Next Moneypot starts rewarding at block{' '}
            <a target="_blank" rel="noreferrer" href={`https://bscscan.com/block/${nextMoneyPot?.toNumber()}`}>
              #{nextMoneyPot?.toNumber()}
            </a>
          </NextMoneyPotCard>
        </Row>
      </div>
    </StatsCard>
  )
}

export default MoneyPotCard
