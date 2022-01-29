import { useEffect, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
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
import {
  fetchFarmUserDataAsync,
} from 'state/actions'
import { buildShips, claimShips, insertCoinHere } from 'utils/callHelpers'
import { Wallet } from 'ethers'
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
  const useFleetContract = useFleet()
  
  const handleInsertCoinHere = useCallback(
    async (name: string) => {
      const txHash = await insertCoinHere(useFleetContract, name, account)    
      console.info(txHash)
    },
    [account, useFleetContract],
  )
  return { onClick: handleInsertCoinHere }
}

export const useBuildShips = () => {
  const { account } = useWallet()
  const useFleetContract = useFleet()
  
  const handleBuildShips = useCallback(
    async (x: string, y: string, handle: string, amount: string) => {
      const txHash = await buildShips(useFleetContract, x, y, handle, amount, account)
      
      console.info(txHash)
    },
    [account, useFleetContract]
  )
  return { onBuild: handleBuildShips }
}

export const useClaimShips = () => {
  const { account } = useWallet()
  const useFleetContract = useFleet()

  const handleClaimShips = useCallback(
    async (x: string, y: string, amount: string) => {
      const txHash = await claimShips(useFleetContract, x, y, amount, account)
      console.info(txHash)
    },
    [account, useFleetContract]
  )
  return {onClaim: handleClaimShips}
}

// View functions
// const shipClasses = useGetShipClasses()
export const useGetShipClasses = () => {
  const { slowRefresh } = useRefresh()
  const [shipClasses, setShipClasses] = useState([])

  useEffect(() => {
    async function fetchshipClasses() {
      const data = await fleetContract.methods.getShipClasses().call()
       setShipClasses(data)

    }

    fetchshipClasses()
  }, [slowRefresh])
    return shipClasses
}

// ***PROBLEM - this function call reverts, needs debugging
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

export const useGetDryDock = (x: number, y: number) => {
  const { account } = useWallet()
  const {slowRefresh} = useRefresh()
  const [dryDock, setDryDock] = useState([])

  useEffect(() => {
    async function fetchDryDock() {
    const data = await fleetContract.methods.getDryDock(x, y, account).call()
    setDryDock(data) 
  }
    fetchDryDock()
  }, [slowRefresh, x, y, account] )
  return dryDock
}

export const useGetFleet = () => {
  const { account } = useWallet()
  const {slowRefresh} = useRefresh()
  const [fleet, setFleet] = useState([])

  useEffect(() => {
    async function fetchFleet() {
      const data = await fleetContract.methods.getFleet(account).call()
      setFleet(data)
    }
      fetchFleet()
  }, [slowRefresh, account])
  return fleet
}

// Map contract functions
// Movement, mining, refining, tracks mineral

