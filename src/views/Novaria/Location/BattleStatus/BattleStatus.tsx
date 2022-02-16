import React from 'react'
import styled from 'styled-components'
import { useModal } from '@pancakeswap-libs/uikit'
import { useGetBattle } from 'hooks/useNovaria'
import BattleModal from '../OpenBattlesTable/BattleModal'

const Body = styled.div`
    display: flex;
    flex-direction: column;
    margin-top:10px;
`

const NoBattle = styled.div`
    border: 1px solid #5affff;
    padding: 5px;
    text-align: center;
`

const BattleButton = styled.button`
    cursor: pointer;
    border: 1px solid #5affff;
    margin-top: 5px;
    background: transparent;
    color: #5affff;
    display: flex;
    flex-wrap: wrap;
    padding: 5px 5px;
    justify-content: center;
    &:hover {
      background: #5affff;
      color: black;
    }
`

const BattleStatus = ({ playerBattleStatus, playerBattleInfo }) => {
  
    console.log('battle status', playerBattleStatus)
    console.log('player battle info', playerBattleInfo)
    const attacking = playerBattleInfo.battleStatus === '1'
    const defending = playerBattleInfo.battleStatus === '2'
    const battleId = Number(playerBattleInfo.battleId)
    const startTime = new Date(useGetBattle(battleId).deadline * 1000).toLocaleString()
    
    const [handleClick] = useModal(<BattleModal battle={battleId} />) 

  return (
    <Body>
      {playerBattleStatus === false ? <NoBattle>Not in Battle</NoBattle> : ''}
      {defending ? <NoBattle> DEFENDING </NoBattle> : '' }
      {attacking ? <NoBattle> ATTACKING </NoBattle>: '' }
      {playerBattleStatus === true ?  <BattleButton type='button' onClick={handleClick}>BATTLE {battleId} <br /> {startTime}</BattleButton>: ''}
        
    </Body>
  )
}

export default BattleStatus
