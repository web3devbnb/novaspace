import { AbiItem } from 'web3-utils'
import { times } from 'lodash'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MapAbi from 'config/abi/Map.json'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import contracts from 'config/constants/contracts'
import GameMenu from '../components/GameMenu'

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
  grid-template-columns: repeat(${(props: GridProps) => props.nx}, 1fr);
  grid-template-rows: repeat(${(props: GridProps) => props.ny}, 1fr);
  grid-gap: 1px;
`

const GridCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  outline: 1px solid black;
  position: relative;
`

const GridCellId = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 0.5rem;
`

const GridControls = styled.div`
  display: flex;
  justify-content: space-between;
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
  gap: 5px;
`

const NX = 5
const NY = 5

const Map: React.FC = (props) => {
  const [mapData, setMapData] = useState(null)

  const [X, setX] = useState(0)
  const [Y, setY] = useState(0)

  const [XLen, setXLen] = useState(NX)
  const [YLen, setYLen] = useState(NY)

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchMapData(0, 0, XLen - 1, YLen - 1)
      setMapData(data)
    }
    fetch()
  }, [XLen, YLen])

  return (
    <Body>
      <Grid nx={XLen} ny={YLen}>
        {times(XLen * YLen, (i) => {
          return (
            <GridCell key={i}>
              {mapData && mapData[i] && mapData[i].name}
              <GridCellId>
                {i % XLen} x {Math.trunc(i / YLen)}
              </GridCellId>
            </GridCell>
          )
        })}
      </Grid>

      <GridControls>
        <InputControl>
          <button type="button">Find Location (x, y)</button>
          <CoordInput type="number" value={X} onChange={(e) => setX(parseFloat(e.target.value))} />
          x
          <CoordInput type="number" value={Y} onChange={(e) => setY(parseFloat(e.target.value))} />
        </InputControl>

        <InputControl>
          <button type="button">Set grid size (x, y)</button>
          <CoordInput type="number" value={XLen} onChange={(e) => setXLen(parseFloat(e.target.value))} />
          x
          <CoordInput type="number" value={YLen} onChange={(e) => setYLen(parseFloat(e.target.value))} />
        </InputControl>
      </GridControls>
    </Body>
  )
}

export default Map
