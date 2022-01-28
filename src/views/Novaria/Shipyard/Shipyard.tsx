import { AbiItem } from 'web3-utils'
import React, { useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import {  } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import Select from 'react-select'
import MapAbi from 'config/abi/Map.json'
import fleetABI from 'config/abi/Fleet.json'
import Web3 from 'web3'
import { useGetShipClasses, 
         useGetShipClassList, 
         useGetShipyards,
         useBuildShips } from 'hooks/useNovaria'
import { getContract, getWeb3 } from 'utils/web3'
import {
  getNovaAddress,
  getFleetAddress,
  getApprovalsAddress,
  getMapAddress
} from 'utils/addressHelpers'
import { HttpProviderOptions } from 'web3-core-helpers'
import { buildShips, insertCoinHere } from 'utils/callHelpers'
import contracts from 'config/constants/contracts'
import { useFleet, useMap, useApprovals } from 'hooks/useContract'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'

// this data needs to be replaced with getShipyards function, but currently broken
const fakeData = [{'name': 'shipyard1', 'owner':'fakeAddress', 'coordX': '0', 'coordY': '0', 'feePercent': '7'},
                  {'name': 'shipyard2', 'owner':'fakeAddress', 'coordX': '5', 'coordY': '5', 'feePercent': '1'}]

const Page = styled.div`

`

const Body = styled.div`
  margin: 10px 50px 10px 150px;
  // fix background later
  background-Image: url('/images/home/starsBackground.jpg');
  background-size: cover;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-evenly;
  min-height: 600px;
`

const ShipClassMenu = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
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

const Item = styled.div`

`

const BuildMenu = styled.div`
  margin: 10px;
`

const Text = styled.text`
  color: white;
  font-weight: medium;
  font-size: 15px;
`

const Header = styled.text`
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin: 10px;
`
const Button = styled.button`
  cursor: pointer;  
  height: 35px;
  margin: 10px;
  align-self: center;
  padding: .25rem 1.25rem;
  font-family: sans-serif;
  font-size: 1rem;
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

const Input = styled.input`
  width: 5em;
  height: 35px;
  background: transparent;
  -moz-appearance: textfield;
  color: white;
`


const Shipyard = () => {

  const shipClasses = useGetShipClasses()

   const [shipyard, setShipyard] = useState(null)
  const [shipyardX, setShipyardX] = useState(null)
  const [shipyardY, setShipyardY] = useState(null)
  const [shipyardOwner, setShipyardOwner] = useState(null)
  const [shipyardFee, setShipyardFee] = useState(null)
  const [shipHandle, setShip] = useState(null)
  const [shipAmount, setShipAmount] = useState(null)
  const [pendingTx, setPendingTx] = useState(false)
  
  const handleShipyardChange = (obj) => {
    setShipyard(obj)
    setShipyardX(obj.coordX)
    setShipyardY(obj.coordY)
    setShipyardOwner(obj.owner)
    setShipyardFee(obj.feePercent)
  }

  const handleShipChange = (obj) => {
    setShip(obj)
  }
  
  
  const { onBuild } = useBuildShips()
 
  const sendTx = async () => {
    setPendingTx(true)
    try {
      await onBuild(shipyardX, shipyardY, shipHandle, shipAmount)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }
    
  // // Work-around
  // const { account } = useWallet()
  // const fleetContract = useFleet()
  // const HandleShipBuy = async () => {
  //   buildShips(fleetContract, shipyardX, shipyardY, shipHandle, shipAmount, account)
  // }
  

  // styles for the dropdown Selector
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: 180,
      border: '2px solid gray',
      color: 'black',
      padding: 2,
      background: 'gray',

    }),
    control: (provided) => ({
      ...provided,
      width:180,
      Color: 'white',
      background: 'transparent',
      height:25,
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'white',
      padding: 20,
      background: 'transparent'
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: 'white',
      background: 'transparent'
    }),
    input: (provided, state) => ({
      ...provided,
      height:10,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: 'white',
      background: 'transparent'
    }),
  }

  return (
    <Page>
      <GameHeader>SHIPYARD</GameHeader>
      <GameMenu />
      
    <Body>
      <ShipClassMenu>
        <Header>Ship Types</Header>
        <Row>
          <Col>
            <Item>Ship</Item>
            <Item>Size</Item>
            <Item>Attack</Item>
            <Item>Shield</Item>
            <Item>Mineral Capactiy</Item>
            <Item>Mining Capacity</Item>
            <Item>Hanger Space</Item>
            <Item>Build Time</Item>
            <Item>Cost</Item>
          </Col>

          {shipClasses.map(ship => {
            
            return (
              <Col key={ship.handle}>
                <Item>{ship.name}</Item>
                <Item>{ship.size}</Item>
                <Item>{ship.attackPower}</Item>
                <Item>{ship.shield}</Item>
                <Item>{ship.mineralCapacity}</Item>
                <Item>{ship.miningCapacity}</Item>
                <Item>{ship.hangarSize}</Item>
                <Item>{ship.buildTime}</Item>
                <Item>{ship.cost}</Item> 
              </Col>
            )     
          })}

        </Row>
      </ShipClassMenu>

      <BuildMenu>
        <Header >Build Ships</Header>
        <br /><br />
        <Select 
          placeholder='Select Shipyard'
          value={shipyard}
          options={fakeData}
          onChange={handleShipyardChange}
          getOptionLabel={x => x.name}
          styles={customStyles}
          /><br />
        <Text>Location: ({shipyardX}, {shipyardY})</Text><br />
        <Text>Owner: {shipyardOwner}</Text><br />
        <Text>Build Fee: {shipyardFee}%</Text><br />

        <Row style={{marginTop:10}}>
          <Select 
            placeholder='Select Ship'
            value={shipHandle}
            options={shipClasses}
            onChange={handleShipChange}
            getOptionLabel={ship => ship.handle}
            styles={customStyles}
            />
        </Row>

        <Row style={{marginTop:10}}>
          <Input type='number' min='0' placeholder='0' value={shipAmount} onChange={(e) => setShipAmount(parseFloat(e.target.value))} />
          <Button type='button' onClick={sendTx} >
            Build Ships
          </Button>
        </Row>

      </BuildMenu>
     
      
    </Body>
    </Page>
  )
}

export default Shipyard
