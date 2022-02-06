import { useGetAttackPower, useGetFleetSize } from 'hooks/useNovaria'
import React from 'react'

const PlayersTableRow = ({ fleet }) => {
  const fleetSize = useGetFleetSize(fleet)
  const fleetPower = useGetAttackPower(fleet)

  return (
    <div>
      <div>{fleet}</div>
      <div>{fleetSize}</div>
      <div>{fleetPower}</div>
    </div>
  )
}

export default PlayersTableRow
