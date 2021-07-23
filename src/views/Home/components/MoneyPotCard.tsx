import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'

const StyledMoneyPotCard = styled(Card)`
  
  background-repeat: no-repeat;
  background-position: center;
  min-height: 376px;
  margin-right: 0px;
  margin-left: 0px;
  border-radius: 30px;
  background-color: transparent;
  text-align: center;
`

const Block = styled.div`
  margin-bottom: 0px;
`
const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`
const CardImage = styled.img`
  margin-bottom: 0px;
  margin:15px;
`

const Actions = styled.div`
  margin-top: 24px;
`
const MoneyedPotCard = () => {  

    return (
        <StyledMoneyPotCard>
          <CardBody>
            <Heading size="xl" mb="10px" style={{
              textShadow:'2px 2px 8px #00aaff95, -2px -2px 8px #00FF0095 '}}>
              My Rewards
            </Heading>
            <CardImage src="/images/farms/bnb.png" alt="bnb logo" width={80} height={80} />
            <CardImage src="/images/farms/busd.png" alt="busd logo" width={80} height={80} />
              
            
          </CardBody>
        </StyledMoneyPotCard>
        
      )
    }
    
    export default MoneyedPotCard