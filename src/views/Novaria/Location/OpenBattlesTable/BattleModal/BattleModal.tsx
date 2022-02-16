import { Button, Modal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import { useEnterBattle, useGetBattle, useGoBattle } from 'hooks/useNovaria'
import React, {useState} from 'react'

interface BattleModalProps {
  battle: number
  onDismiss?: () => void
}
const BattleModal: React.FC<BattleModalProps> = ({battle, onDismiss}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const battleInfo = useGetBattle(battle)
  const atkPower = battleInfo.attackTeam[1]
  const defPower = battleInfo.defendTeam[1]
  const attackers = [battleInfo.attackTeam[0]]
  const defenders = [battleInfo.defendTeam[0]]
  const player = defenders.toString()
  console.log('player', player)
  console.log('battle info', battleInfo)
  const startTime = new Date(battleInfo.deadline * 1000).toLocaleString()
  const battleReady = new Date() >= new Date(battleInfo.deadline * 1000)

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
        <Button variant="primary" onClick={() => onEnterBattle(player, 1)}>
          ATTACK
        </Button>
        <Button variant="primary" onClick={() => onEnterBattle(player, 2)}>
          DEFEND
        </Button>
        {battleReady ?
          <Button variant="primary" onClick={sendBattleTx}>
            START BATTLE
          </Button>
        : ''}
    </ModalActions>
    </Modal>
  )
}

export default BattleModal
