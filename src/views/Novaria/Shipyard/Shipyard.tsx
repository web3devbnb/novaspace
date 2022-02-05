import { AbiItem } from 'web3-utils'
import React, { useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import {  } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import Select from 'react-select'
import { findIndex } from 'lodash'
import MapAbi from 'config/abi/Map.json'
import fleetABI from 'config/abi/Fleet.json'
import Web3 from 'web3'
import { useGetShipClasses,  
         useGetShipyards,
         useGetSpaceDock,
         useBuildShips,
         useGetFleet,
         useClaimShips,
         useGetFleetSize,
         useGetMaxFleetSize,
         useGetMaxMineralCapacity,
         useGetMiningCapacity,
           } from 'hooks/useNovaria'
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

// export interface ShipClassProps {
//   name: string
//   size: number
//   attack: number
//   shield: number 
//   mineralCapacity: number
//   miningCapacity: number
//   hangerSize: number
//   buildTime: number
//   cost: number
// }

const Page = styled.div`
  background-Image: url('/images/novaria/mapBG.jpg');
  background-size: cover;
  font-size: 15px;
  margin-top: -105px;
  padding: 10px;
  color: #5affff;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: -75px;
  }
`

const Body = styled.div`
  margin: 10px 50px 10px 150px;
  // fix background later
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-evenly;
  min-height: 600px;
  background-Image: url('/images/novaria/border.png');
  background-size: cover;
  background-repeat: no-repeat;
  aspect-ratio: 16/8;
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

const SpaceDockMenu = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`

const FleetMenu = styled.div`
  display: flex;  
  flex-direction: column;
  color: white;
  border-left: 1px solid gray;
  height: 100%;
`


const Shipyard = () => {

  const { account } = useWallet()
  const web3 = getWeb3()
  const shipClasses = useGetShipClasses()
  const spaceDocks =  useGetSpaceDock() 
  console.log('spaceDocks', spaceDocks)
  const shipyards = useGetShipyards()
  const playerFleet = useGetFleet()
  const fleetSize = useGetFleetSize(account)
  const maxFleetSize = useGetMaxFleetSize()
  const mineralCapacity = useGetMaxMineralCapacity()
  const miningCapacity = useGetMiningCapacity()

  const [shipyard, setShipyard] = useState(null)
  const [shipyardX, setShipyardX] = useState(null)
  const [shipyardY, setShipyardY] = useState(null)
  const [shipyardOwner, setShipyardOwner] = useState(null) 
  const [shipyardFee, setShipyardFee] = useState(null)
  const [shipId, setShipId] = useState(null)
  const [buildTime, setBuildTime] = useState(null)
  const [shipCost, setShipCost] = useState(null)
  const [shipAmount, setShipAmount] = useState(null)
  const [pendingTx, setPendingTx] = useState(false)
  const [claimAmount, setClaimAmount] = useState(null)
  // const [claimId, setClaimId] = useState(null)
  
  const handleShipyardChange = (obj) => {
    setShipyard(shipyards.indexOf(obj))
    setShipyardX(obj.coordX)
    setShipyardY(obj.coordY)
    setShipyardOwner(obj.owner)
    setShipyardFee(obj.feePercent)
  }

  const handleShipChange = (obj) => {
    setShipId(shipClasses.indexOf(obj))
    setBuildTime(obj.buildTime)
    setShipCost(obj.cost)
  }
  
  const { onBuild } = useBuildShips()
 
  const sendTx = async () => {
    setPendingTx(true)
    try {
      await onBuild(shipyardX, shipyardY, shipId, shipAmount)
      console.log(shipyardX, shipyardY, shipId, shipAmount)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }
    
  const { onClaim } = useClaimShips()

  const sendClaimTx = async (claimId) => {
    setPendingTx(true)
    console.log('claimId, claimAmount',typeof claimId, claimId, typeof claimAmount, claimAmount)
    try {
      await onClaim(claimId, claimAmount)      
    } catch (error) {
      // console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

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
      // height:25,
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'white',
     // padding: 20,
      background: 'transparent'
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: 'white',
      background: 'transparent'
    }),
    // input: (provided, state) => ({
    //   ...provided,
    //   height:10,
    // }),
    singleValue: (provided, state) => ({
      ...provided,
      color: 'white',
     // background: 'transparent'
    }),
  }

  return (
    <Page>
      <GameHeader>SHIPYARD</GameHeader>
      <GameMenu />
      
    <Body>
      <Col>
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
                <Col key={ship.name}>
                  <Item>{ship.name}</Item>
                  <Item>{ship.size}</Item>
                  <Item>{ship.attackPower}</Item>
                  <Item>{ship.shield}</Item>
                  <Item>{web3.utils.fromWei(ship.mineralCapacity)}</Item>
                  <Item>{web3.utils.fromWei(ship.miningCapacity)}</Item>
                  <Item>{ship.hangarSize}</Item>
                  <Item>{ship.buildTime}</Item>
                  <Item>{web3.utils.fromWei(ship.cost)}</Item> 
                </Col>
              )     
            })}

          </Row>
        </ShipClassMenu>
        <Row>
          
      <BuildMenu>
        <Header >Build Ships</Header>
        <br /><br />
        <Select 
          placeholder='Select Shipyard'
          value={shipyard}
          options={shipyards}
          onChange={handleShipyardChange}
          getOptionLabel={x => x.name}
          styles={customStyles}
          /><br />
        <Text>Location: ({shipyardX}, {shipyardY})</Text><br />
        <Text>Owner: {shipyardOwner}</Text><br />
        <Text>Build Fee: {shipyardFee}%</Text><br />

        <Row style={{marginTop:10}}>
          {/* // Selector doesn't show selected option, but does input state values for it */}
          <Select 
            placeholder='Select Ship'
            value={shipId}
            options={shipClasses}
            onChange={handleShipChange}
            getOptionLabel={ship => ship.name}
            styles={customStyles}
            />
        </Row>

        <Row style={{marginTop:10}}>
          <Input type='number' min='0' placeholder='0' value={shipAmount} onChange={(e) => setShipAmount(parseFloat(e.target.value))} />
          <Button type='button' onClick={sendTx} >
            Build Ships
          </Button>
        </Row>
        <Row>
          <Text>Cost: {(shipCost * shipAmount + ((shipyardFee / 100) * shipCost * shipAmount )) / 10**18} NOVA | Time: {buildTime * shipAmount}s</Text>
        </Row>

      </BuildMenu>

      <SpaceDockMenu>
        <Header>Build Queue</Header>
        <Row>
          <Col>
            <Item>Ship</Item>
            <Item>Location</Item>
            <Item>Amount</Item>
            <Item>Completion Time</Item>
            <Item>
              Claim Amount: <Input type='number' min='0' placeholder='0' value={claimAmount} onChange={(e) => setClaimAmount(parseFloat(e.target.value))} />
            
            </Item>
          </Col>
          
          {spaceDocks.map(dock => {
            return (
            <Col key={dock.shipClassId}>
              <Item>{shipClasses[dock.shipClassId].name}</Item>
              <Item>({dock.coordX}, {dock.coordY})</Item>
              <Item>{dock.amount}</Item>
              <Item>{new Date(dock.completionTime * 1000).toLocaleString()}</Item>
              <Button type='button' onClick={() => sendClaimTx(spaceDocks.indexOf(dock))
                }>
                Claim
              </Button>
            </Col>
            )
          })}
        </Row>

      </SpaceDockMenu>
        </Row>

      </Col>

      <Col>
        <FleetMenu>
          <Header>Current Fleet</Header>
          <Row>
            <Col>
            {shipClasses.map(ship => {
              return (
                <Item key={ship.name}>{ship.name}s</Item>
              )})}
                <Item>Fleet Size</Item>
                <Item>Max Fleet Size</Item>
                <Item>Mining Capacity</Item>
                <Item>Max Mineral Capacity</Item>
            </Col>
            <Col>
                {/* Find a way to map this out based on shipclass? */}
                <Item>{playerFleet[0]}</Item>
                <Item>{playerFleet[1]}</Item>
                <Item>{fleetSize}</Item>
                <Item>{maxFleetSize}</Item>
                <Item>{web3.utils.fromWei(miningCapacity)} </Item>
                <Item>{web3.utils.fromWei(mineralCapacity)} </Item>
            </Col>
          </Row>

        </FleetMenu>
      </Col>
     
      
    </Body>
    </Page>
  )
}

export default Shipyard
