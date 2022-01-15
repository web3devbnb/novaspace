import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import Header from 'components/Header'
import { Flex, Text, Heading, Tag } from '@pancakeswap-libs/uikit'
import Divider from './components/Divider'
import logo from './components/novariaLogoMain.png'
import button from './components/button.png'

const Page1 = styled(Page)`
  background-image:url('/images/home/mainBackground-dark.jpg');
  background-size:cover ;
  background-position: center;
`

const Body = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;

`

const Logo = styled.img`
  max-Width: 800px;
  padding-top: 50px;
  padding-left: 20px;
  width: 99%;
`

const Column = styled.div`
  flex-direction: column;
  flex-wrap: wrap;
  width: 99%;
  max-width: 700px;
`

const SubHeading = styled.div`
  padding-top: 50px;
  padding-right: 40px;
  padding-left: 20px;
  padding-bottom: 80px;
  color: white;
  max-width: 800px;
  text-align: center;

  
  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 20px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 26px;
  }
`

const Novaria: React.FC = () => {
  return (
    <Page1 >      
      <Body >
        <Column>
          <Logo src={logo} alt="novaria logo" />
          <SubHeading>
            - Coming Soon - <br/> <br/>
            A 4x space strategy game built on the Binance Smart Chain. 
          </SubHeading>
        </Column>
      </Body>
    </Page1>
  )
}

export default Novaria
