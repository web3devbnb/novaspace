import React from "react";
import styled from 'styled-components'
import logo1 from '../assets/fees.png'
import logo2 from '../assets/novadexbig.png'

const Row = styled.div`
display: flex;
height: 300px;
flex-direction: row;
flex-wrap: wrap;
background-size: ;
background-repeat: no-repeat;
background-image: url('/images/home/bannerbg2.png');
background-position: bottom;
align-items:center;
justify-content: space-evenly;
border: 2px solid ${({ theme }) => theme.colors.primary};
border-radius: 30px;

${({ theme }) => theme.mediaQueries.md} {
    background-position: bottom;
  }
`

const Col1 = styled.div `
    padding-left: 5%;
    justify-content: center;
`

const Col2 = styled.div `
    justify-content: center;
    margin-left: 10px
`
const Col3 = styled.div `
    justify-content: center;
`


const Banner2 = () => {
    return (
        <Row>
            <Col1>
                <img src={logo2} alt="launchpad redefined" />
            </Col1>
            <Col2>
                <img src={logo1} alt="launchpad redefined" />
            </Col2>
            {/* <Col3 /> */}
        </Row>
    )
}

export default Banner2