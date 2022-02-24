import React from 'react'
import styled from 'styled-components'
import PlayersTableRow from './PlayersTableRow'

const Body = styled.div`
  margin: 10px 5px;
  display: relative;
`

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  color: #289794;
  font-size: 12px;
  text-align: right;
`

const TableContent = styled.div`
  overflow-y: auto;
  scrollbar-color: #5affff #289794;
  scrollbar-width: thin;
  max-height: 140px;

  &::-webkit-scrollbar { 
    width: 5px;
    background-color: #289794;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background-color: #5affff;
  }
`

const PlayersTable = ({ players, playerBattleStatus }) => {
  return (
    <Body>
      <div>
        <HeaderRow>
          <div style={{textAlign:'left'}}>PLAYER</div>
          <div>SIZE</div>
          <div>POWER</div>
          <div style={{marginRight:6}}>MINERAL</div>
        </HeaderRow>
      </div>
      <TableContent>
        {players.map((player) => (
          <PlayersTableRow player={player} status={playerBattleStatus} />
        ))}
      </TableContent>
    </Body>
  )
}

export default PlayersTable
