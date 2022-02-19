import React from 'react'
import styled from 'styled-components'
import {
  useEnterBattle,
  useGetAttackPower,
  useGetFleetLocation,
  useGetFleetMineral,
  useGetFleetSize,
  useGetMaxMineralCapacity,
  useGetPlayer,
  useGetShipClasses,
  useGetShips,
} from 'hooks/useNovaria'
import ModalActions from '../../../components/NovariaModalActions'
import NovariaModal from '../../../components/NovariaModal'

interface PlayerModalProps {
  player: string
  status: boolean
  onDismiss?: () => void
}

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  border: 1px solid #5affff;
  color: #5affff;
  font-weight: medium;
  font-size: 16px;
  padding: 5px 10px;
  &:hover {
    background: #5affff;
    color: black;
  }
`

const Child = styled.div`
  margin-bottom: 5px;
`

const PlayerModal: React.FC<PlayerModalProps> = ({ player, status, onDismiss }) => {
  const ships = useGetShips(player)
  console.log('ships', ships)
  const shipClasses = useGetShipClasses()
  const playerInfo = useGetPlayer(player)
  const playerName = playerInfo.name
  const playerBattleStatus =(playerInfo.battleStatus).toString()
  console.log('playermodal info', playerInfo)
  const fleetLocation = useGetFleetLocation(player)
  const fleetSize = useGetFleetSize(player)
  const fleetPower = useGetAttackPower(player)
  const fleetMineral = useGetFleetMineral(player)
  const fleetMaxMineral = useGetMaxMineralCapacity(player)
  const inBattle = status === true

  const { onEnterBattle } = useEnterBattle()

  return (
    <NovariaModal title={playerName} onDismiss={onDismiss}>
      <div>
        <Child>ADDRESS: {player}</Child>
        <Child>SHIPS: {shipClasses.map((ship, index) => {
                    return (
                      <span key={ship.name}>
                        {ships[index]} {ship.name}s, {' '}
                      </span>
                    )
                  })}
        </Child>
        <Child>
          LOCATION: ({fleetLocation.X}, {fleetLocation.Y})
        </Child>
        <Child>SIZE: {fleetSize}</Child>
        <Child>POWER: {fleetPower}</Child>
        <Child>MINERAL: {(Number(fleetMineral)/10**18).toFixed(3)}</Child>
        <Child>MAX MINERAL: {(Number(fleetMaxMineral)/10**18).toFixed(2)}</Child>
        <Child>
          BATTLE STATUS: {' '}
          {playerBattleStatus === '0' && 'Not in Battle'}
          {playerBattleStatus === '1' && 'Attacking'}
          {playerBattleStatus === '2' && 'Defending'}
        </Child>
      </div>
      {!inBattle &&
        <ModalActions>
          <Button  onClick={() => onEnterBattle(player, 1)}>
            ATTACK
          </Button>
          <Button  onClick={() => onEnterBattle(player, 2)}>
            DEFEND
          </Button>
        </ModalActions>
      }
    </NovariaModal>
  )
}

export default PlayerModal
