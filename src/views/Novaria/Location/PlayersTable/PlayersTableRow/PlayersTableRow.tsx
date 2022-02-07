import { useModal } from '@pancakeswap-libs/uikit'
import { useGetAttackPower, useGetFleetSize } from 'hooks/useNovaria'
import React from 'react'
import styled from 'styled-components'
import PlayerModal from '../PlayerModal'

const Row = styled.div``
const Cell = styled.div``

const PlayersTableRow = ({ player }) => {
  const fleetSize = useGetFleetSize(player)
  const fleetPower = useGetAttackPower(player)
  const [handleClick] = useModal(<PlayerModal player={player} />)

  return (
    <Row onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex={0}>
      <Cell>{player}</Cell>
      <Cell>{fleetSize}</Cell>
      <Cell>{fleetPower}</Cell>
    </Row>
  )
}

export default PlayersTableRow
