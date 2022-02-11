import { useModal } from '@pancakeswap-libs/uikit'
import React from 'react'
import styled from 'styled-components'
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

const OpenBattlesTableRow = ({ battle }) => {
  const [handleClick] = useModal(<BattleModal />)

  return (
    <Row onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex={0}>
      <Cell>{battle}</Cell>
      <Cell>0x1234...</Cell>
      <Cell>17:00 UTC</Cell>
    </Row>
  )
}

export default OpenBattlesTableRow
