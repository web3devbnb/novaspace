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
            'What are EXTREME farms? Farms quickly created to support high volume, high volatility coins.  They are a little higher risk then our normal farms as they have not been around as long and/or as heavily vetted as staple projects such as BNB and ETH.  PLEASE do your own research.'
          />
          <img src="images/extremetag.png" alt="extreme" width="110px" /> </div>: null }
          <MultiplierTag variant="primaryDark">{multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
