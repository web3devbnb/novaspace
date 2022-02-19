import React, { useState } from 'react'
import styled from 'styled-components'
import { getWeb3 } from 'utils/web3'
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
  const web3 = getWeb3()
  const [pendingTx, setPendingTx] = useState(false)

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
          {(fleetMineral / 10 ** 18).toFixed(3)}/{web3.utils.fromWei(fleetMaxMineral)}
        </div>
      </Stat>

      <div>COOLDOWNS</div>

      <Stat>
        <div>Mining</div>
        <div>{Number(currentMiningCooldown) > Number(+new Date()) ? currentMiningCooldown.toLocaleString() : '-'}</div>
      </Stat>
      <Stat>
        <div>Travel</div>
        <div>{Number(currentTravelCooldown) > Number(+new Date()) ? currentTravelCooldown.toLocaleString() : '-'}</div>
      </Stat>

      {fleetSize < 25 && <Button onClick={sendRecallTx}>Recall to Haven</Button>}
    </Stats>
  )
}

export default YourFleetStats
