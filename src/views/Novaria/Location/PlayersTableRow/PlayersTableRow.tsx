import { useGetAttackPower, useGetFleetMineral } from 'hooks/useNovaria'
import React from 'react'

const PlayersTableRow = ({ fleet }) => {
  const fleetPower = useGetAttackPower(fleet)
  const fleetMineral = useGetFleetMineral(fleet)

  return (
    <div>
      <div>{fleet}</div>
      <div>{fleetPower}</div>
      <div>{fleetMineral}</div>
    </div>
  )
}

export default PlayersTableRow
