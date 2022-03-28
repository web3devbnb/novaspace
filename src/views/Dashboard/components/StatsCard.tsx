import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, CardHeader, CardFooter } from '@pancakeswap-libs/uikit'
import QuestionHelper from '../../../components/QuestionHelper'


const StyledCard = styled(Card)`
  text-align: center;
  flex: 1 ;
  max-width: 400px;
  // min-width: 350px;
  // height: 610px;
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
  font-size: 1.5rem;
`

const StyledCardBody = styled(CardBody)`
    padding: 0px 10px;
  
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

  const moneyPotInfo = (title === 'Money Pot' ? 'The pot is distributed out to all sNOVA holders. Your reward/snova is delivered every block. The pot is updated daily with the fees from the previous day.' : '')
  const snovaInfo = (title === 'sNOVA Stats' ? 'sNOVA is the share token for ShibaNova. Holders get rewarded with dividends from the Money Pot. sNOVA can only be obtained through NOVA-BNB and NOVA-BUSD farms.' : '')
  const novaInfo = (title === 'NOVA Stats' ? 'NOVA is the utility token for ShibaNova. It can be obtained as yield rewards for liquidity farms and can also be obtained by swapping sNOVA for it.' : '')
  const infoArray = [novaInfo, snovaInfo, moneyPotInfo]
  const infoMap = infoArray.map((item) => item).join('').toString()

  return (
    <StyledCard gradientBorder>
      <StyledCardHeader style={{ padding: '10px 0 0 0' }}>
        <StyledHeading glowing style={{ padding: '0 0 0 0' }}>
          {title}
              <QuestionHelper
                text={infoMap}
              />
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
