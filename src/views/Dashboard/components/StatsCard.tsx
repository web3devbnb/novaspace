import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, CardHeader, CardFooter } from '@pancakeswap-libs/uikit'

const StyledCard = styled(Card)`
  text-align: center;
  flex: 1 1 auto;
  max-width: 400px;
 // min-width: 350px;
  height: 610px;
  border: 2px solid;
  color: #00aaff;
 // box-shadow: 
    0 1px 2px rgba(0,0,0, 0.6), 
    2px 1px 4px rgba(0,0,0, 0.3), 
    2px 4px 3px rgba(3,0,128, 0.3), 
    0 0 7px 2px rgba(0,208,255, 0.6), 
    inset 0 1px 2px rgba(0,0,0, 0.6), 
    inset 2px 1px 4px rgba(0,0,0, 0.3), 
    inset 2px 4px 3px rgba(3,0,128, 0.3), 
    inset 0 0 7px 2px rgba(0,208,255, 0.6);
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
