import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Text, Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { useTotalMoneyPotBNB } from 'hooks/useTokenBalance'
import logo from '../assets/farmcoins.png'

const Grid = styled.a`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background-repeat: no-repeat;
  background-color: #040035;
  background-size: cover;
  background-position: center bottom;
  height: 150px;
  width: 100%;
  margin: 10px 5px;
  border-radius: 30px;
  background-image: url('/images/home/moneypot1.jpg');
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  position: relative;
`

const TextRow1 = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  align-items: flex-end;
  display: flex;
  margin-bottom: 39px;
  margin-left: 10px;
`
const TextRow2 = styled.div`
  wrap: no-wrap;
  grid-column-start: 1;
  grid-column-end: 4;
  position: absolute;
  top: 51%;
  left: 6%;
`

const ColRight = styled.div`
  // background-image: url('/images/home/farmcoins.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0px 30px;
  grid-column-start: 4;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 3;
  // display: flex;
  // align-items: flex-end;
  border-radius: 0 30px 30px 0;
  padding-right: 5px;
  ${({ theme }) => theme.mediaQueries.sm} {
    background-size: cover;
    background-position: top left;
  }
`
const Heading = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  margin-left: 3%;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 4%;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 35px;
    margin-left: 4%;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: 4%;
  }
`
const SubHeading = styled(Text)`
  font-size: 15px;
  font-weight: bold;
  margin-left: 3%;
  ${({ theme }) => theme.mediaQueries.sm} {
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 0%;
    font-size: 20px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: 0%;
  }
`

const MoneyPotCard = () => {
  return (
    <Grid href="/dashboard">
      <TextRow1>
        <Heading glowing>MONEY POT</Heading>
      </TextRow1>
      <ColRight />

      <TextRow2>
        <SubHeading glowing>
          <span style={{ color: '#00aaff' }}>75%</span> of all platform fees are rewarded to SNOVA holders
        </SubHeading>
      </TextRow2>
    </Grid>
  )
}

export default MoneyPotCard
