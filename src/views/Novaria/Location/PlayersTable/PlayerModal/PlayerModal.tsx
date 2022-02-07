import { Button, Modal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import {
  useEnterBattle,
  useGetAttackPower,
  useGetFleet,
  useGetFleetLocation,
  useGetFleetMineral,
  useGetFleetSize,
  useGetMaxMineralCapacity,
} from 'hooks/useNovaria'
import React from 'react'

const PlayerModal = ({ player }) => {
  const fleet = useGetFleet()
  const fleetLocation = useGetFleetLocation(player)
  const fleetSize = useGetFleetSize(player)
  const fleetPower = useGetAttackPower(player)
  const fleetMineral = useGetFleetMineral(player)
  const fleetMaxMineral = useGetMaxMineralCapacity()

  const { onEnterBattle } = useEnterBattle()

  return (
    <Modal title={`PLAYER ${player}`}>
      <div>
        <div>FLEET: {fleet}</div>
        <div>
          FLEET LOCATION: {fleetLocation.X}, {fleetLocation.Y}
        </div>
        <div>FLEET SIZE: {fleetSize}</div>
        <div>FLEET POWER: {fleetPower}</div>
        <div>FLEET MINERAL: {fleetMineral}</div>
        <div>FLEET MAX MINERAL: {fleetMaxMineral}</div>
      </div>
      <ModalActions>
        <Button variant="primary" onClick={() => onEnterBattle(player, 1)}>
          ATTACK
        </Button>
        <Button variant="primary" onClick={() => onEnterBattle(player, 2)}>
          DEFEND
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default PlayerModal
