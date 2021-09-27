import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Text, Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import logo from '../assets/farmcoins.png'

const Grid = styled.a`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background-repeat: no-repeat;
  background-color: #040035;
  height: 150px;
  width: 100%;
  margin: 10px 5px;
  border-radius: 30px;
  background-image: url('/images/home/farm.png');
  display: grid;
  grid-template-columns: repeat(4,1fr);
  position: relative;

`

const TextRow1 = styled.div`
grid-column-start: 1;
grid-column-end: 4;
align-items: flex-end;
display: flex;
margin-bottom: 30px;
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
  background-image: url('/images/home/farmcoins.png');
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
  font-size: 35px;
  font-weight: bold;
  margin-left: 3%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: 4%;
  }
`
const SubHeading = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`


const FarmsCard = () => {

  return (
    <Grid href="/farms">
      <TextRow1>
        <Heading glowing>
          FARMS
        </Heading>
      </TextRow1>
      <ColRight /> 
      
      <TextRow2>
        <SubHeading glowing> 
          Earn up to <span style={{color:"#00aaff"}}>500%</span> APR      
        </SubHeading>
      </TextRow2>
    </Grid>

  )
}

export default FarmsCard
