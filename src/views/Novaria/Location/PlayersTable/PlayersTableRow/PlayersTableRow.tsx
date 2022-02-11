import { useModal } from '@pancakeswap-libs/uikit'
import { useGetAttackPower, useGetFleetSize, useGetNameByAddress, useGetFleetMineral } from 'hooks/useNovaria'
import React from 'react'
import styled from 'styled-components'
import PlayerModal from '../PlayerModal'

const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
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

const PlayersTableRow = ({ player }) => {
  const fleetSize = useGetFleetSize(player)
  const fleetPower = useGetAttackPower(player)
  const name = useGetNameByAddress(player)
  const mineral = useGetFleetMineral(player)
  const [handleClick] = useModal(<PlayerModal player={player} />)

  return (
    <Row onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex={0}>
      <Cell>{name}</Cell>
      <Cell>{fleetSize}</Cell>
      <Cell>{fleetPower}</Cell>
      <Cell>{mineral}</Cell>
    </Row>
  )
}

export default PlayersTableRow
