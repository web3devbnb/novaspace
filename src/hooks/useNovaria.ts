import { useEffect, useState, useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import novaABI from 'config/abi/nova.json'
import fleetABI from 'config/abi/Fleet.json'
import mapABI from 'config/abi/Map.json'
import treasuryABI from 'config/abi/Treasury.json'
import { getContract, getWeb3 } from 'utils/web3'
import { getNovaAddress, getFleetAddress, getMapAddress, getTreasuryAddress } from 'utils/addressHelpers'
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
  explore,
  recall,
} from 'utils/callHelpers'
import { useFleet, useMap, useNova } from './useContract'
import useRefresh from './useRefresh'

// Contract constants
const fleetContract = getContract(fleetABI, getFleetAddress())
const mapContract = getContract(mapABI, getMapAddress())
const novaContract = getContract(novaABI, getNovaAddress())
const treasuryContract = getContract(treasuryABI, getTreasuryAddress())

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
    async (x: string, y: string, classId: string, amount: number, buildCost: string) => {
      const txHash = await buildShips(useFleetContract, x, y, classId, amount, buildCost, account)

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

export const useGetBuildTime = (shipId: number, amount: number) => {
  const { fastRefresh } = useRefresh()
  const [BuildTime, setBuildTime] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getBuildTime(shipId, amount).call()
      setBuildTime(data)
    }
    fetch()
  }, [fastRefresh, shipId, amount])
  return BuildTime
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

export const useGetShips = (fleet: string) => {
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

export const useGetFleetSize = (fleet: string) => {
  const { slowRefresh } = useRefresh()
  const [fleetSize, setFleetSize] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getFleetSize(fleet).call()
      setFleetSize(data)
    }
    fetch()
  }, [slowRefresh, fleet])
  return fleetSize
}

export const useGetMaxFleetSize = (fleet: string) => {
  const { slowRefresh } = useRefresh()
  const [maxFleetSize, setMAxFleetSize] = useState(null)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getMaxFleetSize(fleet).call()
      setMAxFleetSize(data)
    }
    fetch()
  }, [slowRefresh, fleet])
  return maxFleetSize
}

export const useGetFleetMineral = (fleet: string) => {
  const { slowRefresh } = useRefresh()
  const [fleetMineral, setFleetMineral] = useState('')

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getMineral(fleet).call()
      setFleetMineral(data)
    }
    fetch()
  }, [slowRefresh, fleet])
  return fleetMineral
}

export const useGetMaxMineralCapacity = (fleet: string) => {
  const { slowRefresh } = useRefresh()
  const [maxMineralCapacity, setMaxMineralCapacity] = useState('')

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getMineralCapacity(fleet).call()
      setMaxMineralCapacity(data)
    }
    fetch()
  }, [slowRefresh, fleet])
  return maxMineralCapacity
}

export const useGetMiningCapacity = (fleet: string) => {
  const { slowRefresh } = useRefresh()
  const [miningCapacity, setMiningCapacity] = useState('')

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getMiningCapacity(fleet).call()
      setMiningCapacity(data)
    }
    fetch()
  }, [slowRefresh, fleet])
  return miningCapacity
}

// returns list of battle IDs at a location
export const useGetBattlesAtLocation = (x: number, y: number) => {
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

// returns battle info
export const useGetBattle = (Id: number) => {
  const { slowRefresh } = useRefresh()
  const [battle, setBattle] = useState({attackTeam: [], defendTeam: [], deadline: 0, coordX: 0, coordY: 0})

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.battles(Id).call()
      setBattle({
        attackTeam: data[3],
        defendTeam: data[4],
        deadline: data[0],
        coordX: data[1],
        coordY: data[2]
      })
    }
    fetch()
  }, [slowRefresh, Id])
  return battle
}

// returns battle info of player 
export const useGetPlayerBattle = (player) => {
  const { slowRefresh } = useRefresh()
  const [PlayerBattle, setPlayerBattle] = useState({battleStatus: 0, battleId:null})

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getPlayerBattleInfo(player).call()
      setPlayerBattle({
        battleStatus: data[0],
        battleId:data[1]
      })
    }
    fetch()
  }, [slowRefresh, player])
  return PlayerBattle
}

export const useGetPlayerBattleStatus = (player) => {
  const { slowRefresh } = useRefresh()
  const [PlayerBattleStatus, setPlayerBattleStatus] = useState(false)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.isInBattle(player).call()
      setPlayerBattleStatus(data)
    }
    fetch()
  }, [slowRefresh, player])
  return PlayerBattleStatus
}

export const useGetAttackPower = (fleet) => {
  const { slowRefresh } = useRefresh()
  const [attackPower, setAttackPower] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getAttackPower(fleet).call()
      setAttackPower(data)
    }
    fetch()
  }, [slowRefresh, fleet])
  return attackPower
} 

export const useGetNameByAddress = (player) => {
  const { slowRefresh } = useRefresh()
  const [name, setName] = useState('')

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods._addressToPlayer(player).call()
      setName(data)
    }
    fetch()
  }, [slowRefresh, player])
  return name
}

export const useGetPlayerExists = (player) => {
  const { fastRefresh } = useRefresh()
  const [PlayerExists, setPlayerExists] = useState(false)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods._playerExists(player).call()
      setPlayerExists(data)
    }
    fetch()
  }, [fastRefresh, player])
  return PlayerExists
}

export const useGetDockCost = (shipClassId: number, amount: number) => {
  const { fastRefresh } = useRefresh()
  const [DockCost, setDockCost] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods._playerExists(shipClassId, amount).call()
      setDockCost(data)
    }
    fetch()
  }, [fastRefresh, shipClassId, amount])
  return DockCost
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
  return { onMine: handleMine }
}

export const useRefine = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleRefine = useCallback(async () => {
    const txHash = await refine(useMapContract, account)
    console.info(txHash)
  }, [account, useMapContract])
  return { onRefine: handleRefine }
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
  return { onCollect: handleCollect }
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
  return { onTravel: handleTravel }
}

export const useExplore = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleExplore = useCallback(
    async (x: number, y: number) => {
      const txHash = await explore(useMapContract, x, y, account)
      console.info(txHash)
    },
    [account, useMapContract],
  )
  return { onExplore: handleExplore }
}

export const useRecall = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleRecall = useCallback(
    async () => {
      const txHash = await recall(useMapContract, account)
      console.info(txHash)
    },
    [account, useMapContract],
  )
  return { onRecall: handleRecall }
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

export const useGetPlaceId = (x: number, y: number) => {
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
  const { fastRefresh } = useRefresh()
  const [placeInfo, setPlaceInfo] = useState({
    name: '',
    type: '',
    scrap: 0,
    shipyard: false,
    refinery: false,
    mineral: 0,
    fleetCount: 0,
    mining: false,
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
        fleetCount: data[6],
        mining: data[7],
      })
    }
    fetch()
  }, [fastRefresh, x, y])
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

export const useGetDistanceFromFleet = (fleet: string, x: number, y: number) => {
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

export const useGetFleetTravelCost = (fleet: string, x: number, y: number) => {
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

export const useGetTravelCooldown = (fleet: string, x: number, y: number) => {
  const { slowRefresh } = useRefresh()
  const [TravelCooldown, setTravelCooldown] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.getFleetTravelCooldown(fleet, x, y).call()
      setTravelCooldown(data)
    }
    fetch()
  }, [slowRefresh, fleet, x, y])
  return TravelCooldown
}

export const useGetCurrentCooldown = (fleet: string) => {
  const { slowRefresh } = useRefresh()
  const [CurrentCooldown, setCurrentCooldown] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.getCurrentTravelCooldown(fleet).call()
      setCurrentCooldown(data)
    }
    fetch()
  }, [slowRefresh, fleet])
  return CurrentCooldown
}

export const useGetTimeModifier = () => {
  const { slowRefresh } = useRefresh()
  const [TimeModifier, setTimeModifier] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.getTimeModifier().call()
      setTimeModifier(data)
    }
    fetch()
  }, [slowRefresh])
  return TimeModifier
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
  const { fastRefresh } = useRefresh()
  const [allowance, setAllowance] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await novaContract.methods.allowance(account, contract).call()
      setAllowance(data)
    }
    fetch()
  }, [fastRefresh, account, contract])
  return allowance
}


// *** Treasury Contract ***


export const useGetCostMod = () => {
  const { slowRefresh } = useRefresh()
  const [CostMod, setCostMod] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await treasuryContract.methods.getCostMod().call()
      setCostMod(data)
    }
    fetch()
  }, [slowRefresh])
  return CostMod
}