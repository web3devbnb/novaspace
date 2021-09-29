import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import Header from 'components/Header'
import { Flex, Text, Heading, Tag } from '@pancakeswap-libs/uikit'
import Divider from './components/Divider'
import logo from './components/novapadlogo.png'

const Page1 = styled(Page)`
background-image:url('/images/home/BG_SPACE.png');
 background-size:cover ;
`


const Body = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const LeftColumn = styled(Flex)`
  flex-direction: column;
  padding: 5px;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 20px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 40px;
  }
`

const LeftColumnBlock = styled(Flex)`
  flex-direction: column;
  margin: 10px;

 

  ${({ theme }) => theme.mediaQueries.md} {
    margin: 20px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 20px;
  }
  ${({ theme }) => theme.mediaQueries.xs} {
    margin: 20px;
    text-align: center;
    
  }
`

const LeftColumnBlockItems = styled(Flex)`
  flex-direction: column;
`

const RightColumn = styled(Flex)`
  flex-direction: column;
  flex-grow: 2;
  padding-top: 0px;
  width: 60%;
`

const RightColumnFooter = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

const NovaPadLogo = styled.img`
  width: 800px;
  height: undefined;
  aspectRatio: 3/2;
  margin-left:auto;
  margin-right:auto;

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
    width: 25%;
  }

  :before {
    right: 0.5em;
    margin-left: -25%;
  }

  :after {
    left: 0.5em;
    margin-right: -25%;
  }
`

const Row = styled.div`
  display: flex;
  width: 98%;
  justify-content: space-evenly;
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
    <Page1 >      
      {/* <Header>NOVAPAD</Header> */}
      {/* <Divider /> */}
      <Body >
      <RightColumn>
          <NovaPadLogo src={logo} alt="NovaPad"  />
          <RightColumnFooter>
            <Text>The DEFI 2.0</Text>
            <WrappedText>NEW PROJECT LAUNCHPAD</WrappedText>
            <Text>COMING SOON!</Text>
          </RightColumnFooter>
        </RightColumn>
        <LeftColumn>
          {data.map((entry) => {
            return (
              <LeftColumnBlock>
                <Heading style={{textDecoration: "underline"}} >{entry.title.toUpperCase()}</Heading>
                <LeftColumnBlockItems>
                  {entry.items.map((item) => {
                    return <Text>{item.toUpperCase()}</Text>
                  })}
                </LeftColumnBlockItems>
              </LeftColumnBlock>
            )
          })}
          <Row>
        <a target="_blank" rel="noreferrer noopener" href="/NOVAPAD_PITCHDECK.pdf">
          <Tag glowing bold>Learn More!</Tag>
        </a>
        <a target="_blank" rel="noreferrer noopener" href="https://t.me/joinchat/z4TDiDvZkTY1Nzlh">
          <Tag glowing bold>Apply to Launch!</Tag>
        </a>
        </Row>
        </LeftColumn>
       
      </Body>
    </Page1>
  )
}

export default LaunchPad
