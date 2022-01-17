import { AbiItem } from 'web3-utils'
import { times } from 'lodash'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MapAbi from 'config/abi/Map.json'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import contracts from 'config/constants/contracts'

const RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const CHAIN_ID = '97'

const fetchMapData = async (lx: number, ly: number, rx: number, ry: number) => {
  const web3 = new Web3(httpProvider)
  const contract = new web3.eth.Contract(MapAbi as unknown as AbiItem, contracts.map[CHAIN_ID])
  const data = await contract.methods.getCoordinatePlaces(lx, ly, rx, ry).call()
  console.log('map data', data)
  return data
}

export interface GridProps {
  nx: number
  ny: number
}

const Grid = styled.div`
  height: calc(100vh - 68px - 145px);
  display: grid;
  grid-template-rows: repeat(${(props: GridProps) => props.nx}, 1fr);
  grid-template-columns: repeat(${(props: GridProps) => props.ny}, 1fr);
  grid-gap: 1px;
`

const GridCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  margin-left: -1px;
  margin-bottom: -1px;
`

const Body = styled.div``

const CoordInput = styled.input`
  width: 4em;
  background: transparent;
  -moz-appearance: textfield;
  color: white;
`

const InputControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: white;
`

const Novaria = (props) => {
  const [mapData, setMapData] = useState(null)
  const [X, setX] = useState(0)
  const [Y, setY] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchMapData(0, 0, NX - 1, NY - 1)
      setMapData(data)
    }
    fetch()
  }, [])

  const NX = 5
  const NY = 5

  return (
    <Body>
      <Grid nx={NX} ny={NY}>
        {times(NX * NY, (i) => {
          return <GridCell key={i}>{mapData && mapData[i].name}</GridCell>
        })}
      </Grid>
      <InputControl>
        {/* Find location sets the i=0 coordinate */}
        <button
          type="button"
          //  onClick={fetch}
        >
          Find Location (x, y)
        </button>
        <CoordInput type="number" value={X} onChange={(e) => setX(parseFloat(e.target.value))} />
        <CoordInput type="number" value={Y} onChange={(e) => setY(parseFloat(e.target.value))} />
      </InputControl>
    </Body>
  )
}

export default Novaria
