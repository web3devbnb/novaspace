import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'
import { useTotalValue } from '../../../state/hooks'
import CardValue from './CardValue'
import Divider from './Divider'

const StyledTotalValueLockedCard = styled.div`
  position: relative;
  padding: 18px 40px 28px;
  border-right: solid 2px ${({ theme }) => theme.colors.primary};
  border-top: solid 1px ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
  border-top-left-radius: 0;
`

const StyledDivider = styled(Divider)`
  position: absolute;
  width: 100%;
  top: -1px;
  right: 26px;
  height: 1px;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  // const data = useGetStats()
  const totalValue = useTotalValue()
  // const tvl = totalValue.toFixed(2);

  return (
    <StyledTotalValueLockedCard>
      <StyledDivider />
      <CardValue value={totalValue.toNumber()} prefix="$" decimals={2} />
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
