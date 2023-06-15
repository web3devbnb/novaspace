import React from 'react'
import styled from 'styled-components'
import { Text, Flex } from '@pancakeswap-libs/uikit'
import discordIcon from './Discord.svg'
import coinBrain from './coinBrain.png'
import redditIcon from './redditIcon.png'

const Hero = styled(Flex)`
  flex-direction: column;
  position: relative;
  justify-content: center;
  background: #0c0b15;
  margin: 0px -10px;
  border-top: solid 1px ${({ theme }) => theme.colors.backgroundDisabled};

  // ${({ theme }) => theme.mediaQueries.lg} {
  //   display: flex;
  //   justify-content: flex-end;
  // }

  // ${({ theme }) => theme.mediaQueries.xl} {
  //   // padding: 0 5vw;
  // }
`

const Row = styled(Flex)`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 15px 0 0 0;
`

const Col = styled(Flex)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Img = styled.img`
  height: 25px;
  margin: 5px 5px;
  background-color: white;
  border-radius: 5px;
`
const Ul = styled.ul`
  list-style-type: none;
  text-weight: bold;
  font-size: 12px;
`

const Footer = () => (
  <Hero>
    <Row>
      <Col>
        <Text style={{ fontSize: '12px', paddingBottom: '0px' }}>NOVA Contract: (ONLY ON NovaSpaceDEX)</Text>
        <Text style={{ fontSize: '8px' }}>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://bscscan.com/address/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c#code"
          >
            0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c{' '}
          </a>
        </Text>
        <Row>
          <a target="_blank" rel="noreferrer noopener" href="https://discord.gg/NovaSpace_">
            <Img src={discordIcon} alt="discord" style={{ backgroundColor: 'transparent' }} />
          </a>
          <a target="_blank" rel="noreferrer" href="https://t.me/NovaSpaceX">
            <Img src="https://novaspace.io/assets/images/telegram-icon.svg" alt="telegram" />
          </a>
          <a target="_blank" rel="noreferrer noopener" href="https://www.twitter.com/NovaSpace_">
            <Img src="https://novaspace.io/assets/images/twitter-icon.svg" alt="twitter" />
          </a>
          <a target="_blank" rel="noreferrer noopener" href="https://www.instagram.com/NovaSpace_">
            <Img src="https://novaspace.io/assets/images/instagram-icon.svg" alt="instagram" />
          </a>
          <a target="_blank" rel="noreferrer noopener" href="https://www.reddit.com/r/NovaSpaceDEX/">
            <Img src={redditIcon} alt="reddit" />
          </a>
          <a
            target="_blank"
            rel="noreferrer noopener noopener"
            href="https://coinbrain.com/coins/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"
          >
            <Img src={coinBrain} alt="coinBrain" />
          </a>
        </Row>
      </Col>
      <Col>
        <Ul>
          <li style={{ color: 'white', marginTop: '2px' }}>
            <a target="_blank" rel="noreferrer" href="/terms">
              Terms
            </a>
          </li>
          <li style={{ color: 'white', marginTop: '4px' }}>
            <a target="_blank" rel="noreferrer" href="/privacy">
              Privacy
            </a>
          </li>
          <li style={{ color: 'white', marginTop: '4px' }}>
            <a target="_blank" rel="noreferrer" href="https://docs.novaspace.io/">
              Documentation
            </a>
          </li>
          <li style={{ color: 'white', marginTop: '4px' }}>
            <a target="_blank" rel="noreferrer" href="https://docs.novaspace.io/security/audits">
              Audits
            </a>
          </li>
        </Ul>
      </Col>
    </Row>
    <Row style={{ marginBottom: '15px' }}>
      <Text style={{ fontSize: '12px' }}>Copyright © 2023. All rights reserved. novaspace.io</Text>
    </Row>
  </Hero>
)

export default Footer
