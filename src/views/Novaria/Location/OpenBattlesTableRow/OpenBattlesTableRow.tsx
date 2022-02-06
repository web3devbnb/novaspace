import React from 'react'

const OpenBattlesTableRow = ({ battle }) => {
  return (
    <div>
      <div>{battle}</div>
      <div>0x1234...</div>
      <div>17:00 UTC</div>
    </div>
  )
}

export default OpenBattlesTableRow
