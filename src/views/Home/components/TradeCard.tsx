import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Text, Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import dexlogo from '../assets/novadex.png'
import cointiger from '../assets/cointiger.png'

const Grid = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background-size: cover;
  background-repeat: no-repeat;
  height: 150px;
  width: 100%;
  margin: 10px 5px;
  border-radius: 30px;
  background-image: url('/images/home/trade_1.png');
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  position: relative;
`

const TextRow1 = styled.div`
  grid-column-start: 1;
  grid-column-end: 6;
  align-items: flex-end;
  display: flex;
  margin-bottom: 60px;
  margin-left: 10px;
`
const TextRow2 = styled.div`
  // wrap: no-wrap;
  // align-items: center;
  grid-column-start: 1;
  grid-column-end: 6;
  position: absolute;
  top: 51%;
  left: 6%;
`

const ColRight = styled.div`
  // background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom-right;
  grid-column-start: 4;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 3;
  // display: flex;
  // align-items: flex-end;
  border-radius: 0 30px 30px 0;
  padding-right: 5px;
`
const Heading = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  margin-left: 3%;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 35px;
  }
`
const SubHeading = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`

const TradesCard = () => {
  return (
    <Grid>
      <TextRow1>
        <Heading glowing>TRADE $NOVA</Heading>
      </TextRow1>
      <ColRight />

      <TextRow2>
        <a
          href="https://dex..NovaSpace.io /#/swap?outputCurrency=0x56e344be9a7a7a1d27c854628483efd67c11214f"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={dexlogo} alt="nova dex" style={{ paddingTop: '15px' }} />
        </a>
        <a href="https://www.cointiger.com/en-us/#/trade_pro?coin=nova_usdt" target="_blank" rel="noreferrer noopener">
          <img src={cointiger} alt="coin tiger" style={{ paddingBottom: '18px' }} />
        </a>
      </TextRow2>
    </Grid>
  )
}

export default TradesCard
