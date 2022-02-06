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

const GameHeader = ({ children }) => {
  const { account } = useWallet()
  const fleetLocation = useGetFleetLocation(account)
  const novaBalance = getBalanceNumber(useTokenBalance(getNovaAddress()))

  return (
    <Hero>
      <Logo src={smallLogo} alt="Novaria Logo" />

      <StyledHeading as="p" size="xl" glowing>
        {children}
      </StyledHeading>
      <InfoBlock>
        <Text glowing>
          Player Location: ({fleetLocation.X}, {fleetLocation.Y})
        </Text>
        <Text glowing>
          Available NOVA: <span style={{ color: 'gold' }}>{novaBalance.toFixed(2)}</span>
        </Text>
      </InfoBlock>
    </Hero>
  )
}
export default GameHeader
