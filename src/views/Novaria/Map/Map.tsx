import { AbiItem } from 'web3-utils'
import React, { useEffect, useState } from 'react'
import { Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import MapAbi from 'config/abi/Map.json'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import contracts from 'config/constants/contracts'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'

// Should really be using `process.env.REACT_APP_CHAIN_ID` and `utils.getRpcUrl()` here,
// and point `.env.development` to the BSC testnet, but unfortunately doing so breaks
// the whole web application since it's never been tested on the BSC testnet ... So, for now,
// hardcoding the BSC testnet configuration.
const CHAIN_ID = '97'
const RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/' 
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)

const fetchMapData = async (lx: number, ly: number, rx: number, ry: number) => {
  const web3 = new Web3(httpProvider)
  const contract = new web3.eth.Contract(MapAbi as unknown as AbiItem, contracts.map[CHAIN_ID])
  const data = await contract.methods.getCoordinatePlaces(lx, ly, rx, ry).call()
  console.log('map data', data)
  return data
}

const arrayToMatrix = (arr, size) => {
  const res = []
  for (let i = 0; i < arr.length; i += size) { 
    res.push(arr.slice(i, i + size))
  }
  return res
}

export interface GridProps {
  nx: number
  ny: number
}

const Page = styled.div`

`

const Body = styled.div`
  height: calc(100vh - 68px - 145px);
  display: flex;
  flex-direction: column;
  margin: 10px 50px 10px 150px;
  // fix background later
  background-Image: url('/images/home/starsBackground.jpg');
  background-size: cover;
`

const Grid = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(${(props: GridProps) => props.nx}, 1fr);
  grid-template-rows: repeat(${(props: GridProps) => props.ny}, 1fr);
  grid-gap: 1px;
`

const GridCell = styled.div`
  color: white;
  outline: 1px solid black;
  position: relative;
`

const GridCellContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
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
  const [mapData, setMapData] = useState({ x0: 0, y0: 0, data: Array(NY).fill(Array(NX).fill({})) })

  const [X, setX] = useState(0)
  const [Y, setY] = useState(0)

  const [XLen, setXLen] = useState(NX)
  const [YLen, setYLen] = useState(NY)

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchMapData(0, 0, NX - 1, NY - 1)
      setMapData({ x0: 0, y0: 0, data: arrayToMatrix(data, NX) })
    }
    fetch()
  }, [])

  const handleFindLocationClick = async () => {
    if (mapData.x0 === X && mapData.y0 === Y) {
      return
    }
    const data = await fetchMapData(X, Y, X + XLen - 1, Y + YLen - 1)
    setMapData({ x0: X, y0: Y, data: arrayToMatrix(data, XLen) })
  }

  const handleSetGridSizeClick = async () => {
    if (mapData.data.length === YLen && mapData.data[0].length === XLen) {
      return
    }
    const data = await fetchMapData(X, Y, X + XLen - 1, Y + YLen - 1)
    setMapData({ x0: X, y0: Y, data: arrayToMatrix(data, XLen) })
  }

  if (!mapData) {
    return null
  }

  return (
    <Page>
      <GameHeader>MAP</GameHeader>
    <Body>
      
      <GameMenu />
      <Grid nx={mapData.data[0].length} ny={mapData.data.length}>
        {mapData.data.map((arr, i) => {
          const ri = mapData.data.length - i - 1
          return mapData.data[ri].map((el, j) => {
            return (
              <GridCell>
                {el.name && (
                  <GridCellContent>
                    <Text bold glowing>
                      {el.name}
                    </Text>
                    <Text bold glowing>
                      {el.placeType}
                    </Text>
                    <Text glowing fontSize="0.6rem" style={{ flexGrow: 1 }}>
                      ...
                    </Text>
                    <Text bold glowing fontSize="0.8rem">
                      COLLECTED NOVA: 12345
                    </Text>
                  </GridCellContent>
                )}
                <GridCellId>
                  ({ri + mapData.x0} , {j + mapData.y0})
                </GridCellId>
              </GridCell>
            )
          })
        })}
      </Grid>

      <GridControls>
        <InputControl>
          <button type="button" onClick={handleFindLocationClick}>
            Find location (x, y)
          </button>
          (
          <CoordInput type="number" min="0" value={X} onChange={(e) => setX(parseFloat(e.target.value))} />
          ,
          <CoordInput type="number" min="0" value={Y} onChange={(e) => setY(parseFloat(e.target.value))} />)
        </InputControl>

        <InputControl>
          <button type="button" onClick={handleSetGridSizeClick}>
            Set grid size (x, y)
          </button>
          <CoordInput
            type="number"
            min="1"
            max="16"
            value={XLen}
            onChange={(e) => setXLen(parseFloat(e.target.value))}
          />
          x
          <CoordInput
            type="number"
            min="1"
            max="16"
            value={YLen}
            onChange={(e) => setYLen(parseFloat(e.target.value))}
          />
        </InputControl>
      </GridControls>
    </Body>
    </Page>
  )
}

export default Map
