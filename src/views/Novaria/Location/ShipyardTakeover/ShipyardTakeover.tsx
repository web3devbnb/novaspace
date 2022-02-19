import React, {useState} from 'react'
import styled from 'styled-components'
import { getWeb3 } from 'utils/web3'
import { useRecall, useShipyardTakeover } from 'hooks/useNovaria'



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

const ShpiyardTakeover = ({ shipyard, placeX, placeY }) => {
  const web3 = getWeb3()
  const [pendingTx, setPendingTx] = useState(false)

  const { onTakeover } = useShipyardTakeover()
  
  const sendTakeoverTx = async () => {
    setPendingTx(true)
    try {
      await onTakeover(placeX, placeY)
      console.log('attempting shipyard takeover')
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  console.log('shipyard filter', shipyard, placeX, placeY)

//   if (shipyard.coordX !== placeX.toString() && shipyard.coordY !== placeY) {
//       return(null)
//   }

  return (
    <div style={{}}>
         <Button type='button' onClick={sendTakeoverTx} >Initiate</Button> 
    </div>
  )
}

export default ShpiyardTakeover
