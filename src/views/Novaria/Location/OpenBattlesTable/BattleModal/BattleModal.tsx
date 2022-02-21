import React, {useState} from 'react'
import styled from 'styled-components'
import { useEnterBattle, useGetBattle, useGoBattle } from 'hooks/useNovaria'
import ModalActions from '../../../components/NovariaModalActions'
import Modal from '../../../components/NovariaModal'

interface BattleModalProps {
  battle: number
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

const BattleModal: React.FC<BattleModalProps> = ({battle, status, onDismiss}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const battleInfo = useGetBattle(battle)
  const atkPower = battleInfo.attackTeam[1]
  const defPower = battleInfo.defendTeam[1]
  const attackers = [battleInfo.attackTeam[0]]
  const defenders = [battleInfo.defendTeam[0]]
  // const target = useGetBattle(battle).defendTeam[0][0]
  const player = defenders.toString() 
  console.log('player', player)
  console.log('battle info', battleInfo)
  const startTime = new Date(battleInfo.deadline * 1000).toLocaleString()
  const battleReady = new Date() >= new Date(battleInfo.deadline * 1000)
  const inBattle = status === true

  const { onBattle } = useGoBattle()
  
  const sendBattleTx = async () => {
    setPendingTx(true)
    try {
        await onBattle(battle)
        console.log('Completing Battle')
    } catch (error) {
        console.log('error: ', error)
    } finally {
        setPendingTx(false)
    }
  }

  const { onEnterBattle } = useEnterBattle()
  return (
    <Modal title="BATTLE" onDismiss={onDismiss} >
      <div>
        Attack Power: {atkPower}
      </div>
      <div>
        Defend Power: {defPower}
      </div>
      <div>
        Attackers: {attackers}
      </div>
      <div>
        Defenders: {defenders}
      </div>
      <div>
        Deadline: {startTime}
      </div>
      <ModalActions>
      {!inBattle &&
        <div>
          <Button  onClick={() => onEnterBattle(player, 1)}>
            ATTACK
          </Button>
          <Button  onClick={() => onEnterBattle(player, 2)}>
            DEFEND
          </Button>
        </div> }
          {battleReady ?
            <Button  onClick={sendBattleTx}>
              RESOLVE
            </Button>
          : ''}
      </ModalActions> 
    </Modal>
  )
}

export default BattleModal
