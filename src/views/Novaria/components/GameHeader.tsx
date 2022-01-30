import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap-libs/uikit'
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
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 10px;
`

const StyledHeading = styled(Heading)`
    text-align: center;
    align-items: center;
  
`

const InfoBlock = styled.div`

`

const Logo = styled.img`
    object-position: left;
    margin-top: -70px;
    margin-bottom: 60px;
    background-color: #000a17;
`

const GameHeader = ({ children }) => {

    const fleetLocation = useGetFleetLocation()
    const novaBalance = getBalanceNumber(useTokenBalance(getNovaAddress()))

    return (
        <Hero>
            <Logo src={smallLogo} alt='Novaria Logo' />

            <StyledHeading as="p" size="xl" glowing>
                {children}
            </StyledHeading>
            <InfoBlock>
                <Text glowing>
                    Player Location: ({fleetLocation[0]}, {fleetLocation[1]})
                </Text>
                <Text glowing>
                    Available NOVA: <span style={{color: 'gold'}}>{novaBalance.toFixed(2)}</span>                    
                </Text>
            </InfoBlock>
        </Hero>
    )
}
  export default GameHeader