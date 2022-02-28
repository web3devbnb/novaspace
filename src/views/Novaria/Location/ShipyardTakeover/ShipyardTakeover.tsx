import React, {useState} from 'react'
import styled from 'styled-components'
import { getWeb3 } from 'utils/web3'
import { useModal } from '@pancakeswap-libs/uikit'
import { useRecall, useShipyardTakeover } from 'hooks/useNovaria'
import showCountdown from 'utils/countdownTimer'
import TakeOverModal from './TakeOverModal'



const Button = styled.button` 
    cursor:pointer;
    border: 1px solid #5affff;
    background: transparent;
    color: #5affff;
    width: 100%;
    margin-top: 10px;
    &:hover {
        background-color: #5affff;
        color: black
    }
`

const Disabled = styled.button`
    color: gray;
    border: 1px solid gray;
    width: 100%;
    background: transparent;
`


const ShpiyardTakeover = ({ shipyard, placeX, placeY, refinery, account, currentLocation }) => {
  
    const cooldownTime = new Date((Number(shipyard.lastTakeoverTime) + 604800) * 1000)
    const inCooldownStage = Number(cooldownTime) > Number(new Date())
    const underAttack = Number(new Date(shipyard.takeoverDeadline * 1000)) > Number(new Date())
    const [handleClick] = useModal(<TakeOverModal account={account} shipyard={shipyard} placeX={placeX} placeY={placeY} inCooldownStage={inCooldownStage} underAttack={underAttack} currentLocation={currentLocation} />)

 

  return (
    <div>
        {inCooldownStage && !refinery &&
            <Disabled> 
                Takeover Cooldown {showCountdown(cooldownTime)}
            </Disabled>
        }
        {!inCooldownStage && !underAttack && !refinery && 
            <Button type='button' onClick={handleClick} >STATUS</Button> 
        }
        {underAttack && !refinery &&
            <Button type='button' onClick={handleClick} >Shipyard Under Attack</Button>         
        }
        {refinery && 'Shipyard cannot be taken over'}
    </div>
  )
}

export default ShpiyardTakeover
