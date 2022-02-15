import { Button, Modal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import { useEnterBattle, useGetBattle } from 'hooks/useNovaria'
import React from 'react'

const BattleModal = (battle, onDismiss) => {

  const battleInfo = useGetBattle(battle)
  const player = battleInfo[4][0]
  

  const { onEnterBattle } = useEnterBattle()
  return (
    <Modal title="BATTLE" onDismiss={onDismiss} >
      
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
