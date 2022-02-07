import React from 'react'
import PlayersTableRow from './PlayersTableRow'

const PlayersTable = ({ players }) => {
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
        {players.map((player) => (
          <PlayersTableRow player={player} />
        ))}
      </div>
    </div>
  )
}

export default PlayersTable
