import React from 'react'
import { Button, CardBody, CardHeader, CardFooter, Text, Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import logo from '../assets/farmcoins.png'

const Grid = styled(Flex)`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center bottom;
  height: 500px;
  width: 95%;
  margin: 20px auto;
  border-radius: 30px;
  background-image: url('/images/home/farm-min.png');
  // display: flex;
  flex-direction: column;
  padding: 20px;


`
const Wrapper = styled.div`
  margin: auto 0;
`

const TextRow1 = styled.div`
  align-self: center;
  margin: 0px 0;

  ${({ theme }) => theme.mediaQueries.md} {
    margin: 20px 0;
  }

`
const TextRow2 = styled.div`
  align-self: center;
  
`

const ColRight = styled.div`
  background-image: url('/images/home/farmcoins-min.png');

  ${({ theme }) => theme.mediaQueries.sm} {
    
  }
`
const Heading = styled(Text)`
  font-size: 35px;
  font-weight: bold;
  text-align: center;


  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 50px;
    text-align: right;
  }
  ${({ theme }) => theme.mediaQueries.lg} {

  }
`
const SubHeading = styled(Text)`
  font-size: 20px;
  font-weight: medium;
  text-align: center;
  
  ${({ theme }) => theme.mediaQueries.sm} {
    
  }
  ${({ theme }) => theme.mediaQueries.md} {
    text-align: right;

  }
  ${({ theme }) => theme.mediaQueries.lg} {

  }
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: right;

  }
`

const TradeRouteCard = ({
    title,
  }: {
    title: string
  }) => {

  return (
    <Grid id={title}>
      <Wrapper>
      <TextRow1>
        <Heading glowing>
          TRADE ROUTES
        </Heading>
      </TextRow1>
      
      <TextRow2>
        <SubHeading glowing> 
          Users can earn passive income by depositing liquidity into in trade routes. 
          Trade route liquidity fuels the decentralized exchange&apos;s tradeable token pairs. 
          Rewards are paid out in either NOVA or sNOVA, where sNOVA allows users to gain a share of the platform profits in the daily Money Pot.  
        </SubHeading>
      </TextRow2>

      <ButtonRow>
        <a href="https://swap.shibanova.io/#/pool" rel='noopener noreferrer' >
          <Button style={{margin:"0 10px 10px"}}>Get Liquidity</Button>
        </a>
        <a href="/traderoutes" rel='noopener noreferrer' >
          <Button style={{margin:"0 10px"}}>Trade Routes</Button>
        </a>
        <a href="https://docs.shibanova.io/shibanova-documentation/how-farming-works" target='blank' rel='noopener noreferrer'>
          <Button style={{margin:"0 10px"}}>Learn More</Button>
        </a>
      </ButtonRow>
      </Wrapper>
{/* 
      <ColRight /> */}
    </Grid>

  )
}

export default TradeRouteCard
