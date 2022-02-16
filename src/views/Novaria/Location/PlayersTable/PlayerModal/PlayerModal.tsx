import { Button, Modal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import {
  useEnterBattle,
  useGetAttackPower,
  useGetFleetLocation,
  useGetFleetMineral,
  useGetFleetSize,
  useGetMaxMineralCapacity,
  useGetShips,
} from 'hooks/useNovaria'
import React from 'react'

interface PlayerModalProps {
  player: string
  onDismiss?: () => void
}

const PlayerModal: React.FC<PlayerModalProps> = ({ player, onDismiss }) => {
  const ships = useGetShips(player)
  const fleetLocation = useGetFleetLocation(player)
  const fleetSize = useGetFleetSize(player)
  const fleetPower = useGetAttackPower(player)
  const fleetMineral = useGetFleetMineral(player)
  const fleetMaxMineral = useGetMaxMineralCapacity(player)

  const { onEnterBattle } = useEnterBattle()

  return (
    <Modal title={`PLAYER ${player}`} onDismiss={onDismiss}>
      <div>
        <div>FLEET: {ships}</div>
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
