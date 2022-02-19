import React, {useState} from 'react'
import styled from 'styled-components'
import { getWeb3 } from 'utils/web3'
import { useChangeName, useGetPlaceInfo, useRecall, useSetShipyardName } from 'hooks/useNovaria'

const Body = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid gray;
  margin-top: 10px;
  padding: 10px;
`

const Item = styled.div`
  margin: 10px;
`

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

const PlaceControls = ({ placeX, placeY }) => {
  const web3 = getWeb3()
  const [pending, setPendingTx] = useState(false)
  const [planetName, setPlanetName] = useState('')
  const [shipyardName, setShipyardName] = useState('')

  const planetOwner = useGetPlaceInfo(placeX, placeY)

  const {onChange} = useChangeName()
  const sendPlanetNameChange = async () =>{
    setPendingTx(true)
    try {
      await onChange(placeX, placeY, planetName)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }

  }

  const {onShipyardChange} = useSetShipyardName()
  const sendShipyardNameChange = async () =>{
    setPendingTx(true)
    try {
      await onShipyardChange(placeX, placeY, shipyardName)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }

  }
  

  return (
    <Body style={{marginTop:10}}>
      <Item>
        <input type="text" required maxLength={16} onChange={(e) => setPlanetName(e.target.value)} />
        <Button onClick={sendPlanetNameChange} >{!pending ? 'Set Planet Name' : ''}</Button>
      </Item>
      <Item>
        <input type="text" required maxLength={16} onChange={(e) => setShipyardName(e.target.value)} />
        <Button onClick={sendShipyardNameChange} >{!pending ? 'Set Shipyard Name' : ''}</Button>
      </Item>
    </Body>
  )
}

export default PlaceControls
