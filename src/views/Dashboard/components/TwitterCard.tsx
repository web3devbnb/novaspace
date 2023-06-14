import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { Timeline } from 'react-twitter-widgets'
import useI18n from 'hooks/useI18n'

const StyledTwitterCard = styled(Card)`
  margin-left: 10px;
  margin-right: 10px;
`

const TwitterCard = () => {
  const TranslateString = useI18n()

  return (
    <StyledTwitterCard>
      <CardBody>
        <Heading as="h1" size="xl" mb="24px">
          Twitter News
        </Heading>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'novaspace_',
          }}
          options={{
            height: '300',
            chrome: 'noheader, nofooter',
            width: '400',
          }}
        />
      </CardBody>
    </StyledTwitterCard>
  )
}

export default TwitterCard
