import React, {useContext, useState} from 'react'
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
  useShipyardTakeover,
  useCompleteShipyardTakeover,
} from 'hooks/useNovaria'
import { ConnectedAccountContext } from 'App'
import ModalActions from '../../../components/NovariaModalActions'
import NovariaModal from '../../../components/NovariaModal'

interface TakeoverModalProps {
  shipyard: any
  account: string
  placeX: number
  placeY: number
  underAttack: boolean
  inCooldownStage: boolean
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
  font-size: 12px;
`

const TakeoverModal: React.FC<TakeoverModalProps> = ({ account, shipyard, placeX, placeY, underAttack, inCooldownStage, onDismiss }) => {

  const [pending, setPendingTx] = useState(false)
  const player = shipyard.takeoverAddress
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
  const isTakeoverPlayer = player === account

  console.log('player',player,'account', account, isTakeoverPlayer)
  const { onEnterBattle } = useEnterBattle()
  
  const { onTakeover } = useShipyardTakeover()
  const { onCompleteTakeover } = useCompleteShipyardTakeover()
  const sendTakeoverTx = async () => {
    setPendingTx(true)
    try {
      await onTakeover(placeX, placeY)
      console.log('attempting shipyard takeover')
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }
  const sendCompleteTakeoverTx = async () => {
    setPendingTx(true)
    try {
      await onCompleteTakeover(placeX, placeY)
      console.log('attempting shipyard takeover completion')
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  return (
    <NovariaModal title={shipyard.name} onDismiss={onDismiss}>
      
        <Child>
          Players can attempt to take control of a shipyard from the current owner by initiating a takeover event. 
          The takeover event lasts 24 hours and during that time the player that initiated a takeover must survive 
          to the end. Survival means the player has a fleet size &gt;= 200. The player can be attacked by anyone, 
          and they cannot leave the shipyard location until the takeover is complete. During a takeover event,
          if a larger player wants to attempt a takeover, they can kick out the smaller player currently attempting.
        </Child>
        <Child>
          To initiate a takeover, you must have at least 1000 fleet size and the cost is 25 NOVA.
        </Child>
        {underAttack && !isTakeoverPlayer &&
        <div>
          <Child>Attacking Player: {playerName}</Child>
          <Child>SHIPS: {shipClasses.map((ship, index) => {
                      return (
                        <span key={ship.name}>
                          {ships[index]} {ship.name}s, {' '}
                        </span>
                      )
                    })}
          </Child>
          <Child>SIZE: {fleetSize}</Child>
          <Child>
            BATTLE STATUS: {' '}
            {playerBattleStatus === '0' && 'Not in Battle'}
            {playerBattleStatus === '1' && 'Attacking'}
            {playerBattleStatus === '2' && 'Defending'}
          </Child>
        
          <ModalActions>
            <Button  onClick={() => onEnterBattle(player, 1)}>
              {!pending ? 'ATTACK PLAYER' : 'pending...'}
            </Button>
            <Button  onClick={() => onEnterBattle(player, 2)}>
              {!pending ? 'DEFEND PLAYER' : 'pending...'}
            </Button>
          </ModalActions>                
      </div> 
      }
      {!underAttack &&
        <ModalActions>
          <Button onClick={sendTakeoverTx}>
            {!pending ? 'Initiate Takeover' : 'pending...'}
          </Button>
        </ModalActions>
      }
      {!underAttack && isTakeoverPlayer &&
        <ModalActions>
          <Button onClick={sendCompleteTakeoverTx}>
            {!pending ? 'Complete Takeover' : 'pending...'}
          </Button>
        </ModalActions>
      }
    </NovariaModal>
  )
}

export default TakeoverModal
