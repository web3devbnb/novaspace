import React, {useState} from 'react'
import styled from 'styled-components'
import { getWeb3 } from 'utils/web3'
import { useRecall } from 'hooks/useNovaria'



const Button = styled.button` 
    cursor:pointer;
    border: 1px solid #5affff;
    background: transparent;
    color: #5affff;
    width: 100%;
    margin: 5px;
    margin-top: 10px;
    &:hover {
        background-color: #5affff;
        color: black
    }
`

const YourFleetStats = ({ fleetSize, fleetPower, fleetMineral, fleetMaxMineral, currentTravelCooldown, currentMiningCooldown }) => {
  const web3 = getWeb3()
  const [pendingTx, setPendingTx] = useState(false)

  
  const {onRecall} = useRecall(true)
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
    <div style={{marginTop:10}}>
      <div>SIZE: {fleetSize}</div>
      <div>POWER: {fleetPower}</div>
      <div>MINERAL: {web3.utils.fromWei(fleetMineral)}/{web3.utils.fromWei(fleetMaxMineral)}</div>
      <div style={{marginTop:5}}>COOLDOWNS</div>
      <div>MINING: {Number(currentMiningCooldown)> Number(+new Date()) && currentMiningCooldown.toLocaleString()}</div>
      <div>TRAVEL: { Number(currentTravelCooldown) > Number(+new Date()) ? currentTravelCooldown.toLocaleString() : ''}</div>
      {fleetSize < 25 ? <Button onClick={sendRecallTx}>Recall to Haven</Button> : ''}
    </div>
  )
}

export default YourFleetStats
