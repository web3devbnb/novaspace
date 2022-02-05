import { AbiItem } from 'web3-utils'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import MapAbi from 'config/abi/Map.json'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { useGetPlaceId, useGetPlaceInfo, } from 'hooks/useNovaria'
import contracts from 'config/constants/contracts'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'



const Page = styled.div`
  background-Image: url('/images/novaria/mapBG.jpg');
  background-size: cover;
  font-size: 15px;
  margin-top: -105px;
  color: #5affff;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: -75px;
  }
`

const Body = styled.div`
  margin: 10px 50px 10px 150px;
  // fix background later
  background-Image: url('/images/home/starsBackground.jpg');
  background-size: cover;
  height: 500px;
  display: flex;

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
  justify-content: left;
  padding: 10px;
  color: white;
  gap: 5px;
`

const PlaceMenu = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
`

const Header = styled.text`
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin: 10px;
`

const Item = styled.div`
  margin: 2px;
  margin-left: 8px;
`

const Col = styled.div`
  flex-direction: column;
  margin: 10px;
  display: flex;
`

const Row = styled.div`
  flex-direction: row;
  flex-wrap: no-wrap;
  display: flex;
  align-items: center;
  
`

const Button = styled.button`
  cursor: pointer;  
  height: 25px;
  margin: 5px;
  align-self: center;
  padding: .15rem 1.25rem;
  font-family: sans-serif;
  font-size: .75rem;
  text-decoration: none;
  text-shadow:
  -2px 4px 4px #091243, 
  0 0 10px #00D0FF,
  inset 1px 1px 1px white;
  color: #1FFFFF;
  border: 2px solid;
  border-radius: 5px;
  background-color: transparent;
  box-shadow: 
  0 1px 2px rgba(0,0,0, 0.6), 
  2px 1px 4px rgba(0,0,0, 0.3), 
  2px 4px 3px rgba(3,0,128, 0.3), 
  0 0 7px 2px rgba(0,208,255, 0.6), 
  inset 0 1px 2px rgba(0,0,0, 0.6), 
  inset 2px 1px 4px rgba(0,0,0, 0.3), 
  inset 2px 4px 3px rgba(3,0,128, 0.3), 
  inset 0 0 7px 2px rgba(0,208,255, 0.6);
`

const PlayerMenu = styled.div`
  margin: 10px;
  border: 1px solid gray;
`

const Location= () => {
  
  // load coordinates from the Map 
  const location = useLocation()
  const loadedCoords = (typeof location.state === 'undefined' ? {x: 0,y: 0} : location.state[0])
  console.log('loadedCoords', loadedCoords)

  const [X, setX] = useState(loadedCoords.x)
  const [Y, setY] = useState(loadedCoords.y)

  const placeInfo = useGetPlaceInfo(X,Y)
  console.log(placeInfo)
  console.log('x, y?', X, Y)

  


  return (
    <Page>
      <GameHeader>Location</GameHeader>
    <Body>
      
      <GameMenu />

        <PlaceMenu>
                    
            <Header style={{fontSize:35}}>
              {placeInfo.name === '' ? 'Empty Space' : placeInfo.name} <span style={{fontSize:12, fontWeight:'normal'}}>({placeInfo.type})</span> 
            </Header>
          
            <InputControl>
              (
              <CoordInput type="number" min="0" value={X} onChange={(e) => setX(parseFloat(e.target.value))} />
              ,
              <CoordInput type="number" min="0" value={Y} onChange={(e) => setY(parseFloat(e.target.value))} />)
            </InputControl>
            
            <Item>
              {(placeInfo.shipyard === true ? 
                <Button><a href='/shipyard' >Shipyard</a></Button> : '')}
            </Item>
            <Item>
              {(placeInfo.refinery === true ? 
                <Button>Refine</Button> : '')}
            </Item>
            <Item>
              {(placeInfo.mineral > 0 ? 
                <Button>Mine Mineral ({placeInfo.mineral})</Button> : '')}
            </Item>
            <Item>
              {(placeInfo.scrap > 0 ? 
                <Button>Collect Scrap ({placeInfo.scrap})</Button> : '')}
            </Item>

        </PlaceMenu>

        <PlayerMenu>
          <Header>
            Players at Location
          </Header>
          
        </PlayerMenu>
            

    </Body>
    </Page>
  )
}

export default Location
