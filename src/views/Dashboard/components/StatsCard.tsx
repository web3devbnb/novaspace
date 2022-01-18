import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, CardHeader, CardFooter } from '@pancakeswap-libs/uikit'

const StyledCard = styled(Card)`
  text-align: center;
  flex: 1 1 auto;
  max-width: 400px;
 // min-width: 350px;
  height: 610px;
`

const StyledCardHeader = styled(CardHeader)`
    padding: 12px;
  
`

const StyledHeading = styled(Heading)`
  font-size: 32px;
`

const StyledCardBody = styled(CardBody)`
    padding: 10px;
  
`

const StyledCardFooter = styled(CardFooter)`
  padding-top: 0;
  border-top: none;
`

const StatsCard = ({
  title,
  children,
  actions,
}: {
  title: string
  children: JSX.Element | JSX.Element[]
  actions?: JSX.Element
}) => {
  return (
    <StyledCard gradientBorder>
      <StyledCardHeader style={{ padding: '20px 0 0 0' }}>
        <StyledHeading glowing style={{ padding: '0 0 0 0' }}>
          {title}
        </StyledHeading>
      </StyledCardHeader>
      <StyledCardBody>{children}</StyledCardBody>
      {actions && <StyledCardFooter>{actions}</StyledCardFooter>}
    </StyledCard>
  )
}

StatsCard.defaultProps = {
  actions: null,
}

export default StatsCard
