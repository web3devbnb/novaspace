import React from 'react'

const YourFleetStats = ({ fleetSize, fleetPower, fleetMineral, fleetMaxMineral }) => {
  return (
    <div>
      <div>SIZE: {fleetSize}</div>
      <div>POWER: {fleetPower}</div>
      <div>MINERAL: {fleetMineral}/{fleetMaxMineral}</div>
    </div>
  )
}

export default YourFleetStats
