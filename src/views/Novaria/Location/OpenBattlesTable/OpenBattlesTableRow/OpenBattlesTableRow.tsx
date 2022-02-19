import { useModal } from '@pancakeswap-libs/uikit'
import React from 'react'
import styled from 'styled-components'
import { useGetBattle } from 'hooks/useNovaria'
import BattleModal from '../BattleModal'

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
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

const OpenBattlesTableRow = ({ battle, status}) => {
  const [handleClick] = useModal(<BattleModal battle={battle} status={status} />)
  const battleInfo = useGetBattle(battle)
  const battleStart = new Date(battleInfo.deadline * 1000).toLocaleString()
  console.log('battle stats', battleInfo)

  // if (battleInfo.coordX !== placeX && battleInfo.coordY !== placeY) {
  //   return (null)
  // }

  return (
    <Row onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex={0}>
      <Cell>{battle}</Cell>
      <Cell>{battleInfo.attackTeam[1]}</Cell>
      <Cell>{battleInfo.defendTeam[1]}</Cell>
      <Cell>{battleStart}</Cell>
    </Row>
  )
}

export default OpenBattlesTableRow
