import { AbiItem } from 'web3-utils'
import { times } from 'lodash'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import MapAbi from 'config/abi/Map.json'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'

const RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const CHAIN_ID = '97'

const fetchMap = async () => {
  const web3 = new Web3(httpProvider)
  const contract = new web3.eth.Contract(MapAbi as unknown as AbiItem, '0x4ccCa81e520B424F37f0FBBa3731854519862aF7')
  const data = await contract.methods.getCoordinatePlaces(0, 0, 4, 4).call()
  console.log(data)
}

const mockData: [string, string, boolean, boolean, boolean][] = [
  ['Haven', '', true, true, true],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['The Sun', 'Star', true, true, true],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
  ['', '', false, false, false],
]
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
  useEffect(() => {
    fetchMap()
  }, [])

  return (
    <Grid nx={NX} ny={NY}>
      {times(NX * NY, (i) => {
        const [handle, placeType, isDmz, isRefinery, isActive] = mockData[i]
        return <GridCell>{handle || i}</GridCell>
      })}
    </Grid>
  )
}

export default Novaria
