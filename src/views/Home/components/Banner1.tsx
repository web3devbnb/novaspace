import React from "react";
import { Flex} from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import logo1 from '../assets/launchdefined.png'
import logo2 from '../assets/novapadlogo.png'
import rocket from '../assets/rocket_2.png'

const Row = styled(Flex)`
    height: 300px;
    flex-direction: row;
    background-size: cover;
    flex-wrap: wrap;
    background-repeat: no-repeat;
    background-image: url('/images/home/BG_SPACE.png');
    background-position: center;
    align-items: center;
    justify-content: space-evenly;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 30px;

    ${({ theme }) => theme.mediaQueries.md} {
        flex-wrap: nowrap;
      }

  }

`

const Col1 = styled.div `
   
    justify-content: center;
    padding-left: 20px;
    // width: 30%;
`

const Col2 = styled.div `
    justify-content: center;
    padding-left: 20px;
    ${({ theme }) => theme.mediaQueries.sm} {
       padding-bottom: 20px;
      }
    
`
const Col3 = styled.div `
    justify-content: center;
`
const SubRow = styled.div`
  flex-direction: row;
`

const Banner1 = () => {
    return (
        <Row>
            
            <Col1>
                <img src={logo1} alt="launchpad redefined" />
            </Col1>
            
            <Col2>
                <img src={logo2} alt="launchpad redefined" />
            </Col2>
            {/* <Col3>
                <img src={rocket} alt="launchpad rocket" />
            </Col3> */}
        </Row>
    )
}

export default Banner1