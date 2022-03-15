import React, {useState, useContext} from "react";
import styled from "styled-components";
import Select from 'react-select'
import {
    useGetShipClasses,
    useGetShipyards,
    useGetSpaceDock,
    useBuildShips,
    useGetShips,
    useClaimShips,
    useGetFleetSize,
    useGetMaxFleetSize,
    useGetMaxMineralCapacity,
    useGetMiningCapacity,
    useGetFleetLocation,
    useGetFleetMineral,
    useGetCostMod,
    useGetTimeModifier,
    useGetPlayer,
    useSetShipyardName,
    useSetShipyardFee,
    useGetAttackPower,
    useGetCurrentTravelCooldown,
    useGetCurrentMiningCooldown,
    useGetPlayerBattle,
    useGetPlayerBattleStatus,
  } from 'hooks/useNovaria'
  import { ConnectedAccountContext } from 'App'


  const BuildMenu = styled.div`
  margin: 10px;
  display: block;
  border: 1px solid #8c8c8c;
  padding: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 30%;
  height: auto;
  min-width: 240px;
  // min-height: 312px;
  background-color: #00000080;
  @media (max-width: 715px) {
    width: 100%;
  }
`

const Text = styled.text`
  font-weight: light;
  font-size: 15px;
`
const BuildStatsText = styled(Text)`
  font-size: 0.65rem;
`

const Button = styled.button`
  cursor: pointer;
  height: 35px;
  margin: 10px;
  align-self: center;
  padding: 0.25rem 1.25rem;
  font-family: sans-serif;
  font-size: 1rem;
  text-decoration: none;
  color: #5affff;
  border: 2px solid #5affff;
  border-radius: 0px;
  background-color: transparent;

  &:disabled {
    color: gray;
    border-color: gray;
    cursor: not-allowed;
  }
`

const InputIcon = styled.span`
  display: flex;
  align-items: center;
  height: 35px;
  background: transparent;
  border: 1px solid #5affff;
  font-size: 0.9rem;
  padding: 0.15rem;
`

const Input = styled.input`
  width: 4em;
  padding: 2px;
  height: 35px;
  background: transparent;
  border: 1px solid #5affff;
  color: #5affff;
  text-align: right;
`


const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  align-items: center;
  width: 100%;
`

const Header = styled.text`
  font-weight: bold;
  font-size: 20px;
  margin: 10px;
  margin-left: 0;
`

const accountEllipsis = (account) => `${account.substring(0, 4)}...${account.substring(account.length - 4)}`

const BuildShipsMenu = () => {
    const account = useContext(ConnectedAccountContext)
    const shipClasses = useGetShipClasses()
    const spaceDocks = useGetSpaceDock()
    const shipyards = useGetShipyards()
    const player = useGetPlayer(account.toString()) 
    const playerEXP = Number(player.experience)
  
    const [shipyardName, setShipyardName] = useState(null)
    const [shipyardX, setShipyardX] = useState(null)
    const [shipyardY, setShipyardY] = useState(null)
    const [shipyardOwner, setShipyardOwner] = useState(null)
    const [shipyardFee, setShipyardFee] = useState(null)
    const [shipId, setShipId] = useState(null)
    const [buildTime, setBuildTime] = useState(0)
    const [shipCost, setShipCost] = useState(0)
    const [shipAmount, setShipAmount] = useState(0)
    const [pending, setPendingTx] = useState(false)
    const [shipEXP, setShipEXP] = useState(0)

    const handleShipyardChange = (option) => {
      const selectedShipyardId = option.value
      const selectedShipyard = shipyards[selectedShipyardId]
  
      setShipyardName(selectedShipyard.name)
      setShipyardX(selectedShipyard.coordX)
      setShipyardY(selectedShipyard.coordY)
      setShipyardOwner(selectedShipyard.owner)
      setShipyardFee(selectedShipyard.feePercent)
    }
  
    const handleShipChange = (option) => {
      const selectedShipId = option.value
      const selectedShip = shipClasses[selectedShipId]
  
      setShipId(selectedShipId)
      setBuildTime(selectedShip.size * 300)
      setShipCost(selectedShip.cost)
      setShipEXP(Number(selectedShip.experienceRequired))
    }
    const costMod = useGetCostMod()
    const buildCost = (shipCost * shipAmount + (shipyardFee / 100) * shipCost * shipAmount) / costMod
    const { onBuild } = useBuildShips()
  
    const timeMod = useGetTimeModifier()
  
    const handleBuild = async () => {
      setPendingTx(true)
      try {
        await onBuild(shipyardX, shipyardY, shipId, shipAmount, buildCost.toString())
        console.log(shipyardX, shipyardY, shipId, shipAmount, buildCost.toString())
      } catch (error) {
        console.log('error: ', error)
      } finally {
        setPendingTx(false)
      }
    }
    
    // make sure player can't build more than 1 dock at the same location
    let dockInUse = false
    for(let i=0; i< spaceDocks.length; i++) {
        const sDock = spaceDocks[i];
        if(sDock.coordX === shipyardX && sDock.coordY === shipyardY) {
        dockInUse = true;
        }
    }
    

    // styles for the dropdown Selector
    const customStyles = {
        container: (provided) => ({
        ...provided,
        margin: '10px 0',
        }),
        menu: (provided) => ({
        ...provided,
        border: '2px solid #289794',
        borderRadius: '0px',
        color: 'black',
        padding: 2,
        background: 'black',
        }),
        control: (provided) => ({
        ...provided,
        color: '#289794',
        border: '1px solid #289794',
        borderRadius: '0px',
        background: 'transparent',
        }),
        option: (provided) => ({
        ...provided,
        color: '#289794',
        background: 'transparent',
        }),
        placeholder: (provided) => ({
        ...provided,
        color: '#289794',
        background: 'transparent',
        }),
        input: (provided) => ({
        ...provided,
        }),
        dropdownIndicator: (provided) => ({
        ...provided,
        color: '#289794',
        }),
        valueContainer: (provided) => ({
        ...provided,
        color: '#289794',
        }),
        singleValue: (provided) => ({
        ...provided,
        color: '#289794',
        }),
    }

    const buildStats = [
        { label: 'LOCATION', value: shipyardName ? `${shipyardName} (${shipyardX}, ${shipyardY})` : '-' },
        { label: 'OWNER', value: shipyardOwner ? accountEllipsis(shipyardOwner) : '-' },
        { label: 'BUILD FEE', value: shipyardFee ? `${shipyardFee}%` : '-' },
    ]

    return (
        <BuildMenu>
            <Header>BUILD SHIPS</Header>

            <Select
                placeholder="Select Shipyard"
                options={shipyards.map((s, i) => ({ value: i, label: s.name }))}
                onChange={handleShipyardChange}
                styles={customStyles}
            />

            <Select
                placeholder="Select Ship"
                options={shipClasses.map((c, i) => ({ value: i, label: c.name }))}
                onChange={handleShipChange}
                styles={customStyles}
            />

            {playerEXP < shipEXP && '*requires more EXP'}

            <Row style={{ marginTop: 10, justifyContent: 'space-between' }}>
                <InputIcon>QTY</InputIcon>
                <Input
                style={{ flexGrow: 2 }}
                type="number"
                min="0"
                placeholder="0"
                value={shipAmount}
                onChange={(e) => setShipAmount(parseFloat(e.target.value))}
                />
                <Button
                onClick={handleBuild}
                disabled={shipId === null || playerEXP < shipEXP || pending || dockInUse}
                >
                {pending  ? 'pending...' : 'BUILD'}
                </Button>
            </Row>

            <Row style={{ justifyContent: 'space-between', color: 'white', fontSize: 12 }}>
                <Text>
                COST: {(buildCost / 10 ** 18).toFixed(2) || 0}
                <span style={{ fontSize: 10 }}> NOVA</span>
                </Text>
                <Text>TIME: {(shipAmount * buildTime) / timeMod / 60 || 0}m</Text>
            </Row>
            <div style={{ color: '#289794', marginTop: '10px' }}>
                {buildStats.map((buildStat) => (
                <Row style={{ justifyContent: 'space-between' }}>
                    <BuildStatsText>{buildStat.label}</BuildStatsText>
                    <BuildStatsText>{buildStat.value}</BuildStatsText>
                </Row>
                ))}
            </div>
        </BuildMenu>
    )
}
export default BuildShipsMenu