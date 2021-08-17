import React, { useState } from 'react'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'

import useTokenBalance, {
  useMoneyPotBNBReward,
  useMoneyPotBUSDReward,
  useDistributedMoneyPotBNB,
  useDistributedMoneyPotBUSD,
  useNextMoneyPot,
  useSNovaTotalSupply,
} from 'hooks/useTokenBalance'
import { usePriceBnbBusd } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { useHarvestRewards } from 'hooks/useHarvest'
import { getSNovaAddress } from 'utils/addressHelpers'

import StatsCard from './StatsCard'
import Stats from './Stats'
import QuestionHelper from '../../../components/QuestionHelper'
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
  const bnbPrice = usePriceBnbBusd()
  const moneypotBNBValue = (Number(bnbPrice) * distributedMoneyPotWBNB[0]) / 10 ** 18
  const moneypotBUSDValue = distributedMoneyPotBUSD[0] / 10 ** 18
  const moneypotValue = moneypotBUSDValue + moneypotBNBValue
  const sNovaShare = (moneypotValue / Number(sNovaSupply)) * 10 ** 18
  const totalvalue = (distributedMoneyPotWBNB[0] * Number(bnbPrice)) / 10 ** 18 + distributedMoneyPotBUSD[0] / 10 ** 18

  const rewardTotal = Number(bnbPrice) * bnbUserRew + busdUserRew

  const share = (Number(sNovaBalance) / Number(sNovaSupply)) * 100

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

  return (
    <StatsCard title="Money Pot">
      <Row style={{ justifyContent: 'center', padding: '0 0 30px 0' }}>
        <Text
          bold
          fontSize="34px"
          // @ts-ignore: Unreachable code error
          glowing="true"
        >
          ${totalvalue.toFixed(2)}
        </Text>
        <QuestionHelper
          text={TranslateString(
            999,
            'The pot is distributed out to all sNOVA holders. Your reward/snova is delivered every block. The pot is updated daily with the fees from the previous day.',
          )}
        />
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        <div style={{ padding: '0 20px' }}>
          <CardImage src="/images/farms/bnb.png" alt="bnb logo" width={90} height={90} />
          <Text bold fontSize="20px">
            {TranslateString(999, 'WBNB ')}
          </Text>
          <Text fontSize="18px"> {bnbUserRew.toFixed(4)}</Text>
        </div>
        <div style={{ padding: '0 20px' }}>
          <CardImage src="/images/farms/busd.png" alt="busd logo" width={90} height={90} />
          <Text bold fontSize="20px">
            {TranslateString(999, ' BUSD ')}
          </Text>
          <Text fontSize="18px">{busdUserRew.toFixed(4)}</Text>
        </div>
      </Row>
      <Row style={{ paddingTop: '10px' }}>
        {account ? (
          <HarvestButton
            fullWidth
            disabled={bnbReward?.toNumber() === 0 || busdReward?.toNumber() === 0 || pendingTx}
            onClick={sendTx}
          >
            {TranslateString(999, 'Harvest Rewards - $')} {rewardTotal.toFixed(2)}
          </HarvestButton>
        ) : (
          <UnlockButton fullWidth />
        )}
      </Row>
      <div>
        {/* <Heading
          size="lg"
          // @ts-ignore: Unreachable code error
          glowing="true"
          style={{
            padding: '20px 15px 10px',
          }}
        >
          Moneypot
        </Heading>       */}
        {/* <Stats
          stats={[
            {
              label: TranslateString(999, 'VALUE'),
              value: totalvalue,
              prefix: '$',
            },
            {
              label: TranslateString(999, 'USD/sNOVA'),
              value: sNovaShare,
              prefix: '$',
            },
            {
              label: TranslateString(999, 'YOUR SHARE'),
              value: share,
              prefix: '%',
            },
            { label: TranslateString(999, 'LAST REWARD BLOCK'), value: distributedMoneyPotBUSD[2] },
          ]}
        /> */}

        <Row style={{ padding: '10px 15px 5px' }}>
          <Text fontSize="13px" bold>
            USD/sNOVA{' '}
          </Text>
          <Text
            fontSize="14px"
            // @ts-ignore: Unreachable code error
            glowing="true"
          >
            {' '}
            ${sNovaShare.toFixed(2)}
          </Text>
        </Row>

        <Row style={{ padding: '0 15px 5px' }}>
          <Text fontSize="13px" bold>
            YOUR SHARE{' '}
          </Text>
          <Text
            fontSize="14px"
            // @ts-ignore: Unreachable code error
            glowing="true"
          >
            {' '}
            {share.toFixed(2)}%
          </Text>
        </Row>

        <Row style={{ padding: '0 15px 20px' }}>
          <Text fontSize="13px" bold>
            LAST REWARD BLOCK{' '}
          </Text>
          <Text
            fontSize="14px"
            // @ts-ignore: Unreachable code error
            glowing="true"
          >
            {' '}
            {distributedMoneyPotBUSD[2]}
          </Text>
        </Row>

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
