import React, { useState, useContext } from 'react'
import {} from '@pancakeswap-libs/uikit'
import styled from 'styled-components/macro'
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
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'
import moleCard from '../assets/moleCard.png'
import viperCard from '../assets/viperCard.png'
import unknownCard from '../assets/newShipCard.png'
import gorianCard from '../assets/gorianCard.png'
import fireflyCard from '../assets/fireflyCard.png'
import YourFleetStats from '../Location/YourFleetStats'
import BattleStatus from '../Location/BattleStatus'
import BodyWrapper from '../components/BodyWrapper'
import BuildQueue from './BuildQueue'

const Page = styled.div`
  font-size: 15px;
  color: #5affff;
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
`

const PageRow = styled.div`
  
  display: flex;
  flex-wrap: no-wrap;
  @media (max-width: 420px) {
    flex-wrap: wrap;
  }
`

// imported Body Wrapper wraps leftCol and rightCol
const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  // max-width: 78%;
  max-width: 95vw;
`

const RightCol = styled.div`
  flex-direction: column;
  margin: 10px;
  display: flex;
  flex: 1;
`

// left col wraps shipclassmenu and buildrow
const ShipClassMenu = styled.div`
  display: flex;
  border: 1px solid #8c8c8c;
  margin: 10px;
  background-color: #00000080;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-color: #5affff #289794;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 0px;
    height: 10px;
    background-color: #289794;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background-color: #5affff;
  }


  // @media (max-width: 1520px) {
  //   max-width: 740px;
  // }
`

const BuildRow=styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  width: 100%;
  @media (max-width: 715px) {
    flex-wrap: wrap;
  }
  // @media (max-width: 1520px) {
  //   max-width: 740px;
  // }
`

const ShipClassCard = styled.img`
  margin: 10px 5px;
  //height: 350px;
`


const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  align-items: center;
  width: 100%;
`


const Item = styled.div``

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

const Header = styled.text`
  font-weight: bold;
  font-size: 20px;
  margin: 10px;
  margin-left: 0;
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


const FleetMenu = styled.div`
  display: flex;
  flex-direction: column;
  // border-left: none;
  border-left: 1px solid gray;

  height: 100%;
  padding: 11px;
`

const BattleProgressCard = styled.div`
  margin-top: 15px;
`

const ShipyardEditor = styled.div``

const BuildStatsText = styled(Text)`
  font-size: 0.65rem;
`

const accountEllipsis = (account) => `${account.substring(0, 4)}...${account.substring(account.length - 4)}`

const Shipyard = () => {
  const account = useContext(ConnectedAccountContext)
  const shipClasses = useGetShipClasses()
  const spaceDocks = useGetSpaceDock()
  const shipyards = useGetShipyards()
  const playerFleet = useGetShips(account)
  const fleetSize = useGetFleetSize(account)
  const fleetPower = useGetAttackPower(account)
  const maxFleetSize = useGetMaxFleetSize(account)
  const mineralCapacity = useGetMaxMineralCapacity(account)
  const miningCapacity = useGetMiningCapacity(account)
  const fleetLocation = useGetFleetLocation(account)
  const fleetMineral = useGetFleetMineral(account)
  const player = useGetPlayer(account.toString())
  const playerEXP = Number(player.experience)
  const playerName = player.name

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
  const [claimAmount, setClaimAmount] = useState(null)
  const [shipEXP, setShipEXP] = useState(0)

  const currentTravelCooldown = new Date(useGetCurrentTravelCooldown(account) * 1000)
  const currentMiningCooldown = new Date(useGetCurrentMiningCooldown(account) * 1000)
  const playerBattleStatus = useGetPlayerBattleStatus(account)
  const playerBattleInfo = useGetPlayerBattle(account)

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

  const { onClaim } = useClaimShips()

  const handleClaim = async (claimId) => {
    setPendingTx(true)
    console.log('claimId, claimAmount', typeof claimId, claimId, typeof claimAmount, claimAmount)
    try {
      await onClaim(claimId, claimAmount)
    } catch (error) {
      // console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }
  const handleClaimMax = async (claimId, amount) => {
    setPendingTx(true)
    console.log('claimId, claimAmount', typeof claimId, claimId, typeof claimAmount, claimAmount)
    try {
      await onClaim(claimId, amount)
    } catch (error) {
      // console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  const isOwner = shipyardOwner === account.toString()
  const [newName, setShipyardNewName] = useState('')
  const { onShipyardChange } = useSetShipyardName()
  const sendShipyardNameChange = async (nameX, nameY, name) => {
    setPendingTx(true)
    try {
      await onShipyardChange(nameX, nameY, name)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  const handleNameChange = () => {
    sendShipyardNameChange(shipyardX, shipyardY, newName)
  }

  const [newFee, setNewFee] = useState(0)
  const { onShipyardFeeChange } = useSetShipyardFee()
  const sendShipyardFeeChange = async (nameX, nameY, amount) => {
    setPendingTx(true)
    try {
      await onShipyardFeeChange(nameX, nameY, amount)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  const handleFeeChange = () => {
    sendShipyardFeeChange(shipyardX, shipyardY, newFee)
  }

  // make sure player can't build more than 1 dock at the same location
  let dockInUse = false
  for (let i = 0; i < spaceDocks.length; i++) {
    const sDock = spaceDocks[i]
    if (sDock.coordX === shipyardX && sDock.coordY === shipyardY) {
      dockInUse = true
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
    <Page>
      <GameHeader
        location={fleetLocation}
        playerMineral={fleetMineral}
        playerMineralCapacity={mineralCapacity}
        exp={playerEXP}
        playerName={playerName}
      />
      <PageRow>
        <GameMenu pageName="shipyard" />

        <BodyWrapper>
          <LeftCol>
            <ShipClassMenu>
              <ShipClassCard src={viperCard} alt="viper" />
              <ShipClassCard src={moleCard} alt="mole" />
              <ShipClassCard src={fireflyCard} alt="firefly" />
              <ShipClassCard src={gorianCard} alt="gorian" />
              <ShipClassCard src={unknownCard} alt="coming soon" />
            </ShipClassMenu>

            <BuildRow>
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
                {playerEXP < shipEXP && <span>*requires {shipEXP} EXP</span>}
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
                    {pending ? 'pending...' : 'BUILD'}
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
              <BuildQueue fleetLocation={fleetLocation} />              
            </BuildRow>
          </LeftCol>

          <RightCol>
            <FleetMenu>
              <Header style={{ color: 'white' }}>MY FLEET</Header>
              <YourFleetStats
                fleetSize={fleetSize}
                maxFleetSize={maxFleetSize}
                fleetPower={fleetPower}
                miningCapacity={miningCapacity}
                mineralCapacity={mineralCapacity}
                shipClasses={shipClasses}
                playerFleet={playerFleet}
                currentTravelCooldown={currentTravelCooldown}
                currentMiningCooldown={currentMiningCooldown}
                fleetLocation={fleetLocation}
              />

              <BattleProgressCard>
                <Header style={{ color: 'white' }}>BATTLE PROGRESS</Header>
                <BattleStatus
                  playerBattleInfo={playerBattleInfo}
                  playerBattleStatus={playerBattleInfo.battleStatus}
                  currentLocation={fleetLocation}
                />
              </BattleProgressCard>
              <ShipyardEditor>
                {isOwner && (
                  <div>
                    <Item>
                      <input type="text" required maxLength={12} onChange={(e) => setShipyardNewName(e.target.value)} />
                      <br />
                      <Button onClick={handleNameChange}>{!pending ? 'Set Shipyard Name' : 'pending...'}</Button>
                    </Item>
                  </div>
                )}
                {isOwner && (
                  <div>
                    <Item>
                      <input
                        type="number"
                        min="0"
                        max="99"
                        placeholder="0"
                        value={newFee}
                        onChange={(e) => setNewFee(parseFloat(e.target.value))}
                      />
                      <br />
                      <Button onClick={handleFeeChange}>{!pending ? 'Set Shipyard Fee' : 'pending...'}</Button>
                    </Item>
                  </div>
                )}
              </ShipyardEditor>
            </FleetMenu>
          </RightCol>
        </BodyWrapper>
      </PageRow>
    </Page>
  )
}

export default Shipyard
