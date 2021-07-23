import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'
import { useTotalValue } from '../../../state/hooks'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled.div`
  align-items: center;
  background-height: auto;
  background-image: url(images/TVLbg.png);
  background-position: right;
  background-color: transparent;
  background-repeat: no-repeat;
  text-align: right;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  // const data = useGetStats()
  const totalValue = useTotalValue();
  // const tvl = totalValue.toFixed(2);

  return (
    <StyledTotalValueLockedCard>
      <div style={{width:'350px', paddingTop:'70px', paddingRight:'10px'}}>
        
        <>
          {/* <Heading size="xl">{`$${tvl}`}</Heading> */}
          {/* <Heading size="xl"> */}
            <CardValue value={totalValue.toNumber()} prefix="$" decimals={2}/>
          {/* </Heading> */}
         
        </>
      </div>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
