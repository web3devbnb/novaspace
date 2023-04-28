import { useModal } from '@pancakeswap-libs/uikit'
import React from 'react'
import styled from 'styled-components'
import { useGetBattle } from 'hooks/useNovaria'
import showCountdown from 'utils/countdownTimer'
import BattleModal from '../BattleModal'

const Row = styled.div<{ resolved: boolean }>`
  display: grid;
  grid-template-columns: ${(props) => (props.resolved ? '1fr 1fr 1fr' : '1fr 1fr 1fr 1fr')};
  border: 1px solid #289794;
  padding: 3px;
  margin: 4px 0;
  &:hover {
    background-color: #289794;
  }
`
const Cell = styled.div`
  // flex: 1;
  // width: 33%;
  // overflow-x: hidden;
  text-overflow: ellipsis;
`

const OpenBattlesTableRow = ({ battle, status, currentLocation, resolved, account }) => {
  const [handleClick] = useModal(<BattleModal battle={battle} status={status} currentLocation={currentLocation} />)
  const battleInfo = useGetBattle(battle)
  const attackTeam = battleInfo.attackers
  const defendTeam = battleInfo.defenders
  const battleStart = showCountdown(new Date(battleInfo.deadline * 1000))
  let playerInBattle = false
  for (let i = 0; i < attackTeam.length; i++) {
    if (attackTeam[i].toString() === account.toString()) {
      playerInBattle = true
    }
  }
  for (let i = 0; i < defendTeam.length; i++) {
    if (defendTeam[i].toString() === account.toString()) {
      playerInBattle = true
    }
  }

  if (!resolved || playerInBattle) {
    return (
      <Row onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex={0} resolved={resolved}>
        <Cell>{battle}</Cell>
        <Cell>{battleInfo.attackTeam[1]}</Cell>
        <Cell>{battleInfo.defendTeam[1]}</Cell>
        {!resolved && <Cell>{battleStart}</Cell>}
      </Row>
    )
  }
  return null
  // <Row onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex={0}> </Row>
}

export default OpenBattlesTableRow
