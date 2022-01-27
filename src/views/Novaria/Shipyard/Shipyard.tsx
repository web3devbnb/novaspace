import { AbiItem } from 'web3-utils'
import React, { useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import MapAbi from 'config/abi/Map.json'
import FleetAbi from 'config/abi/Fleet.json'
import Web3 from 'web3'
import { useGetShipClasses } from 'hooks/useNovaria'
import { HttpProviderOptions } from 'web3-core-helpers'
import contracts from 'config/constants/contracts'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'


const Page = styled.div`

`

const Body = styled.div`
  margin: 10px 50px 10px 150px;
  // fix background later
  background-Image: url('/images/home/starsBackground.jpg');
  background-size: cover;
`

const ShipClassMenu = styled.div`
  color: white;
`

const TH = styled.th`
  padding: 15px;
`

const BuildMenu = styled.div`

`

const Shipyard: React.FC = (props) => {

  
  const shipClass = [useGetShipClasses('viper'), useGetShipClasses('mole')]
  

  return (
    <Page>
      <GameHeader>SHIPYARD</GameHeader>
      <GameMenu />
      
    <Body>
      <ShipClassMenu>
        <table>
          <thead>
            <tr>
              <TH>Ship</TH>
              <TH>Size</TH>
              <TH>Attack</TH>
              <TH>Shield</TH>
              <TH>Mineral Capacity</TH>
              <TH>Mining Capacity</TH>
              <TH>Hanger Space</TH>
              <TH>Build Time</TH>
              <TH>Cost</TH>
            </tr>
          </thead>
          <tbody>
            
              <tr>
                <td>{shipClass[0].name}</td>
                <td>{shipClass[0].size}</td>
                <td>{shipClass[0].attack}</td>
                <td>{shipClass[0].shield}</td>
                <td>{shipClass[0].mineralCap}</td>
                <td>{shipClass[0].miningCap}</td>
                <td>{shipClass[0].hanger}</td>
                <td>{shipClass[0].buildTime}</td>
                <td>{shipClass[0].cost}</td>
              </tr>
              <tr>
                <td>{shipClass[1].name}</td>
                <td>{shipClass[1].size}</td>
                <td>{shipClass[1].attack}</td>
                <td>{shipClass[1].shield}</td>
                <td>{shipClass[1].mineralCap}</td>
                <td>{shipClass[1].miningCap}</td>
                <td>{shipClass[1].hanger}</td>
                <td>{shipClass[1].buildTime}</td>
                <td>{shipClass[1].cost}</td>
              </tr>
            

          </tbody>
        </table>
      </ShipClassMenu>

      {/* <BuildMenu>
        <form
      </BuildMenu> */}
     
      
    </Body>
    </Page>
  )
}

export default Shipyard
