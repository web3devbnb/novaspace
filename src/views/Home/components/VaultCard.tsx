import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Text, Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import vaultlogo from '../assets/vaultlogos.png'

const Grid = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background-image: url('/images/home/vaultbg2.png');
  background-position: left;
  background-repeat: no-repeat;
  background-color: #f082b3;
  height: 150px;
  width: 100%;
  margin: 10px 5px;
  border-radius: 30px;
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

${({ theme }) => theme.mediaQueries.sm} {
  grid-column-start: 1;
  grid-column-end: 4;
}
`
const TextRow2 = styled.div`
wrap: no-wrap;
grid-column-start: 1;
grid-column-end: 4;
position: absolute;
top: 50%;
left: 5%;

${({ theme }) => theme.mediaQueries.sm} {
  grid-column-start: 1;
  grid-column-end: 4;
}
`

const ColRight = styled.div`
  background-image: url('/images/home/vaultlogo1.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0 10px;
  grid-column-start: 4;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 3;
  // display: flex;
  // align-items: flex-end;
  border-radius: 0 30px 30px 0;
  // margin-top: 30px;
  ${({ theme }) => theme.mediaQueries.sm} {
    background-position: 0px 17px;
  }
  
`
const Heading = styled(Text)`
  font-size: 25px;
  font-weight: 900;
  margin-left: 3%;
  color: #130042;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 35px;
  }
`
const SubHeading = styled(Text)`
  font-size: 15px;
  font-weight: bolder;
  color: #130042;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 2%;

  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
    margin-left: 0%;
  }
`


const VaultsCard = () => {

  return (
    <Grid>
      <TextRow1><Heading >VAULTS</Heading></TextRow1>
      <ColRight />
      {/* <img src={vaultlogo} alt="vault logos" /> */}
      {/* </ColRight>  */}
      <TextRow2>
        <SubHeading >Earn more with
          <a href="https://app.crudeoil.finance/#/app/vaults" target="_blank"
            rel="noreferrer noopener" style={{ color: "#00aaff" }}> CrudeOil </a>
        </SubHeading>
      </TextRow2>
    </Grid>

  )
}

export default VaultsCard
