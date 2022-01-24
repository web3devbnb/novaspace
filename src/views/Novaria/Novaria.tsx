import React, {useState} from 'react'
import styled, { keyframes } from 'styled-components'
import Page from 'components/layout/Page'
import Header from 'components/Header'
import { Flex, Text, Heading, Tag } from '@pancakeswap-libs/uikit'
import ModalVideo from "react-modal-video";
import Divider from './components/Divider'
import logo from './components/novariaLogoMain.png'
import button from './components/button.png'
import "react-modal-video/scss/modal-video.scss";

const Page1 = styled(Page)`
  // background-image:url('/images/home/mainBackground-dark.jpg');
  // background-size:cover ;
  // background-position: center;
`

const Body = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Poppins', sans-serif;

`
const breatheAnimation = keyframes`
  // 0% { width: 99%; }
  // 50% {width: 49%; }
  // 100% {width: 0%; }
  // 0% { padding-top: 100px }
  // 50% {padding-top: 50px }
  // 100% {padding-top: 30px }
  0% { opacity: 0.7}
  40% { opacity: 1  }
  70% { opacity: 1  }
  100% { opacity: 0.7 }

`

const Logo = styled.img`
  max-Width: 800px;
  padding-top: 80px;
  padding-left: 0px;
  width: 99%;
  animation-name: ${breatheAnimation};
  animation-duration: 5s;
  animation-iteration-count: infinite;
`

const Column = styled.div`
  flex-direction: column;
  flex-wrap: wrap;
  width: 99%;
  max-width: 700px;
`

const SubHeading = styled.div`
  padding-top: 50px;
  padding-right: 40px;
  padding-left: 20px;
  padding-bottom: 80px;
  color: white;
  max-width: 800px;
  text-align: center;


  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 20px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 26px;
  }
`

const Button = styled.button`
  margin: 10px;
  align-self: center;
  padding: .5rem 1.25rem;
  font-family: sans-serif;
  font-size: 1.25rem;
  text-decoration: none;
  text-shadow:
  -2px 4px 4px #091243, 
  0 0 10px #00D0FF,
  inset 1px 1px 1px white;
  color: #1FFFFF;
  border: 2px solid;
  border-radius: 10px;
  background-color: transparent;
  box-shadow: 
  0 1px 2px rgba(0,0,0, 0.6), 
  2px 1px 4px rgba(0,0,0, 0.3), 
  2px 4px 3px rgba(3,0,128, 0.3), 
  0 0 7px 2px rgba(0,208,255, 0.6), 
  inset 0 1px 2px rgba(0,0,0, 0.6), 
  inset 2px 1px 4px rgba(0,0,0, 0.3), 
  inset 2px 4px 3px rgba(3,0,128, 0.3), 
  inset 0 0 7px 2px rgba(0,208,255, 0.6);
`


const Novaria: React.FC = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <Page1 >
      <Body >
        <Column>
          <Logo src={logo} alt="novaria logo" />
            <ModalVideo
            channel="youtube"
            isOpen={isOpen}
            videoId="HLKAscn2YAI"
            onClose={() => setOpen(false)}
          />
          <Button type="button" onClick={()=> {setOpen(true)}} >Trailer</Button>
          <SubHeading>
            - Coming Soon - <br/> 
          <br />
            A 4x space strategy game built on the Binance Smart Chain.
          </SubHeading>
        </Column>
      </Body>
    </Page1>
  )
}

export default Novaria
