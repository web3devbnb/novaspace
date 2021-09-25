import React from 'react'
import styled from 'styled-components'
import { Heading } from '@pancakeswap-libs/uikit'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'

const Hero = styled.div`
  position: relative;
  background-position: right;
  border-bottom: solid 1px ${({ theme }) => theme.colors.primary};
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 0px;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    justify-content: flex-end;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    // padding: 0 5vw;
  }
`

const StyledHeading = styled(Heading)`
  text-align: center;
  margin-bottom: 32px;

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
