import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import { BaseLayout, Flex, Text, Card } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import Header from 'components/Header'
import Divider from "./assets/divider.png"


const Body = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
  margin 0 20px;
`

const Col = styled(Flex)`
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  justify-content: center;
  width: 99%;
  margin: 0 5px;
  max-width: 800px;


  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 10px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 47%;
  }
 
`

const Main = styled(Flex)`
  width: 95%;
  margin: 10px 0 0 0;
  flex-direction: column;
  object-position: center bottom;
  justify-content: center;
  // padding: 32px 16px;

  // border-radius: 30px;
  // border: 2px solid ${({ theme }) => theme.colors.primary};

`
const Announcement = styled(Text)`
  text-align: center;
  text-weight: bold;
  background-image: url('/images/home/divider.png')
  background-position: center;
  background-size: cover;
`
const Img = styled.img`
  object-position: center bottom;
`

const MoneyPot: React.FC = () => {
  

  
  return (
    <Page 
      
    >
      <Header>MoneyPot</Header>
      
      <Body>
     
        
      </Body>
    </Page>
  )
}

export default MoneyPot
