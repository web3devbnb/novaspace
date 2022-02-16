import React from 'react'

const YourFleetStats = ({ fleetSize, fleetPower, fleetMineral, fleetMaxMineral }) => {
  return (
    <div>
      <div>SIZE: {fleetSize}</div>
      <div>POWER: {fleetPower}</div>
      <div>MINERAL: {fleetMineral}</div>
      <div>MAX MINERAL: {fleetMaxMineral}</div>
    </div>
  )
}

export default YourFleetStats
