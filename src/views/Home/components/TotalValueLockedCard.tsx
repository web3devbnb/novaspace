import React from 'react'
import styled from 'styled-components'
import { Tag } from '@pancakeswap-libs/uikit'
import { useTotalValue } from '../../../state/hooks'
import CardValue from './CardValue'
import Divider from './Divider'

const StyledTag = styled(Tag)`
  position: absolute;
  top: 0px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  right: 38px;
`

const Container = styled.div`
  position: relative;
  padding: 32px 40px 4px;
  border-right: solid 2px ${({ theme }) => theme.colors.primary};
  border-top: solid 1px ${({ theme }) => theme.colors.secondary};
  border-radius: 30px;
  border-top-left-radius: 0;
  text-align: right;
  font-size: 28px;
  min-width: 310px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 32px 40px 4px;
    font-size: 32px;
  }
`

const StyledDivider = styled(Divider)`
  position: absolute;
  width: 100%;
  top: -1px;
  right: 26px;
  height: 1px;
`

const TotalValueLockedCard = () => {
  const totalValue = useTotalValue()

  return (
    <Container>
      <StyledTag glowing bold>
        TOTAL DEPOSITED
      </StyledTag>
      <StyledDivider />
      <CardValue fontSize="inherit" value={totalValue.toNumber()} prefix="$" decimals={2} />
    </Container>
  )
}

export default TotalValueLockedCard
