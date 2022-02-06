import React from 'react'
import PlayersTableRow from './PlayersTableRow'

const PlayersTable = ({ fleets }) => {
  return (
    <div>
      <div>
        <div>
          <div>PLAYER</div>
          <div>FLEET SIZE</div>
          <div>FLEET POWER</div>
        </div>
      </div>
      <div>
        {fleets.map((fleet) => (
          <PlayersTableRow fleet={fleet} />
        ))}
      </div>
    </div>
  )
}

export default PlayersTable
