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
    padding: 1rem;
    height: 15px;
`

const BattleButton = styled.button`
    cursor: pointer;
    border: 1px solid #5affff;
`

const BattleStatus = ({ playerBattleStatus, playerBattleInfo }) => {
  
    console.log('battle status', playerBattleStatus)
    console.log('player battle info', playerBattleInfo)
    const attacking = playerBattleInfo.battleStatus === '1'
    const defending = playerBattleInfo.battleStatus === '2'
    console.log()
    const battleId = Number(playerBattleInfo.battleId)
    
    const [handleClick] = useModal(<BattleModal battle={battleId} />) 

  return (
    <Body>
      {playerBattleStatus === false ? <NoBattle>Not in Battle</NoBattle> : ''}
      {defending ? <NoBattle> DEFENDING </NoBattle> : '' }
      {attacking ? <NoBattle> ATTACKING </NoBattle>: '' }
      {playerBattleStatus === true ?  <BattleButton type='button' onClick={handleClick}>BATTLE {battleId}</BattleButton>: ''}
        
    </Body>
  )
}

export default BattleStatus
