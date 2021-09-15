import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import Header from 'components/Header'
import { Flex, Text, Heading } from '@pancakeswap-libs/uikit'
import Divider from './components/Divider'

const Blocks = styled(Flex)`
  flex-direction: column;
  padding: 5px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 20px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 40px;
  }
`

const Block = styled(Flex)`
  flex-direction: column;
  margin: 5px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin: 20px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 40px;
  }
`

const BlockItems = styled(Flex)`
  flex-direction: column;
`

const data = [
  {
    title: 'Features',
    items: ['Whitelisting', 'Auto-liquidity', 'Liquidity lock', 'Highly customisable'],
  },
  {
    title: 'Benefits',
    items: ['Low fees', 'Dedicated dev assistance', 'Access to the complete', 'ShibaNova marketing package'],
  },
  {
    title: 'For the community',
    items: ['Project vetting', 'sNOVA / NOVA holder benefits'],
  },
]

const LaunchPad: React.FC = () => {
  return (
    <Page>
      <Header>NOVAPAD</Header>
      <Divider />
      <Flex>
        <Blocks>
          {data.map((entry) => {
            return (
              <Block>
                <Heading>{entry.title.toUpperCase()}</Heading>
                <BlockItems>
                  {entry.items.map((item) => {
                    return <Text>{item.toUpperCase()}</Text>
                  })}
                </BlockItems>
              </Block>
            )
          })}
        </Blocks>
      </Flex>
    </Page>
  )
}

export default LaunchPad
