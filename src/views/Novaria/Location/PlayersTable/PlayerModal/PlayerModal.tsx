import { Button, Modal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import {
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
        <Button variant="primary">ATTACK</Button>
      </ModalActions>
    </Modal>
  )
}

export default PlayerModal
