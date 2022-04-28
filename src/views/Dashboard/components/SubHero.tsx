import React from 'react'
import { Text, Button, darkColors, dark } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import NeonButton from './NeonButton'
import mainLogo from '../assets/novariaLogoMain.png'

const Body = styled.div`
  
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  display: flex;
  min-height: 600px;
  flex-direction: column;
  background-image:  url('/images/home/homeBannerMobile.jpg'); 
  background-size: cover;
  background-position: top -30px right 0px;
  -moz-box-shadow: inset 0 0 500em rgba(0,0,0, 0.95);
  -webkit-box-shadow: inset 0 0 500em rgba(0,0,0, 0.95);
  box-shadow: inset 0 0 500em rgba(0,0,0, 0.95);
  border-radius: 5px;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    background-image:  url('/images/home/homeBanner.jpg');
    border-radius: 0px; 
  }
`

const Heading = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${darkColors.text};
  margin-bottom: 15px;
`

const Announcement = styled(Text)`
  
  // margin-top: 50px;
  text-align: left;
  font-size: 1rem;

 // color: ${darkColors.background};
`

const MainLogo = styled.img`
  // float: left;
  // margin-left: 30px;
`

const ColLeft = styled.div`
  width: 60%;
  align-self: center;
  margin-left: 10%;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 33%;
  }
`
const ColRight = styled.div`
  width: 90%;
  align-self: center;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 66%;
  }
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // justify-content: center;
  margin-top: 10px;
  // width: 15%;
  // margin: 0 auto;
`

const Money = styled.span`
  -webkit-text-stroke: .1px gold;
`

const SubHero = () => {

    return (
        <Body>
            <ColLeft>
                <Heading>LEGEND OF NOVARIA </Heading>
                <Announcement>
                  Legend of Novaria is a play to earn MMO strategy game built on the Binance Smart Chain and fueled by NOVA. 
                  Players can build fleets, mine mineral, fight others in epic space battles, and explore and ENDLESS universe.
                                      
                </Announcement>
                <ButtonRow>
                    <NeonButton title="DEX" link="#dex" />
                    <NeonButton title="Trade Routes" link="#trade-routes" />
                    <NeonButton title="Legend of Novaria" link="#novaria" />
                </ButtonRow>
              </ColLeft>
         
        </Body>

    )
}

export default SubHero
