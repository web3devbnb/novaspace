import { useModal } from '@pancakeswap-libs/uikit'
import { useGetAttackPower, useGetFleetSize } from 'hooks/useNovaria'
import React from 'react'
import AttackPlayerModal from '../AttackPlayerModal'

const PlayersTableRow = ({ fleet }) => {
  const fleetSize = useGetFleetSize(fleet)
  const fleetPower = useGetAttackPower(fleet)
  const [handleClick] = useModal(<AttackPlayerModal />)

  return (
    <div onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex={0}>
      <div>{fleet}</div>
      <div>{fleetSize}</div>
      <div>{fleetPower}</div>
    </div>
  )
}

export default PlayersTableRow
