import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ConnectedAccountContext } from 'App'
import { useGetFleetLocation, useGetFleetMineral, useGetPlayer } from 'hooks/useNovaria'
import styled from 'styled-components'
import { useMap } from 'hooks/useContract'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'
import shipyardLogo from '../assets/shipyard.png'
import starLogo from '../assets/star.png'
import scrapLogo from '../assets/scrap.png'
import refineryLogo from '../assets/refinery.png'
import planetLogo from '../assets/planet.png'
import emptyLogo from '../assets/emptyLocation.png'
import youLogo from '../assets/you.png'
import mineralLogo from '../assets/mineral.png'
import lowPlayers from '../assets/lowplayers.png'
import medPlayers from '../assets/medplayers.png'
import highPlayers from '../assets/highplayers.png'
import asteroid from '../assets/asteroid.png'
import star1 from '../assets/star1.png'
import unexploredIcon from '../assets/unexplored.svg'
import upArrow from '../assets/upArrow.png'
import downArrow from '../assets/downArrow.png'
import leftArrow from '../assets/leftArrow.png'
import rightArrow from '../assets/rightArrow.png'
import FlipScreenModal from './FlipScreenModal'

const fetchMapData = async (contract, lx: number, ly: number) => {
  const data = await contract.methods.getCoordinatePlaces(lx, ly).call()
  console.log('array map data', data)
  return data
}

const arrayToMatrix = (arr, size) => {
  const res = []
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size))
  }
  return res
}

export interface GridProps {
  nx: number
  ny: number
}

const Page = styled.div`
  // background-image: url('/images/novaria/mapBG.jpg');
  background-size: cover;
  font-size: 15px;
  color: #5affff;
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
`

const Body = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px 0px;
`

const Text = styled.text`
  color: #5affff;
  font-weight: medium;
`

const Grid = styled.div`
  // flex-grow: 1;
  // display: flex;
  // flex-flow:  wrap;
  // box-sizing:border-box;
  display: grid;
  grid-template-columns: repeat(${(props: GridProps) => props.ny}, 1fr);
  grid-template-rows: repeat(${(props: GridProps) => props.nx}, 1fr);
  grid-gap: 1px;
  // grid-auto-flow: column;
  margin: 10px 10px 10px;
  background-image: url('/images/novaria/border.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 10px;
  // direction: rtl;
  // aspect-ratio: 16/8;
`

const GridCell = styled.div`
  display: flex;
  // flex: 1;
  // width:calc(100%/5);
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  direction: ltr;
`

const GridCellImg = styled.img`
  //position: relative;
  // left: 50%;
  // right: 50%;
  align-items: center;
  align-self: center;
  max-height: 70%;
`

const IndicatorImg = styled.img`
  // width: 30px;
  // height: auto;
  align-self: center;
  // position: absolute;
  // right: 5px;
`

const GridIcon = styled.img`
  width: 20px;
  height: 20px;
`

const GridCellContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  flex-wrap: no-wrap;
  padding: 5px 5px;
  // border: 1px solid white;
  position: relative;
  aspect-ratio: 17/8;
  width: 100px;
  height: 80px;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 150px;
  }
`

const Row = styled.div`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`

const MainRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
`

const GridCellId = styled.div`
  position: absolute;
  bottom: 0px;
  right: 2px;
  font-size: 0.5rem;
  opacity: 0;
  ${GridCell} :hover & {
    opacity: 1;
  }
`

const Unexplored = styled.div`
  color: gray;
  opacity: 0;
  text-align: center;

  ${GridCell} :hover & {
    opacity: 1;
  }
`

const GridControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right:10px;
`

const Button = styled.button`
  cursor: pointer;
  height: 35px;
  align-self: center;
  padding: 0.25rem 1.25rem;
  font-family: sans-serif;
  font-size: 1rem;
  text-decoration: none;
  color: #5affff;
  border: 1px solid #5affff;
  border-radius: 0px;
  background-color: transparent;
`

const CoordInput = styled.input`
  width: 4em;
  background: transparent;
  border: 1px solid #5affff;
  -moz-appearance: textfield;
  color: white;
`

const InputControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  color: white;
  gap: 5px;
  margin: 10px;
`

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border: 1px solid gray;
  margin: 5px 10px;
  padding: 5px;
  align-items: center;
  & > * {
    margin: 5px;
  }
`

const MoveControls = styled.div`
  display: flex;
`

const MoveButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`


const isMobile = window.innerWidth < 800
const NX = 7
const NY = 7

const Map: React.FC = () => {
  const mapContract = useMap()

  const account = useContext(ConnectedAccountContext)
  const fleetLocation = useGetFleetLocation(account)

  const [mapData, setMapData] = useState({ x0: 0, y0: 0, data: Array(NY).fill(Array(NX).fill({})) })
  useEffect(() => {
    const fetch = async () => {
      const data = await fetchMapData(mapContract, fleetLocation.X, fleetLocation.Y)
      setMapData({ x0: fleetLocation.X, y0: fleetLocation.Y, data: arrayToMatrix(data, NX) })
    }
    fetch()
  }, [mapContract, fleetLocation.X, fleetLocation.Y])

  

  const [X, setX] = useState(0)
  const [Y, setY] = useState(0)
  console.log('map x y', X, Y)

  useEffect(() => {
    setX(fleetLocation.X)
    setY(fleetLocation.Y)
  },[fleetLocation.X, fleetLocation.Y])

  const [XLen, setXLen] = useState(NX)
  const [YLen, setYLen] = useState(NY)

  const fleetMineral = useGetFleetMineral(account)

  const handleMapLeft = async () => {
    let newX = 0
    if (X < 2) {
      setX(0)
    } else {
      newX = Number(X)-2
      setX(Number(X)-2)
      
    }
    const data = await fetchMapData(mapContract, newX, Y)
    setMapData({ x0: newX, y0: Y, data: arrayToMatrix(data, XLen) })
  }

  const handleMapDown = async () => {
    let newY = 0
    if (Y < 2) {
      setY(0)
    } else {
      newY = Number(Y)-2
      setY(Number(Y)-2)
    }
    const data = await fetchMapData(mapContract, X, newY)
    setMapData({ x0: X, y0: newY, data: arrayToMatrix(data, XLen) })
  }

  const handleMapUp = async () => {
    setY(Number(Y)+2)
    const newY = Number(Y) + 2
    const data = await fetchMapData(mapContract, X, newY)
    setMapData({ x0: X, y0: newY, data: arrayToMatrix(data, XLen) })
  }

  const handleMapRight = async () => {
    setX(Number(X)+2)
    const newX = Number(X)+2
    const data = await fetchMapData(mapContract, newX, Y)
    setMapData({ x0: newX, y0: Y, data: arrayToMatrix(data, XLen) })
  }

  const handleFindLocationClick = async () => {
    if (mapData.x0 === X && mapData.y0 === Y) {
      return
    }
    const data = await fetchMapData(mapContract, X, Y)
    setMapData({ x0: X, y0: Y, data: arrayToMatrix(data, XLen) })
  }

  const handleFleetLocation = async () => {
    setX(fleetLocation.X)
    setY(fleetLocation.Y)
    const data = await fetchMapData(mapContract, fleetLocation.X, fleetLocation.Y)
    setMapData({ x0: fleetLocation.X, y0: fleetLocation.Y, data: arrayToMatrix(data, XLen) })

  }

  const player = useGetPlayer(account.toString())
  const playerEXP = player.experience
  const playerName = player.name

  if (!mapData) {
    return null
  }

  

  return (
    <Page >
      <FlipScreenModal isMobile={isMobile}/>
      <GameHeader location={fleetLocation} playerMineral={fleetMineral} exp={playerEXP}  playerName={playerName} />
      <MainRow>
        <GameMenu pageName="starmap" />
        <Body>
          <Grid nx={mapData.data[0].length} ny={mapData.data.length}>
            {mapData.data.map((arr, y) => {
              const ry = Number(mapData.data.length - y - 1)
              return mapData.data[y].map((planet, x) => {
                return (
                  <GridCell>
                    <Link
                      to={{
                        pathname: '/location',
                        state: [{ x: (Number(x)+Number(mapData.x0)), y: (Number(ry)+Number(mapData.y0)) }],
                      }}
                    >
                      <GridCellContent aria-haspopup="true">
                        <Text >
                          {planet.name}
                        </Text>
                        {/* <Unexplored>
                          {planet.placeType === '0' && !planet.canTravel ? 'Location Unexplored' : ''}
                        </Unexplored> */}
                        <Row>
                          {planet.salvage > 0 && <GridIcon src={scrapLogo} alt="has salvage" />}
                          {planet.hasRefinery === true && <GridIcon src={refineryLogo} alt="planet has refinery" />}
                          {planet.hasShipyard === true && <GridIcon src={shipyardLogo} alt="planet has shipyard" />}
                          {planet.availableMineral > 0 && <GridIcon src={mineralLogo} alt="planet has minerals" />}
                          {planet.placeType === '5' && <GridCellImg src={asteroid} alt="asteroid" />}
                          {(Number(ry)+Number(mapData.y0)).toString() === fleetLocation.Y.toString() &&
                            (Number(x)+Number(mapData.x0)).toString() === fleetLocation.X.toString() && (
                              <IndicatorImg src={youLogo} alt="current location" />
                            )}

                          {planet.fleetCount > 0 && planet.fleetCount < 11 && (
                            <GridIcon src={lowPlayers} alt="planet has few players" />
                          )}

                          {planet.fleetCount > 10 && planet.fleetCount < 51 && (
                            <GridIcon src={medPlayers} alt="planet has many players" />
                          )}

                          {planet.fleetCount > 50 && (
                            <GridIcon src={highPlayers} alt="planet has more than 50 players" />
                          )}

                          {planet.placeType === '0' && <GridCellImg style={{width:'50%', height: 'auto'}} src={unexploredIcon} alt="unexplored" />}
                          {planet.placeType === '4' && <GridCellImg src={planetLogo} alt="planet" />}
                          {planet.placeType === '3' && <GridCellImg src={star1} alt="star" />}
                          {planet.placeType === '1' && planet.canTravel ? (
                            <GridCellImg src={emptyLogo} alt="empty" />
                          ) : (
                            ''
                          )}
                        </Row>
                        <GridCellId>
                          ( {Number(x)+Number(mapData.x0) } ,{Number(ry)+Number(mapData.y0)})
                        </GridCellId>
                      </GridCellContent>
                    </Link>
                  </GridCell>
                )
              })
            })}
          </Grid>

          <GridControls>
            <InputControl>
              <Button type="button" onClick={handleFindLocationClick}>
                Find location (x, y)
              </Button>
              (
              <CoordInput type="number" min="0" value={X} onChange={(e) => setX(parseFloat(e.target.value))} />
              ,
              <CoordInput type="number" min="0" value={Y} onChange={(e) => setY(parseFloat(e.target.value))} />
              )
            </InputControl>
            <MoveControls>
              <MoveButton type='button' onClick={handleMapLeft}>
                <img src={leftArrow} alt='left'  />
              </MoveButton>
              <MoveButton type='button'  onClick={handleMapUp}>
                <img src={upArrow} alt='up'  />
              </MoveButton>
              <MoveButton type='button'  onClick={handleMapDown} >
                <img src={downArrow} alt='down' />
              </MoveButton>
              <MoveButton type='button'  onClick={handleMapRight} >
                <img src={rightArrow} alt='right' />
              </MoveButton>
            </MoveControls>
            <Button type='button' onClick={handleFleetLocation} >
              My Location
            </Button>

          </GridControls>
          <Legend>
            <span>
              <GridIcon src={mineralLogo} alt="planet has minerals" /> : Mining Planet
            </span>
            <span>
              <GridIcon src={shipyardLogo} alt="planet has shipyard" /> : Shipyard
            </span>
            <span>
              <GridIcon src={refineryLogo} alt="planet has refinery" /> : Refinery (DMZ)
            </span>
            <span>
              <GridIcon src={scrapLogo} alt="has salvage" /> : Salvage
            </span>
            <span>
              <GridIcon src={youLogo} alt="your location" /> : Current Location
            </span>
            <span>
              <GridIcon src={lowPlayers} alt="planet has few players" /> : 1-10 players
            </span>
            <span>
              <GridIcon src={medPlayers} alt="planet many players" /> : 11-50 players
            </span>
            <span>
              <GridIcon src={highPlayers} alt="planet 50 plus players" /> : 51+ players
            </span>
          </Legend>
        </Body>
      </MainRow>
    </Page>
  )
}

export default Map
