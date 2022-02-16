import React from 'react'
import styled from 'styled-components'
import { useModal } from '@pancakeswap-libs/uikit'
import BattleModal from '../OpenBattlesTable/BattleModal'

const Body = styled.div`
    display: flex;
    flex-direction: column;
`

const NoBattle = styled.div`
    border: 1px solid #5affff;
`

const BattleButton = styled.button`
    cursor: pointer;
    border: 1px solid #5affff;
`

const BattleStatus = ({ playerBattleStatus, playerBattleInfo }) => {
  
    console.log('battle status', playerBattleInfo)
    const attacking = playerBattleInfo[0] === 1
    const defending = playerBattleInfo[0] === 2
    const battleId = playerBattleInfo[1]
    
    const [handleClick] = useModal(<BattleModal battle={battleId} />)

  return (
    <Body>
      {playerBattleStatus === false ? <NoBattle>Not in Battle</NoBattle> : ''}
      {playerBattleStatus === true ? 
        <div>
            {defending ? <NoBattle> DEFENDING </NoBattle> : '' }
            {attacking ?<NoBattle> ATTACKING </NoBattle>: '' }
            <BattleButton type='button' onClick={handleClick}>BATTLE {battleId}</BattleButton>
        </div> : ''}
    </Body>
  )
}

export default BattleStatus
