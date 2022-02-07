import { useModal } from '@pancakeswap-libs/uikit'
import React from 'react'
import styled from 'styled-components'
import BattleModal from '../BattleModal'

const Row = styled.div``
const Cell = styled.div``

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
