import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import Header from 'components/Header'
import { Flex, Text, Heading } from '@pancakeswap-libs/uikit'
import Divider from './components/Divider'

const LeftColumn = styled(Flex)`
  flex-direction: column;
  padding: 5px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 20px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 40px;
  }
`

const LeftColumnBlock = styled(Flex)`
  flex-direction: column;
  margin: 5px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin: 20px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 40px;
  }
`

const LeftColumnBlockItems = styled(Flex)`
  flex-direction: column;
`

const RightColumn = styled(Flex)`
  flex-direction: column;
  flex-grow: 2;
`

const RightColumnFooter = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

const NovaPadLogo = styled.img`
  width: 100%;
  height: 400px;
`

const WrappedText = styled(Text)`
  :before,
  :after {
    background-color: #159bd2;
    content: '';
    display: inline-block;
    height: 5px;
    position: relative;
    vertical-align: middle;
    width: 50%;
  }

  :before {
    right: 0.5em;
    margin-left: -50%;
  }

  :after {
    left: 0.5em;
    margin-right: -50%;
  }
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
        <LeftColumn>
          {data.map((entry) => {
            return (
              <LeftColumnBlock>
                <Heading>{entry.title.toUpperCase()}</Heading>
                <LeftColumnBlockItems>
                  {entry.items.map((item) => {
                    return <Text>{item.toUpperCase()}</Text>
                  })}
                </LeftColumnBlockItems>
              </LeftColumnBlock>
            )
          })}
        </LeftColumn>
        <RightColumn>
          <NovaPadLogo />
          <RightColumnFooter>
            <Text>The DEFI 2.0</Text>
            <WrappedText>NEW PROJECT LAUNCHPAD</WrappedText>
            <Text>COMING SOON!</Text>
          </RightColumnFooter>
        </RightColumn>
      </Flex>
    </Page>
  )
}

export default LaunchPad
