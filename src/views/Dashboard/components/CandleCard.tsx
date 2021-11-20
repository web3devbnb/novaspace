import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Text, Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import QuestionHelper from 'components/QuestionHelper'
import dexlogo from '../assets/novadex.png'
import cointiger from '../assets/cointiger.png'

const Grid = styled.a`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left center;
  height: 150px;
  width: 100%;
  margin: 10px 5px;
  border-radius: 30px;
  // background-image: url('/images/home/geniestatic3.jpg');
  background-image: url('/images/home/geniebanner1.gif');
  display: grid;
  grid-template-columns: repeat(4,1fr);
  position: relative;

  ${({ theme }) => theme.mediaQueries.sm} {
    background-position: center;
    
    }

  ${({ theme }) => theme.mediaQueries.md} {
    background-position: top center;
    background-size: cover;
    
    }

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


const CandleCard = () => {

  return (
    <Grid href="https://candlegenie.io/ref/IRCTOB3Q" target="_blank" rel="noreferrer noopener">
      <TextRow1><Heading glowing> </Heading></TextRow1>
      <ColRight />
    <QuestionHelper
      text="75% of all referral rewards are sent to the Money Pot"  
               
    /> 
      
     
    </Grid>

  )
}

export default CandleCard
