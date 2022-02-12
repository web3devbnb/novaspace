import React from 'react'

const YourFleetStats = ({ fleetSize, fleetPower, fleetMineral, fleetMaxMineral }) => {
  return (
    <div>
      <div>FLEET SIZE: {fleetSize}</div>
      <div>FLEET POWER: {fleetPower}</div>
      <div>FLEET MINERAL: {fleetMineral}</div>
      <div>FLEET MAX MINERAL: {fleetMaxMineral}</div>
    </div>
  )
}

export default YourFleetStats
