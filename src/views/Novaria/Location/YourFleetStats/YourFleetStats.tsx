import React from 'react'
import { getWeb3 } from 'utils/web3'

const YourFleetStats = ({ fleetSize, fleetPower, fleetMineral, fleetMaxMineral }) => {
  const web3 = getWeb3()
  return (
    <div>
      <div>SIZE: {fleetSize}</div>
      <div>POWER: {fleetPower}</div>
      <div>MINERAL: {web3.utils.fromWei(fleetMineral)}/{web3.utils.fromWei(fleetMaxMineral)}</div>
    </div>
  )
}

export default YourFleetStats
