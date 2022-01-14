import { AbiItem } from 'web3-utils'
import { times } from 'lodash'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MapAbi from 'config/abi/Map.json'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'

const RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const CHAIN_ID = '97'

const fetchMapData = async (lx: number, ly: number, rx: number, ry: number) => {
  const web3 = new Web3(httpProvider)
  const contract = new web3.eth.Contract(MapAbi as unknown as AbiItem, '0x4ccCa81e520B424F37f0FBBa3731854519862aF7')
  const data = await contract.methods.getCoordinatePlaces(lx, ly, rx, ry).call()
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
`

const GridCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

const NX = 5
const NY = 5

const Novaria = (props) => {
  const [mapData, setMapData] = useState(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      const data = await fetchMapData(0, 0, NX, NY)
      setMapData(data)
    })()
  }, [])

  return (
    <Grid nx={NX} ny={NY}>
      {times(NX * NY, (i) => {
        return <GridCell>{(mapData && mapData[i].name) || i}</GridCell>
      })}
    </Grid>
  )
}

export default Novaria
