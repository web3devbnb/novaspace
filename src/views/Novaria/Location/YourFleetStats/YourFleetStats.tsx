import React, { useState } from 'react'
import styled from 'styled-components'
import { useRecall } from 'hooks/useNovaria'
import { getWeb3 } from 'utils/web3'

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Stat = styled.div`
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  cursor: pointer;
  border: 1px solid #5affff;
  background: transparent;
  color: #5affff;
  width: 100%;
  margin: 5px;
  margin-top: 10px;
  &:hover {
    background-color: #5affff;
    color: black;
  }
`

const YourFleetStats = ({
  fleetSize,
  maxFleetSize,
  fleetPower,
  miningCapacity,
  mineralCapacity,
  shipClasses,
  playerFleet,
  currentTravelCooldown,
  currentMiningCooldown,
  fleetLocation,
}) => {
  const web3 = getWeb3()

  const [pending, setPendingTx] = useState(false)

  function twoDigits(num) {
    return '0'.concat(num < 0 ? '0' : num.toString()).slice(-2)
  }

  function showCountdown(countDownDate) {
    const now = new Date().getTime()
    const timeleft = countDownDate - now

    const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000)

    let clock = twoDigits(hours)
    clock += ':'
    clock += twoDigits(minutes)
    clock += ':'
    clock += twoDigits(seconds)

    return clock
  }

  const miningCooldown = showCountdown(currentMiningCooldown)
  const travelCooldown = showCountdown(currentTravelCooldown)
  const notHaven = fleetLocation.X !== 0 && fleetLocation.Y !== 0

  const { onRecall } = useRecall(true)
  const sendRecallTx = async () => {
    setPendingTx(true)
    try {
      await onRecall()
      console.log('Exploring')
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  return (
    <Stats>
      <Stat>
        <div>SIZE</div>
        <div>
          {fleetSize}/{maxFleetSize}
        </div>
      </Stat>
      <Stat>
        <div>ATTACK</div>
        <div>{fleetPower}</div>
      </Stat>
      <Stat>
        <div>MINING</div>
        <div>
          {Number(web3.utils.fromWei(miningCapacity)).toFixed(2)}/
          {Number(web3.utils.fromWei(mineralCapacity)).toFixed(1)}
        </div>
      </Stat>

      {shipClasses.map((ship, i) => {
        return (
          <Stat key={ship.name}>
            <div>{ship.name.toUpperCase()}S</div>
            <div>{playerFleet[i] || '-'}</div>
          </Stat>
        )
      })}

      <div style={{ fontWeight: 'bold' }}>COOLDOWNS</div>

      <Stat>
        <div>MINING</div>
        <div>{miningCooldown}</div>
      </Stat>
      <Stat>
        <div>TRAVEL</div>
        <div>{travelCooldown}</div>
      </Stat>

      {fleetSize < 25 && notHaven && <Button onClick={sendRecallTx}>{!pending ? 'RECALL TO HAVEN' : 'pending'}</Button>}
    </Stats>
  )
}

export default YourFleetStats
