import { useEffect, useState, useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import novaABI from 'config/abi/nova.json'
import fleetABI from 'config/abi/Fleet.json'
import mapABI from 'config/abi/Map.json'
import { getContract } from 'utils/web3'
import { getNovaAddress, getFleetAddress, getMapAddress } from 'utils/addressHelpers'
import {
  buildShips,
  claimShips,
  insertCoinHere,
  mine,
  refine,
  collect,
  travel,
  novaApprove,
  goBattle,
  enterBattle,
} from 'utils/callHelpers'
import { useFleet, useMap, useNova } from './useContract'
import useRefresh from './useRefresh'

// Contract constants
const fleetContract = getContract(fleetABI, getFleetAddress())
const mapContract = getContract(mapABI, getMapAddress())
const novaContract = getContract(novaABI, getNovaAddress())

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
  return { onCoin: handleInsertCoinHere }
}

export const useBuildShips = () => {
  const { account } = useWallet()
  const useFleetContract = useFleet()

  const handleBuildShips = useCallback(
    async (x: string, y: string, classId: string, amount: string) => {
      const txHash = await buildShips(useFleetContract, x, y, classId, amount, account)

      console.info(txHash)
    },
    [account, useFleetContract],
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
    [account, useFleetContract],
  )
  return { onClaim: handleClaimShips }
}

// mission options: ATTACK (1), DEFEND (2). target is address
export const useEnterBattle = () => {
  const { account } = useWallet()
  const useFleetContract = useFleet()

  const handleEnterBattle = useCallback(
    async (target: string, mission: number) => {
      const txHash = await enterBattle(useFleetContract, target, mission, account)
      console.info(txHash)
    },
    [account, useFleetContract],
  )
  return { onEnterBattle: handleEnterBattle }
}

// function to initiate a battle after time expires
export const useGoBattle = () => {
  const { account } = useWallet()
  const useFleetContract = useFleet()

  const handleGoBattle = useCallback(
    async (battleId: string) => {
      const txHash = await goBattle(useFleetContract, battleId, account)
      console.info(txHash)
    },
    [account, useFleetContract],
  )
  return { onClaim: handleGoBattle }
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
  const { slowRefresh } = useRefresh()
  const [spaceDock, setSpaceDock] = useState([])

  useEffect(() => {
    async function fetchSpaceDock() {
      const data = await fleetContract.methods.getPlayerSpaceDocks(account).call()
      setSpaceDock(data)
    }
    fetchSpaceDock()
  }, [slowRefresh, account])
  return spaceDock
}

export const useGetFleet = () => {
  const { account } = useWallet()
  const { slowRefresh } = useRefresh()
  const [fleet, setFleet] = useState([])

  useEffect(() => {
    async function fetchFleet() {
      const data = await fleetContract.methods.getShips(account).call()
      setFleet(data)
    }
    fetchFleet()
  }, [slowRefresh, account])
  return fleet
}

export const useGetShips = (fleet) => {
  const { slowRefresh } = useRefresh()
  const [ships, setShips] = useState([])

  useEffect(() => {
    async function fetchShips() {
      const data = await fleetContract.methods.getShips(fleet).call()
      setShips(data)
    }
    fetchShips()
  }, [slowRefresh, fleet])
  return ships
}

export const useGetFleetSize = (fleet) => {
  const { slowRefresh } = useRefresh()
  const [fleetSize, setFleetSize] = useState(null)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getFleetSize(fleet).call()
      setFleetSize(data)
    }
    fetch()
  }, [slowRefresh, fleet])
  return fleetSize
}

export const useGetMaxFleetSize = () => {
  const { account } = useWallet()
  const { slowRefresh } = useRefresh()
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
  const { slowRefresh } = useRefresh()
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
  const { slowRefresh } = useRefresh()
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

export const useGetBattlesAtLocation = (x, y) => {
  const { slowRefresh } = useRefresh()
  const [battlesAtLocation, setBattlesAtLocation] = useState([])

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getBattlesAtLocation(x, y).call()
      setBattlesAtLocation(data)
    }
    fetch()
  }, [slowRefresh, x, y])
  return battlesAtLocation
}

// returns all battles
export const useGetBattles = () => {
  const { slowRefresh } = useRefresh()
  const [battles, setBattles] = useState([])

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getBattles().call()
      setBattles(data)
    }
    fetch()
  }, [slowRefresh])
  return battles
}

export const useGetBattle = (id) => {
  const { slowRefresh } = useRefresh()
  const [battle, setBattle] = useState()

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getBattle(id).call()
      setBattle(data)
    }
    fetch()
  }, [slowRefresh, id])
  return battle
}

export const useGetAttackPower = (fleet) => {
  const { slowRefresh } = useRefresh()
  const [attackPower, setAttackPower] = useState('')

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getAttackPower(fleet).call()
      setAttackPower(data)
    }
    fetch()
  }, [slowRefresh, fleet])
  return attackPower
}

// ~~~Map contract functions~~~
// Movement, mining, refining, tracks mineral
// Active Functions

export const useMine = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleMine = useCallback(async () => {
    const txHash = await mine(useMapContract, account)
    console.info(txHash)
  }, [account, useMapContract])
  return { onClick: handleMine }
}

export const useRefine = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleRefine = useCallback(async () => {
    const txHash = await refine(useMapContract, account)
    console.info(txHash)
  }, [account, useMapContract])
  return { onClick: handleRefine }
}

export const useCollect = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleCollect = useCallback(
    async (x: number, y: number) => {
      const txHash = await collect(useMapContract, x, y, account)
      console.info(txHash)
    },
    [account, useMapContract],
  )
  return { onClick: handleCollect }
}

export const useTravel = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleTravel = useCallback(
    async (x: number, y: number) => {
      const txHash = await travel(useMapContract, x, y, account)
      console.info(txHash)
    },
    [account, useMapContract],
  )
  return { onClick: handleTravel }
}

// ***View Functions***

export const useGetFleetLocation = (fleet) => {
  const { slowRefresh } = useRefresh()
  const [fleetLocation, setFleetLocation] = useState({ X: 0, Y: 0 })

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.getFleetLocation(fleet).call()
      setFleetLocation({ X: data.x, Y: data.y })
    }
    fetch()
  }, [slowRefresh, fleet])
  return fleetLocation
}

export const useGetPlaceId = (x: string, y: string) => {
  const { slowRefresh } = useRefresh()
  const [placeId, setPlaceId] = useState(null)

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.coordinatePlaces(x, y).call()
      setPlaceId(data)
    }
    fetch()
  }, [slowRefresh, x, y])
  return placeId
}

export const useGetPlaceInfo = (x: number, y: number) => {
  const { slowRefresh } = useRefresh()
  const [placeInfo, setPlaceInfo] = useState({
    name: '',
    type: '', 
    scrap: 0,
    shipyard: false,
    refinery: false,
    mineral: 0,
  })

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.getCoordinateInfo(x, y).call()
      setPlaceInfo({
        name: data[0],
        type: data[1],
        scrap: data[2],
        shipyard: data[3],
        refinery: data[4],
        mineral: data[5],
      })
    }
    fetch()
  }, [slowRefresh, x, y])
  return placeInfo
}

export const useGetFleetsAtLocation = (x: number, y: number) => {
  const { slowRefresh } = useRefresh()
  const [fleetsAtLocation, setFleetsAtLocation] = useState([])

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.getFleetsAtLocation(x, y).call()
      setFleetsAtLocation(data)
    }
    fetch()
  }, [slowRefresh, x, y])
  return fleetsAtLocation
}

export const useGetFleetMineral = (fleet: string) => {
  const { slowRefresh } = useRefresh()
  const [fleetMineral, setFleetMineral] = useState(0) 

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getMineral(fleet).call()
      setFleetMineral(data)
    }
    fetch()
  }, [slowRefresh, fleet])
  return fleetMineral
}

export const useGetDistanceFromFleet = (fleet: string, x: string, y: string) => {
  const { slowRefresh } = useRefresh()
  const [DistanceFromFleet, setDistanceFromFleet] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.getDistanceFromFleet(fleet, x, y).call()
      setDistanceFromFleet(data)
    }
    fetch()
  }, [slowRefresh, fleet, x, y])
  return DistanceFromFleet
}

export const useGetFleetTravelCost = (fleet: string, x: string, y: string) => {
  const { slowRefresh } = useRefresh()
  const [FleetTravelCost, setFleetTravelCost] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.getFleetTravelCost(fleet, x, y).call()
      setFleetTravelCost(data)
    }
    fetch()
  }, [slowRefresh, fleet, x, y])
  return FleetTravelCost
}

// *** Nova token contract ***
// used for approvals

export const useApprove = () => {
  const { account } = useWallet()
  const useNovaContract = useNova()

  const handleApprove = useCallback(
    async (contract) => {
      const txHash = await novaApprove(useNovaContract, contract, account)
      console.info(txHash)
    },
    [account, useNovaContract],
  )
  return { onClick: handleApprove }
}

export const useGetAllowance = (contract) => {
  const { account } = useWallet()
  const { slowRefresh } = useRefresh()
  const [allowance, setAllowance] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await novaContract.methods.allowance(account, contract).call()
      setAllowance(data)
    }
    fetch()
  }, [slowRefresh, account, contract])
  return allowance
}
