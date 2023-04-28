import React, { useState } from 'react'
import styled from 'styled-components'
import { useChangeName } from 'hooks/useNovaria'

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
  cursor: pointer;
  border: 1px solid #5affff;
  background: transparent;
  color: #5affff;
  margin: 5px;
  margin-top: 10px;
  &:hover {
    background-color: #5affff;
    color: black;
  }
`

const PlaceControls = ({ placeType, placeX, placeY, placeName, isDiscoverer }) => {
  const [pending, setPendingTx] = useState(false)
  const [planetName, setPlanetName] = useState('')

  // need to set so only the discoverer can set the name and it can only be set once
  // const placeOwner = useGetPlaceInfo(placeX, placeY)

  const { onChange } = useChangeName()
  const sendPlanetNameChange = async () => {
    setPendingTx(true)
    try {
      await onChange(placeX, placeY, planetName)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  if (placeName !== '') {
    return null
  }

  if (!isDiscoverer) {
    return null
  }

  if (placeType !== 3 && placeType !== 4) {
    return null
  }

  return (
    <Body style={{ marginTop: 10 }}>
      <Item>
        <input
          type="text"
          style={{ maxWidth: 180 }}
          required
          maxLength={12}
          onChange={(e) => setPlanetName(e.target.value)}
        />
        <br />
        <Button onClick={sendPlanetNameChange}>{!pending ? 'Set Location Name' : 'pending...'}</Button>
        <br />
        (The name can only be set once)
      </Item>
    </Body>
  )
}

export default PlaceControls
