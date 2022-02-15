import { useModal } from '@pancakeswap-libs/uikit'
import React from 'react'
import styled from 'styled-components'
import { useGetBattle } from 'hooks/useNovaria'
import BattleModal from '../BattleModal'


const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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

const OpenBattlesTableRow = ({ battle, index,  }) => {
  const [handleClick] = useModal(<BattleModal />)
  const battleInfo = useGetBattle(battle)

  return (
    <Row onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex={0}>
      <Cell>{index}</Cell>
      <Cell>{battleInfo[3][1]}</Cell>
      <Cell>{battleInfo[4][1]}</Cell>
      <Cell>{battleInfo[0]}</Cell>
    </Row>
  )
}

export default OpenBattlesTableRow
