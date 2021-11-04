import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from '@pancakeswap-libs/uikit'
import { NoFeeTag } from 'components/Tags'
import QuestionHelper from 'components/QuestionHelper'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  risk?: number
  depositFee?: number
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, multiplier, farmImage, tokenSymbol, depositFee, risk }) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Image src={`/images/farms/${farmImage}.png`} alt={tokenSymbol} width={64} height={64} />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px">{lpLabel}</Heading>
        <Flex justifyContent="center">
          {depositFee === 0 ? <NoFeeTag /> : null}
          {/* {isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}
          {/* <RiskTag risk={risk} /> */}
          {risk === 20 ? <Tag> NEW </Tag> : null}
          {risk === 19 ?
          <div><QuestionHelper
          text=
            'What are EXTREME farms? Short term farms quickly created to capture high volume coins.  They have 0% fees, but the farm could be removed in 24 hours if we feel things are overly risky or volume is too low. They carry a little higher risk as they have not been proven by time and market depth, yet.  However, we still do as much due diligence as we can to keep risk as low as possible.'
          
          />
          <img src="images/extremetag.png" alt="extreme" width="110px" /> </div>: null }
          <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
