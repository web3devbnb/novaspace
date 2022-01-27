import { useEffect, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import Web3 from 'web3'
import novaABI from 'config/abi/nova.json'
import treasuryABI from 'config/abi/Treasury.json'
import fleetABI from 'config/abi/Fleet.json'
import mapABI from 'config/abi/Map.json'
import approvalsABI from 'config/abi/Approvals.json'
import erc20ABI from 'config/abi/erc20.json'
import { getContract, getWeb3 } from 'utils/web3'
import { getTokenBalance } from 'utils/erc20'
import {
  getNovaAddress,
  getFleetAddress,
  getApprovalsAddress,
  getMapAddress
} from 'utils/addressHelpers'
import { insertCoinHere } from 'utils/callHelpers'
import { useFleet, useMap, useApprovals } from './useContract'
import useRefresh from './useRefresh'

// Contract constants
  const fleetContract = getContract(fleetABI, getFleetAddress())
  const mapContract = getContract(mapABI, getMapAddress())
  const approvalsContract = getContract(approvalsABI, getApprovalsAddress())
  const web3 = getWeb3()

// Fleet contract functions
// player setup and current ships, building ships, combat 

// Active functions

export const useInsertCoinHere = () => {
  
  const { account } = useWallet()

  const handleInsertCoinHere = useCallback(
    async (name: string) => {
      const txHash = await insertCoinHere(fleetContract, name, account)    
      console.info(txHash)
    },
    [account],
  )
  return { onClick: handleInsertCoinHere }
}

// View functions

export const useGetShipClasses = (handle: string) => {
  const { slowRefresh } = useRefresh()
  const [shipClasses, setShipClasses] = useState({
    name:'', size:'', attack:'', shield:'', mineralCap:'', miningCap:'', hanger:'', buildTime:'', cost:''
  })

  useEffect(() => {
    async function fetchshipClasses() {
      const data = await fleetContract.methods.getShipClass(handle).call()
      setShipClasses({
        name: data[0], 
        size: data[2],
        attack: data[3],
        shield: data[4],
        mineralCap: web3.utils.fromWei(data[5]),
        miningCap: web3.utils.fromWei(data[6]),
        hanger: data[7],
        buildTime: data[8],
        cost: web3.utils.fromWei(data[9])
        })
    }

    fetchshipClasses()
  }, [handle, slowRefresh])

  return shipClasses
}

export const useGetShipyards = () => {
  const { slowRefresh } = useRefresh()
  const [shipyards, setShipyards] = useState('')

  useEffect(() => {
    async function fetchShipyards() {
      const data = await fleetContract.methods.getShipyards().call()
      setShipyards(data)
    }
    fetchShipyards()
  }, [slowRefresh])
  return shipyards
}

// Map contract functions
// Movement, mining, refining, tracks mineral

