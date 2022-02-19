import React, {useState} from 'react'
import styled from 'styled-components'
import { getWeb3 } from 'utils/web3'
import { useModal } from '@pancakeswap-libs/uikit'
import { useRecall, useShipyardTakeover } from 'hooks/useNovaria'
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

const ShpiyardTakeover = ({ shipyard, placeX, placeY, refinery, account }) => {
  
    const inCooldownStage = Number(new Date((shipyard.lastTakeoverTime + 604800) * 1000)) > Number(new Date())
    const underAttack = Number(new Date(shipyard.takeoverDeadline * 1000)) > Number(new Date())
    const [handleClick] = useModal(<TakeOverModal account={account} shipyard={shipyard} placeX={placeX} placeY={placeY} inCooldownStage={inCooldownStage} underAttack={underAttack} />)


  return (
    <div>
        {inCooldownStage && !refinery &&
            <div style={{border:'1px solid #5affff'}}> 
                Shipyard takeover on Cooldown
            </div>
        }
        {!inCooldownStage && !underAttack && !refinery &&
            <Button type='button' onClick={handleClick} >Initiate</Button> 
        }
        {underAttack && !refinery &&
            <Button type='button' onClick={handleClick} >Under Attack</Button>         
        }
        {refinery && 'Shipyard cannot be taken over'}
    </div>
  )
}

export default ShpiyardTakeover
