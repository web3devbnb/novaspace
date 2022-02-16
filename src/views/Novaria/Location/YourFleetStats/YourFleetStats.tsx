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

const YourFleetStats = ({ fleetSize, fleetPower, fleetMineral, fleetMaxMineral }) => {
  const web3 = getWeb3()
  const [pendingTx, setPendingTx] = useState(false)

  
  const {onRecall} = useRecall()
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
      {fleetSize < 25 ? <Button onClick={sendRecallTx}>Recall to Shipyard</Button> : ''}
    </div>
  )
}

export default YourFleetStats
