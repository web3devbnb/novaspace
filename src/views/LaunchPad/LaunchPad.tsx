import React from 'react'
import Page from 'components/layout/Page'
import Header from 'components/Header'
import { Flex, Text, Heading } from '@pancakeswap-libs/uikit'
import Divider from './components/Divider'

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
        <Flex flexDirection="column" style={{ padding: '40px' }}>
          {data.map((entry) => {
            return (
              <Flex flexDirection="column" style={{ margin: '40px' }}>
                <Heading>{entry.title.toUpperCase()}</Heading>
                <Flex flexDirection="column">
                  {entry.items.map((item) => {
                    return <Text>{item.toUpperCase()}</Text>
                  })}
                </Flex>
              </Flex>
            )
          })}
        </Flex>
      </Flex>
    </Page>
  )
}

export default LaunchPad
