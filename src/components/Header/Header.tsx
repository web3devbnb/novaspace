import React from 'react'
import styled from 'styled-components'
import { Heading } from '@pancakeswap-libs/uikit'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'

const Hero = styled.div`
  position: relative;
  width: 98%;
  background-position: right;
  border-bottom: solid 1px ${({ theme }) => theme.colors.primary};
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 0px;


  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 50px;
    width: 92%;
  }
  

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;

  }

  ${({ theme }) => theme.mediaQueries.xl} {
    // padding: 0 5vw;
  }
`

const StyledHeading = styled(Heading)`
  text-align: center;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.md} {
    position: absolute;
    left: 45px;
    
    bottom: 0;
    margin-bottom: 8px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin-bottom: 8px;
  }
`

const Header = ({ children }) => (
  <Hero>
    <StyledHeading as="p" size="xl" glowing>
      {children}
    </StyledHeading>
    <TotalValueLockedCard />
  </Hero>
)

export default Header
