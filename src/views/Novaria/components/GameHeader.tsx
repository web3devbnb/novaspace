import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useGetFleetLocation } from 'hooks/useNovaria'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getNovaAddress } from '../../../utils/addressHelpers'
import { getBalanceNumber } from '../../../utils/formatBalance'
import smallLogo from '../assets/novariaSmallLogo.png'

const Hero = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  height: 75px;
  width: 100%;
  // margin-right: 10px;
  // margin-left: 10px;
  margin-top: 0px;
  padding-top: 10px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
`

const StyledHeading = styled(Heading)`
  text-align: center;
  align-items: center;
`

const InfoBlock = styled.div`
  margin-right: 15px;
`

const Logo = styled.img`
  object-position: left;
  // margin-top: -70px;
  // margin-bottom: 60px;
  margin-bottom: 10px;
  // background-color: #000a17;
`

const GameHeader = ({ location, playerMineral }) => {
  // const { account } = useWallet()
  // const fleetLocation = useGetFleetLocation(account)
  const novaBalance = getBalanceNumber(useTokenBalance(getNovaAddress()))

  return (
    <Hero>
      <a href='/novaria'>
        <Logo src={smallLogo} alt="Novaria Logo" />
      </a>
      {/* <StyledHeading as="p" size="xl" glowing>
        {children}
      </StyledHeading> */}
      <InfoBlock>
         <div style={{flexDirection: 'row', display: 'flex', marginTop: 10}}>
              <img src='https://shibanova.io/logo.png' alt='nova logo' />
              <Text glowing>  $0.15
                  {/* {novaPrice} see if this works on production? */}
              </Text>
          </div>
        <Text glowing>
          Player Location: ({location.X}, {location.Y})
        </Text>
        <Text glowing>
          Available NOVA: <span style={{ color: 'gold' }}>{novaBalance.toFixed(2)}</span>
        </Text>
        <Text glowing>
           MINERAL: <span style={{ color: 'gold' }}>{playerMineral}</span>
        </Text>
      </InfoBlock>
    </Hero>
  )
}
export default GameHeader
