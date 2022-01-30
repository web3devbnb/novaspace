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

// ~~~Fleet contract functions~~~
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
    async (x: string, y: string, classId: string, amount: string) => {
      const txHash = await buildShips(useFleetContract, x, y, classId, amount, account)
      
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
    async (dockId: string, amount: string) => {
      const txHash = await claimShips(useFleetContract, dockId, amount, account)
      console.info(txHash)
    },
    [account, useFleetContract]
  )
  return {onClaim: handleClaimShips}
}

// ***View functions***

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


export const useGetShipyards = () => {
  const { slowRefresh } = useRefresh()
  const [shipyards, setShipyards] = useState([])

  useEffect(() => {
    async function fetchShipyards() {
      const data = await fleetContract.methods.getShipyards().call()
      setShipyards(data)
    }
    fetchShipyards()
  }, [slowRefresh])
  return shipyards
}

export const useGetSpaceDock = () => {
  const { account } = useWallet()
  const {slowRefresh} = useRefresh()
  const [spaceDock, setSpaceDock] = useState([])

  useEffect(() => {
    async function fetchSpaceDock() {
    const data = await fleetContract.methods.getPlayerSpaceDocks(account).call()
    setSpaceDock(data) 
  }
    fetchSpaceDock()
  }, [slowRefresh, account] )
  return spaceDock
}

export const useGetFleet = () => {
  const { account } = useWallet()
  const {slowRefresh} = useRefresh()
  const [fleet, setFleet] = useState([])

  useEffect(() => {
    async function fetchFleet() {
      const data = await fleetContract.methods.getFleets(account).call()
      setFleet(data)
    }
      fetchFleet()
  }, [slowRefresh, account])
  return fleet
}

export const useGetFleetSize = () => {
  const { account } = useWallet()
  const {slowRefresh} = useRefresh()
  const [fleetSize, setFleetSize] = useState(null)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getFleetSize(account).call()
      setFleetSize(data)
    }
      fetch()
  }, [slowRefresh, account])
  return fleetSize
}

export const useGetMaxFleetSize = () => {
  const { account } = useWallet()
  const {slowRefresh} = useRefresh()
  const [maxFleetSize, setMAxFleetSize] = useState(null)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getMaxFleetSize(account).call()
      setMAxFleetSize(data)
    }
      fetch()
  }, [slowRefresh, account])
  return maxFleetSize
}

export const useGetMaxMineralCapacity = () => {
  const { account } = useWallet()
  const {slowRefresh} = useRefresh()
  const [maxMineralCapacity, setMaxMineralCapacity] = useState('')

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getMaxMineralCapacity(account).call()
      setMaxMineralCapacity(data)
    }
      fetch()
  }, [slowRefresh, account])
  return maxMineralCapacity
}

export const useGetMiningCapacity = () => {
  const { account } = useWallet()
  const {slowRefresh} = useRefresh()
  const [miningCapacity, setMiningCapacity] = useState('')

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getMiningCapacity(account).call()
      setMiningCapacity(data)
    }
      fetch()
  }, [slowRefresh, account])
  return miningCapacity
}

// ~~~Map contract functions~~~
// Active Functions


// ***View Functions***

export const useGetFleetLocation = () => {
  const { account } = useWallet()
  const {slowRefresh} = useRefresh()
  const [fleetLocation, setFleetLocation] = useState([])

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.getFleetLocation(account).call()
      setFleetLocation(data)
    } fetch()
  }, [slowRefresh, account])
  return fleetLocation
}

// Movement, mining, refining, tracks mineral

