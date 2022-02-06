import React from 'react'
import OpenBattlesTableRow from './OpenBattlesTableRow'

const OpenBattlesTable = ({ battles }) => {
  return (
    <div>
      <div>
        <div>
          <div>ATTACKER</div>
          <div>DEFENDER</div>
          <div>START TIME</div>
        </div>
      </div>
      <div>
        {battles.map((battle) => (
          <OpenBattlesTableRow battle={battle} />
        ))}
      </div>
    </div>
  )
}

export default OpenBattlesTable
