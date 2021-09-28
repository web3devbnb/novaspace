import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Text, Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import logo from '../assets/defi2logos.png'

const Grid = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('/images/home/defi2small.png');
  background-position: center;
  background-color: #041729;
  height: 150px;
  width: 100%;
  margin: 10px 5px;
  border-radius: 30px;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  position: relative;

  ${({ theme }) => theme.mediaQueries.sm} {
    background-position: center;
    background-image: url('/images/home/defi2med.png');
    }

  ${({ theme }) => theme.mediaQueries.md} {
    background-position: center;
    background-image: url('/images/home/defi2bg1.png');
    }
`

const TextRow1 = styled.div`
grid-column-start: 1;
grid-column-end: 4;
align-items: flex-end;
display: flex;
margin-bottom: 30px;
margin-left: 10px;

  // ${({ theme }) => theme.mediaQueries.lg} {
  //   padding-top: 25px;
  //   grid-column-start: 1;
  //   grid-column-end: 4;
  // }
  // ${({ theme }) => theme.mediaQueries.xs} {
  //   grid-column-start: 1;
  //   grid-column-end: 6;
  // }
`
const TextRow2 = styled.div`
// wrap: no-wrap;
// flex-direction: row;
grid-column-start: 1;
grid-column-end: 4;
position: absolute;
top: 50%;
left: 9%;

  ${({ theme }) => theme.mediaQueries.lg} {
    left: 5%;
  }
  // ${({ theme }) => theme.mediaQueries.sm} {
  //   grid-column-start: 1;
  //   grid-column-end: 6;
  // }
`

const ColRight = styled.div`
  grid-column-start: 4;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 3;
  display: flex;
  align-items: center;
  border-radius: 0 30px 30px 0;
  padding-right: 5px;
  
`
const Heading = styled(Text)`
  font-size: 35px;
  font-weight: bold;
  margin-left: 3%;
`
const SubHeading = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`


const Defi2Card = () => {

  return (
    <Grid>
      <TextRow1>
        <Heading glowing>
          DEFI 2.0
        </Heading>
      </TextRow1>
      <ColRight> 
        {/* <img src={logo} alt="defi 2.0" /> */}
      </ColRight>
      
      <TextRow2>
        <SubHeading glowing >
                  NEW
                  <span style={{color:"#00aaff"}}> DEFI</span>
                  NITION OF DEFI
        </SubHeading>
      </TextRow2>
    </Grid>

  )
}

export default Defi2Card
