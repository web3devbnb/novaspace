import React, { useMemo } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  depositFeeBP?: number
  // removed: boolean
  novaPrice?: BigNumber
  bnbPrice?: BigNumber
  busdPrice?: BigNumber
  usdtPrice?: BigNumber
  ethPrice?: BigNumber
  // ethereum?: provider
  // account?: string
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const StakeAction: React.FC<FarmCardActionsProps> = ({
  stakedBalance,
  tokenBalance,
  tokenName,
  pid,
  depositFeeBP,
  farm,
  // removed,
  novaPrice,
  busdPrice,
  bnbPrice,
  usdtPrice,
  ethPrice,
  // ethereum,
  // account,
}) => {
  const TranslateString = useI18n()
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)

  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenName} depositFeeBP={depositFeeBP} />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={tokenName} />,
  )

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.BUSD) {
      return busdPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.USDT) {
      return usdtPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.NOVA) {
      return novaPrice.times(farm.isTokenOnly ? farm.tokenAmount : farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.ETH) {
      return ethPrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [bnbPrice, busdPrice, novaPrice, usdtPrice, ethPrice, farm])

  const totalLP = getBalanceNumber(farm.LPSupply)

  const stakedValue = ((Number(totalValue) * Number(rawStakedBalance)) / totalLP).toLocaleString(undefined, {
    style: 'decimal',
    maximumFractionDigits: 2,
  })

  const novaValue = (rawStakedBalance * Number(novaPrice)).toLocaleString(undefined, {
    style: 'decimal',
    maximumFractionDigits: 2,
  })

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <Button onClick={onPresentDeposit}>{TranslateString(999, 'STAKE')}</Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="primary" />
        </IconButton>
        <IconButton variant="tertiary" onClick={onPresentDeposit}>
          <AddIcon color="primary" />
        </IconButton>
      </IconButtonWrapper>
    )
  }

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Heading color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>
        {displayBalance} (${farm.pid === 0 ? novaValue : stakedValue})
      </Heading>
      {renderStakingButtons()}
    </Flex>
  )
}

export default StakeAction
