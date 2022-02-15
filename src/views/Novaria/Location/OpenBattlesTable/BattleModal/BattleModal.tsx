import { Button, Modal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import { useEnterBattle, useGetBattle } from 'hooks/useNovaria'
import React from 'react'

interface BattleModalProps {
  battle: number
  onDismiss?: () => void
}
const BattleModal: React.FC<BattleModalProps> = ({battle, onDismiss}) => {

  const battleInfo = useGetBattle(battle)
  const player = battleInfo.defendTeam[0]
  const atkPower = battleInfo.attackTeam[1]
  const defPower = battleInfo.defendTeam[1]
  const attackers = [battleInfo.attackTeam[0]]
  const defenders = [battleInfo.defendTeam[0]]
  const startTime = battleInfo.deadline

  console.log('battle modal info', battleInfo)
  
  

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
    </ModalActions>
    </Modal>
  )
}

export default BattleModal
