import { useModal } from '@pancakeswap-libs/uikit'
import React from 'react'
import BattleModal from '../BattleModal'

const OpenBattlesTableRow = ({ battle }) => {
  const [handleClick] = useModal(<BattleModal />)

  return (
    <div onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex={0}>
      <div>{battle}</div>
      <div>0x1234...</div>
      <div>17:00 UTC</div>
    </div>
  )
}

export default OpenBattlesTableRow
