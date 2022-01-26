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



const Page = styled.div`

`

const Body = styled.div`
  // fix background later
  background-Image: url('/images/home/starsBackground.jpg');
  background-size: cover;
`

const Location: React.FC = (props) => {
  

  useEffect(() => {
    const fetch = async () => {
      // const data = await fetchMapData(0, 0, NX - 1, NY - 1)
      // setMapData({ x0: 0, y0: 0, data: arrayToMatrix(data, NX) })
    }
    fetch()
  }, [])


  return (
    <Page>
      <GameHeader>MAP</GameHeader>
    <Body>
      
      <GameMenu />
      
    </Body>
    </Page>
  )
}

export default Location
