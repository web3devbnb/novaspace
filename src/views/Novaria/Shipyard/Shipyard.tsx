import React, { useState, useContext } from 'react'
import {} from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
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
} from 'hooks/useNovaria'
import { getWeb3 } from 'utils/web3'
import { ConnectedAccountContext } from 'App'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'
import moleCard from '../assets/moleCard.png'
import viperCard from '../assets/viperCard.png'
import unknownCard from '../assets/newShipCard.png'
import viperQueue from '../assets/viperQueue.png'
import moleQueue from '../assets/moleQueue.png'
import fireflyCard from '../assets/fireflyCard.png'
import fireflyQueue from '../assets/fireflyQueue.png'

const Page = styled.div`
  background-image: url('/images/novaria/shipyardBG.jpg');
  background-size: cover;

  font-size: 15px;
  padding: 10px;
  color: #5affff;

  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
`

const Body = styled.div`
  margin: 10px 10px 10px 10px;
  // fix background later
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  // justify-content: space-evenly;
  background-image: url('/images/novaria/border.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  aspect-ratio: 15/8;
`

const ShipClassMenu = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  overflow-x: auto;
  border: 1px solid #8c8c8c;
  margin: 10px;
  background-color: #00000080;
  width: 99%;

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
`

const ShipClassCard = styled.img`
  margin: 10px 5px;
  max-height: 350px;
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

  width: 100%;
`

const PageRow = styled.div`
  flex-direction: row;
  flex-wrap: no-wrap;
  display: flex;
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
  min-width: 240px;
  height: 100%;
  background-color: #00000080;
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
`

const Input = styled.input`
  width: 4em;
  padding: 2px;
  height: 35px;
  background: transparent;
  border: 1px solid #5affff;
  color: #5affff;
  // -moz-appearance: textfield;
`

const SpaceDockMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #00000080;
  flex-wrap: no-wrap;
  overflow-x: auto;
  border: 1px solid #8c8c8c;
  padding: 10px;
  position: relative;
  width: 70%;
  height: 100%;

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
`

const QueueCardImg = styled.img`
  position: absolute;
  z-index: -1;
`

const QueueCardItems = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  font-size: 12px;
  margin-top: 95%;
`

const QueueCard = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-right: 10px;
`

const ClaimControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 5px;
`

const ClaimInput = styled.input`
  width: 3em;
  padding: 2px;
  background: transparent;
  border: 1px solid #5affff;
  color: #5affff;
`

const ClaimButton = styled.button`
  cursor: pointer;
  margin: 5px;
  align-self: center;
  padding: 0.25rem 1rem;
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  color: black;
  border: none;
  border-radius: 0px;
  background-color: #5affff;
`

const CountdownButton = styled.button`
  margin: 5px;
  margin-left: 0px;
  align-self: center;
  // padding: 0.25rem 1rem;
  font-family: sans-serif;
  font-size: 0.75rem;
  width: 100%;
  text-decoration: none;
  color: #8c8c8c;
  border: 1px solid #8c8c8c;
  border-radius: 0px;
  background-color: transparent;
`

const WrongLocationButton = styled.button`
  margin: 5px;
  align-self: center;
  padding: 0.25rem 1rem;
  font-family: sans-serif;
  font-size: 0.75rem;

  text-decoration: none;
  color: #5affff;
  border: 1px solid #5affff;
  border-radius: 0px;
  background-color: transparent;
`

const FleetMenu = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid gray;
  height: 100%;
`

const ShipyardEditor = styled.div`
  margin-left:
`

const accountEllipsis = (account) => `${account.substring(0, 4)}...${account.substring(account.length - 4)}`

const Shipyard = () => {
  const account = useContext(ConnectedAccountContext)
  const web3 = getWeb3()
  const shipClasses = useGetShipClasses()
  // console.log('shipclasses', shipClasses)
  const spaceDocks = useGetSpaceDock()
  // console.log('spaceDocks', spaceDocks)
  const shipyards = useGetShipyards()
  // console.log('shipayrds', shipyards)
  const playerFleet = useGetShips(account)
  const fleetSize = useGetFleetSize(account)
  const maxFleetSize = useGetMaxFleetSize(account)
  const mineralCapacity = useGetMaxMineralCapacity(account)
  const miningCapacity = useGetMiningCapacity(account)
  const fleetLocation = useGetFleetLocation(account)
  const fleetMineral = useGetFleetMineral(account)
  const playerEXP = useGetPlayer(account.toString()).experience

  const [shipyard, setShipyard] = useState(null)
  const [shipyardName, setShipyardName] = useState(null)
  const [shipyardX, setShipyardX] = useState(null)
  const [shipyardY, setShipyardY] = useState(null)
  const [shipyardOwner, setShipyardOwner] = useState(null)
  const [shipyardFee, setShipyardFee] = useState(null)
  const [shipId, setShipId] = useState(null)
  const [shipName, setShipName] = useState(null)
  const [buildTime, setBuildTime] = useState(0)
  const [shipCost, setShipCost] = useState(0)
  const [shipAmount, setShipAmount] = useState(0)
  // const [totalBuildTime, setTotalBuildTime] = useState(0)
  const [pending, setPendingTx] = useState(false)
  const [claimAmount, setClaimAmount] = useState(null)
  const [shipEXP, setShipEXP] = useState(0)
  // const [claimId, setClaimId] = useState(null)

  const handleShipyardChange = (option) => {
    const selectedShipyardId = option.value
    const selectedShipyard = shipyards[selectedShipyardId]

    setShipyard(selectedShipyardId)
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
    setShipName(selectedShip.name)
    setShipEXP(selectedShip.experienceRequired)
  }
  const costMod = useGetCostMod()
  const buildCost = (shipCost * shipAmount + (shipyardFee / 100) * shipCost * shipAmount) / costMod
  const { onBuild } = useBuildShips()

  const timeMod = useGetTimeModifier()
  // console.log('timeMod, shipAmount, buildTime', timeMod, shipAmount, buildTime)

  const sendTx = async () => {
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

  const sendClaimTx = async (claimId) => {
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
  const sendClaimMaxTx = async (claimId, amount) => {
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
  const sendShipyardNameChange = async () => {
    setPendingTx(true)
    console.log('name change', shipyard.coordX, shipyard.coordY, newName)
    try {
      await onShipyardChange(shipyard.coordX, shipyard.coordY, newName)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  const [newFee, setNewFee] = useState(0)
  const { onShipyardFeeChange } = useSetShipyardFee()
  const sendShipyardFeeChange = async () => {
    setPendingTx(true)
    try {
      await onShipyardFeeChange(shipyard.coordX, shipyard.coordY, newFee)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  // const endDate = new Date(1645233527 *1000)
  // const CalculateTimeLeft = () => {
  //   const difference = +endDate - +new Date()

  //   let timeLeft = {}

  //   if (difference > 0) {
  //     timeLeft = {
  //       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  //       minutes: Math.floor((difference / 1000 / 60) % 60),
  //       seconds: Math.floor((difference / 1000) % 60),
  //     }
  //   }

  //   return timeLeft
  // }

  // styles for the dropdown Selector
  const customStyles = {
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
    input: (provided, state) => ({
      ...provided,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: '#289794',
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      color: '#289794',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#289794',
    }),
  }

  return (
    <Page>
      <GameHeader location={fleetLocation} playerMineral={fleetMineral} exp={playerEXP} />
      <PageRow>
        <GameMenu pageName="shipyard" />

        <Body>
          <Col style={{ width: '70%' }}>
            <ShipClassMenu>
              <ShipClassCard src={viperCard} alt="viper" />
              <ShipClassCard src={moleCard} alt="mole" />
              <ShipClassCard src={fireflyCard} alt="firefly" />
              <ShipClassCard src={unknownCard} alt="coming soon" />
            </ShipClassMenu>

            <Row>
              <BuildMenu>
                <Header>BUILD SHIPS</Header>
                <br />
                <br />
                <Select
                  placeholder="Select Shipyard"
                  // value={shipyard}
                  options={shipyards.map((s, i) => ({ value: i, label: s.name }))}
                  onChange={handleShipyardChange}
                  styles={customStyles}
                />

                <Row style={{ marginTop: 10 }}>
                  <Select
                    placeholder="Select Ship"
                    // value={shipId}
                    options={shipClasses.map((c, i) => ({ value: i, label: c.name }))}
                    onChange={handleShipChange}
                    styles={customStyles}
                  />
                  {playerEXP < shipEXP ? 'requires more EXP' : ''}
                </Row>

                <Row style={{ marginTop: 10 }}>
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={shipAmount}
                    onChange={(e) => setShipAmount(parseFloat(e.target.value))}
                  />
                  {!pending ? (
                    <Button type="button" onClick={sendTx}>
                      Build {shipName}
                    </Button>
                  ) : (
                    <Button type="button">pending...</Button>
                  )}
                </Row>

                <Row style={{ justifyContent: 'space-between', color: 'white', fontSize: 12 }}>
                  <Text>
                    Cost: {buildCost / 10 ** 18}
                    <span style={{ fontSize: 10 }}> NOVA</span>
                  </Text>
                  <Text>Time: {(shipAmount * buildTime) / timeMod}s</Text>
                </Row>
                <div style={{ color: '#289794', marginTop: '5px' }}>
                  <Row style={{ justifyContent: 'space-between' }}>
                    <Text>Shipyard:</Text>
                    <Text>{shipyardName ? `${shipyardName} (${shipyardX}, ${shipyardY})` : '-'}</Text>
                  </Row>
                  <Row style={{ justifyContent: 'space-between', textOverflow: 'ellipsis', width: '100%' }}>
                    <Text>Owner: </Text>
                    <Text>{shipyardOwner ? accountEllipsis(shipyardOwner) : '-'}</Text>
                  </Row>
                  <Row style={{ justifyContent: 'space-between' }}>
                    <Text>Build Fee:</Text>
                    <Text>{shipyardFee ? `${shipyardFee}%` : '-'}</Text>
                  </Row>
                  <Row style={{ justifyContent: 'space-between' }}>
                    <Text>EXP Required:</Text>
                    <Text>{shipEXP ? `${shipEXP}` : '-'}</Text>
                  </Row>
                </div>
              </BuildMenu>

              <SpaceDockMenu>
                <Header style={{ marginTop: 0 }}>
                  BUILD QUEUE <span style={{ fontSize: 13 }}>(Can only have 1 active order per shipyard)</span>
                </Header>
                <Row>
                  {spaceDocks.map((dock) => {
                    return (
                      <Col>
                        <QueueCard key={dock.shipClassId}>
                          {dock.shipClassId === '0' && <QueueCardImg src={viperQueue} alt="vipers in queue" />}
                          {dock.shipClassId === '1' && <QueueCardImg src={moleQueue} alt="moles in queue" />}
                          {dock.shipClassId === '2' && <QueueCardImg src={fireflyQueue} alt="fireflys in queue" />}

                          <QueueCardItems>
                            <Row style={{ justifyContent: 'space-between' }}>
                              <Item>LOCATION &nbsp;</Item>
                              <br />
                              <br />
                              <Item style={{ zIndex: 1 }}>
                                ({dock.coordX}, {dock.coordY})
                              </Item>
                            </Row>
                            <Row style={{ justifyContent: 'space-between' }}>
                              <Item>AMOUNT</Item>
                              <Item style={{ zIndex: 1 }}>{dock.amount}</Item>
                            </Row>
                          </QueueCardItems>
                        </QueueCard>

                        <ClaimControls>
                          {/* eslint-disable-next-line no-nested-ternary */}
                          {fleetLocation.X === dock.coordX && fleetLocation.Y === dock.coordY ? (
                            +new Date(dock.completionTime * 1000) - +new Date() < 0 ? (
                              <div>
                                <Row>
                                  <ClaimButton
                                    style={{
                                      margin: 0,
                                      marginBottom: -2,
                                      marginRight: 5,
                                      padding: 3,
                                      fontSize: 13,
                                      width: '100%',
                                    }}
                                    type="button"
                                    onClick={() => sendClaimMaxTx(spaceDocks.indexOf(dock), dock.amount)}
                                  >
                                    {!pending ? 'CLAIM MAX' : 'pending...'}
                                  </ClaimButton>
                                </Row>
                                <Item>
                                  <ClaimInput
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={claimAmount}
                                    onChange={(e) => setClaimAmount(parseFloat(e.target.value))}
                                  />
                                  <ClaimButton type="button" onClick={() => sendClaimTx(spaceDocks.indexOf(dock))}>
                                    {!pending ? 'CLAIM' : 'pending...'}
                                  </ClaimButton>
                                </Item>
                              </div>
                            ) : (
                              ''
                            )
                          ) : (
                            <WrongLocationButton>Not at Shipyard</WrongLocationButton>
                          )}
                          {dock.completionTime * 1000 > Number(new Date()) ? (
                            <CountdownButton>{new Date(dock.completionTime * 1000).toLocaleString()}</CountdownButton>
                          ) : (
                            ''
                          )}
                        </ClaimControls>
                      </Col>
                    )
                  })}
                </Row>
              </SpaceDockMenu>
            </Row>
          </Col>

          <Col style={{ width: '25%' }}>
            <FleetMenu>
              <Header style={{ marginLeft: 10 }}>FLEET STATS</Header>
              <Row style={{ justifyContent: 'space-between' }}>
                <Col>
                  <Item style={{ marginBottom: 10 }}>Fleet Size</Item>
                  <Item style={{ marginBottom: 10 }}>Mining Capacity</Item>
                  <Item style={{ marginBottom: 10 }}>Mineral Capacity</Item>
                  {shipClasses.map((ship) => {
                    return (
                      <Item style={{ marginBottom: 10 }} key={ship.name}>
                        {ship.name}s
                      </Item>
                    )
                  })}
                </Col>
                <Col style={{ textAlign: 'right' }}>
                  {/* Find a way to map this out based on shipclass? */}
                  <Item style={{ marginBottom: 10 }}>
                    {fleetSize || '-'}/{maxFleetSize || '-'}
                  </Item>
                  <Item style={{ marginBottom: 10 }}>{miningCapacity ? web3.utils.fromWei(miningCapacity) : '-'} </Item>
                  <Item style={{ marginBottom: 10 }}>
                    {mineralCapacity ? web3.utils.fromWei(mineralCapacity) : '-'}
                  </Item>
                  <Item style={{ marginBottom: 10 }}>{playerFleet[0] || '-'}</Item>
                  <Item style={{ marginBottom: 10 }}>{playerFleet[1] || '-'}</Item>
                  <Item style={{ marginBottom: 10 }}>{playerFleet[2] || '-'}</Item>
                </Col>
              </Row>
              <ShipyardEditor>
                {isOwner && (
                  <div>
                    <Item>
                      <input type="text" required maxLength={16} onChange={(e) => setShipyardNewName(e.target.value)} />
                      <Button onClick={sendShipyardNameChange}>{!pending ? 'Set Shipyard Name' : 'pending...'}</Button>
                    </Item>
                  </div>
                )}
                {isOwner && (
                  <div>
                    <Item>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0"
                        value={newFee}
                        onChange={(e) => setNewFee(parseFloat(e.target.value))}
                      />
                      <Button onClick={sendShipyardFeeChange}>{!pending ? 'Set Shipyard Fee' : 'pending...'}</Button>
                    </Item>
                  </div>
                )}
              </ShipyardEditor>
            </FleetMenu>
          </Col>
        </Body>
      </PageRow>
    </Page>
  )
}

export default Shipyard
