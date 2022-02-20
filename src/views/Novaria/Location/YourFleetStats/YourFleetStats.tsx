import React, { useState } from 'react'
import styled from 'styled-components'
import { useRecall } from 'hooks/useNovaria'

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
  fleetPower,
  fleetMineral,
  fleetMaxMineral,
  currentTravelCooldown,
  currentMiningCooldown,
}) => {
  const [pendingTx, setPendingTx] = useState(false)

  function twoDigits(num) {
    return ("0".concat(num < 0 ? "0": num.toString())).slice(-2)
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
        <div>Size</div>
        <div>{fleetSize}</div>
      </Stat>
      <Stat>
        <div>Power</div>
        <div>{fleetPower}</div>
      </Stat>
      <Stat>
        <div>Mineral</div>
        <div>
          {(fleetMineral / 10 ** 18).toFixed(2)}
        </div>
      </Stat>

      <div>COOLDOWNS</div>

      <Stat>
        <div>Mining</div>
        <div>{miningCooldown}</div>
      </Stat>
      <Stat>
        <div>Travel</div>
        <div>{travelCooldown}</div>
      </Stat>

      {fleetSize < 25 && <Button onClick={sendRecallTx}>Recall to Haven</Button>}
    </Stats>
  )
}

export default YourFleetStats
