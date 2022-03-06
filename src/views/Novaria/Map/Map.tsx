import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ConnectedAccountContext } from 'App'
import { useGetFleetLocation, useGetFleetMineral, useGetMaxMineralCapacity, useGetPlayer } from 'hooks/useNovaria'
import styled from 'styled-components'
import { useMap } from 'hooks/useContract'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'
import shipyardLogo from '../assets/shipyard.png'
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
import BodyWrapper from '../components/BodyWrapper'
import wormholeLogo from '../assets/wormhole.png'
import Legend from './Legend'

const fetchMapData = async (contract, lx: number, ly: number) => {
  const data = await contract.methods.getCoordinatePlaces(lx, ly).call()
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

export interface TextProps {
  isStar: boolean
}

const Page = styled.div`
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
  color: ${(props: TextProps) => (props.isStar ? '#ff7300' : '#5affff')};
  font-weight: medium;
  font-size: 12px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props: GridProps) => props.ny}, 1fr);
  grid-template-rows: repeat(${(props: GridProps) => props.nx}, 1fr);
  grid-gap: 1px;
  margin: 10px 10px 10px;
  padding: 10px;
`

const GridCell = styled.div`
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  direction: ltr;
  @media (mmin-width: 800px) {
    width: 100px;
    height: 80px;
  }
`

const GridCellImg = styled.img`
  //position: relative;
  align-items: center;
  align-self: center;
  max-height: 70%;
`

const IndicatorImg = styled.img`
  align-self: center;
`

const GridIcon = styled.img`
  width: 20px;
  height: 20px;
`

const GridCellContent = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  min-width: 20px;
  flex-wrap: no-wrap;
  position: relative;
  aspect-ratio: 17/8;
  padding: 5px 5px;

  width: 100px;
  height: 80px;
  @media (max-width: 420px) {
    width: 45px;
    height: 100px;
  }
  @media (min-width: 900px) {
    width: 110px;
  }
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
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-wrap: nowrap;
  }
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

const GridControls = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 10px;
`

const Button = styled.button`
  cursor: pointer;
  min-height: 35px;
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



const MoveControls = styled.div`
  display: flex;
`

const MoveButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`

const NX = 7
const NY = 7

const Map: React.FC = () => {
  const account = useContext(ConnectedAccountContext)

  const mapContract = useMap()

  const [mapData, setMapData] = useState({ x0: 0, y0: 0, data: Array(NY).fill(Array(NX).fill({})) })

  // load previous map locations
  const savedLocationX = Number(localStorage.getItem('locationX'))
  const savedLocationY = Number(localStorage.getItem('locationY'))

  const [X, setX] = useState(0)
  const [Y, setY] = useState(0)
  console.log('x, y', X, Y)
  const XLen = useState(NX)

  const fleetLocation = useGetFleetLocation(account)
  const fleetMineral = useGetFleetMineral(account)
  const mineralCapacity = useGetMaxMineralCapacity(account)
  const player = useGetPlayer(account)

  // adjust coordinates to keep map centered
  const adjCoords = (newX, newY) => {
    const adjFleetX = Math.max(0, newX - Math.floor(NX / 2))
    const adjFleetY = Math.max(0, newY - Math.floor(NY / 2))
    setX(newX)
    setY(newY)
    localStorage.setItem('locationX', String(newX))
    localStorage.setItem('locationY', String(newY))
    return [adjFleetX, adjFleetY]
  }

  // set map data on inital page load
  useEffect(() => {
    const fetch = async () => {
      const [mapX, mapY] = adjCoords(savedLocationX, savedLocationY)
      const data = await fetchMapData(mapContract, mapX, mapY)
      setMapData({ x0: mapX, y0: mapY, data: arrayToMatrix(data, NX) })
    }
    fetch()
  }, [mapContract, savedLocationX, savedLocationY])

  // Find location button
  const handleFindLocationClick = async () => {
    if (mapData.x0 === X && mapData.y0 === Y) {
      return
    }
    handleFleetLocation(X, Y)
  }

  // My Location button
  const handleFleetLocation = async (newX, newY) => {
    const [mapX, mapY] = adjCoords(newX, newY)
    const data = await fetchMapData(mapContract, mapX, mapY)
    setMapData({ x0: mapX, y0: mapY, data: arrayToMatrix(data, XLen) })
  }

  // Map Arrows
  const handleMapArrow = async (moveX, moveY) => {
    let calcX = X
    let calcY = Y
    if (X < 3) {
      calcX = 3
    }
    if (Y < 3) {
      calcY = 3
    }
    const newX = Math.max(Math.min(Math.floor(NX / 2), Number(calcX)), Number(calcX) + moveX)
    const newY = Math.max(Math.min(Math.floor(NY / 2), Number(calcY)), Number(calcY) + moveY)
    const [mapX, mapY] = adjCoords(newX, newY)
    const data = await fetchMapData(mapContract, mapX, mapY)
    setMapData({ x0: mapX, y0: mapY, data: arrayToMatrix(data, XLen) })
  }

  if (!mapData) {
    return null
  }

  return (
    <Page>
      <GameHeader
        location={fleetLocation}
        playerMineral={fleetMineral}
        playerMineralCapacity={mineralCapacity}
        exp={player.experience}
        playerName={player.name}
      />
      <MainRow>
        <GameMenu pageName="starmap" />
        <Body>
          <BodyWrapper>
            <Grid nx={mapData.data[0].length} ny={mapData.data.length}>
              {mapData.data.map((arr, y) => {
                const ry = Number(mapData.data.length - y - 1)
                return mapData.data[y].map((planet, x) => {
                  return (
                    <GridCell>
                      <Link
                        to={{
                          pathname: '/location',
                          state: [{ x: Number(x) + Number(mapData.x0), y: Number(ry) + Number(mapData.y0) }],
                        }}
                      >
                        <GridCellContent aria-haspopup="true">
                          <Text isStar={planet.placeType === '3'}>{planet.name}</Text>

                          <Row>
                            {planet.salvage > 0 && <GridIcon src={scrapLogo} alt="has salvage" />}
                            {planet.hasRefinery === true && <GridIcon src={refineryLogo} alt="planet has refinery" />}
                            {planet.hasShipyard === true && <GridIcon src={shipyardLogo} alt="planet has shipyard" />}
                            {planet.availableMineral > 0 && <GridIcon src={mineralLogo} alt="planet has minerals" />}
                            {planet.placeType === '5' && <GridCellImg src={asteroid} alt="asteroid" />}
                            {(Number(ry) + Number(mapData.y0)).toString() === fleetLocation.Y.toString() &&
                              (Number(x) + Number(mapData.x0)).toString() === fleetLocation.X.toString() && (
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

                            {planet.placeType === '0' && (
                              <GridCellImg
                                style={{ width: '50px', height: 'auto' }}
                                src={unexploredIcon}
                                alt="unexplored"
                              />
                            )}
                            {planet.placeType === '6' && <GridCellImg src={wormholeLogo} alt="wormhole" />}
                            {planet.placeType === '4' && <GridCellImg src={planetLogo} alt="planet" />}
                            {planet.placeType === '3' && <GridCellImg src={star1} alt="star" />}
                            {planet.placeType === '1' && planet.canTravel && (
                              <GridCellImg src={emptyLogo} alt="empty" />
                            )}
                          </Row>
                          <GridCellId>
                            ( {Number(x) + Number(mapData.x0)} ,{Number(ry) + Number(mapData.y0)} )
                          </GridCellId>
                        </GridCellContent>
                      </Link>
                    </GridCell>
                  )
                })
              })}
            </Grid>
          </BodyWrapper>
          <GridControls>
            <MoveControls>
              <MoveButton type="button" onClick={() => handleMapArrow(-2, 0)}>
                <img src={leftArrow} alt="left" />
              </MoveButton>
              <MoveButton type="button" onClick={() => handleMapArrow(0, -2)}>
                <img src={downArrow} alt="down" />
              </MoveButton>
              <MoveButton type="button" onClick={() => handleMapArrow(0, 2)}>
                <img src={upArrow} alt="up" />
              </MoveButton>
              <MoveButton type="button" onClick={() => handleMapArrow(2, 0)}>
                <img src={rightArrow} alt="right" />
              </MoveButton>
            </MoveControls>
            <Button type="button" onClick={() => handleFleetLocation(fleetLocation.X, fleetLocation.Y)}>
              My Location
            </Button>
            <InputControl>
              <Button type="button" onClick={handleFindLocationClick}>
                Find location (x, y)
              </Button>
              (
              <CoordInput type="number" min="0" value={X} onChange={(e) => setX(parseFloat(e.target.value))} />
              ,
              <CoordInput type="number" min="0" value={Y} onChange={(e) => setY(parseFloat(e.target.value))} />)
            </InputControl>
          </GridControls>
          <Legend />
        </Body>
      </MainRow>
    </Page>
  )
}

export default Map
