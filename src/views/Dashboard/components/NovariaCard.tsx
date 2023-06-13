import React from 'react'
import { Button } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import showCountdown from 'utils/countdownTimer'
import NovariaLogo from '../assets/novariaLogoMain.png'

const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-position: center bottom;
    background-size: cover;
    background-image: url('/images/home/mainBackground-dark.jpg');
    min-height: 500px;
    width: 95%;
    margin: 20px auto;
    border: 2px solid #00aaff;
    border-radius: 30px;
    paddingL 10px;
`

const Img = styled.img`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  align-self: center;
`

const NovariaCard = ({ title }: { title: string }) => {
  const launchCountdown = showCountdown(new Date(1647547200000))

  return (
    <Body id={title}>
      <a href="/legend-of-novaria" style={{ display: 'flex' }}>
        <Img src={NovariaLogo} alt="LEGEND OF NOVARIA" />
      </a>
      <a href="/legend-of-novaria" style={{ display: 'flex' }}>
        <Button style={{ margin: '10px auto', fontSize: 20, color: 'gold' }}>Join the Battle</Button>
      </a>
      {/* <VideoModal /> */}
    </Body>
  )
}

export default NovariaCard
