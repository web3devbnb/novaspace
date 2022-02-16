import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Text } from '@pancakeswap-libs/uikit'
import { ConnectedAccountContext } from 'App'
import { useGetFleetLocation, useGetFleetMineral } from 'hooks/useNovaria'
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

const fetchMapData = async (contract, lx: number, ly: number, rx: number, ry: number) => {
  const data = await contract.methods.getCoordinatePlaces(lx, ly, rx, ry).call()
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
  background-image: url('/images/novaria/mapBG.jpg');
  background-size: cover;
  font-size: 15px;
  margin-top: -105px;
  color: #5affff;
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: -75px;
  }
`

const Body = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px 0px;
`

const Grid = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(${(props: GridProps) => props.ny}, 1fr);
  grid-template-rows: repeat(${(props: GridProps) => props.nx}, 1fr);
  grid-gap: 1px;
  margin: 10px 10px 10px;
  background-image: url('/images/novaria/border.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 10px;
  // aspect-ratio: 16/8;
`

const GridCell = styled.div`
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  width: 150px;
  height: 80px;
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

  &:hover {
    opacity: 1;
  }
`

const GridControls = styled.div`
  display: flex;
  justify-content: space-between;
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

const NX = window.innerWidth < 1150 ? 5 : 7
const NY = window.innerWidth < 1150 ? 5 : 7

const Map: React.FC = () => {
  const mapContract = useMap()

  const [mapData, setMapData] = useState({ x0: 0, y0: 0, data: Array(NY).fill(Array(NX).fill({})) })

  console.log('map data', mapData)

  const [X, setX] = useState(0)
  const [Y, setY] = useState(0)

  const [XLen, setXLen] = useState(NX)
  const [YLen, setYLen] = useState(NY)

  const account = useContext(ConnectedAccountContext)
  const fleetLocation = useGetFleetLocation(account)
  const fleetMineral = useGetFleetMineral(account)

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchMapData(mapContract, 0, 0, NX - 1, NY - 1)
      setMapData({ x0: 0, y0: 0, data: arrayToMatrix(data, NX) })
    }
    fetch()
  }, [mapContract])

  const handleFindLocationClick = async () => {
    if (mapData.x0 === X && mapData.y0 === Y) {
      return
    }
    const data = await fetchMapData(mapContract, X, Y, X + XLen - 1, Y + YLen - 1)
    setMapData({ x0: X, y0: Y, data: arrayToMatrix(data, XLen) })
  }

  const handleSetGridSizeClick = async () => {
    if (mapData.data.length === YLen && mapData.data[0].length === XLen) {
      return
    }
    const data = await fetchMapData(mapContract, X, Y, X + XLen - 1, Y + YLen - 1)
    setMapData({ x0: X, y0: Y, data: arrayToMatrix(data, XLen) })
  }

  if (!mapData) {
    return null
  }

  return (
    <Page>
      <GameHeader location={fleetLocation} playerMineral={fleetMineral} />
      <MainRow>
        <GameMenu pageName="starmap" />
        <Body>
          <Grid nx={mapData.data[0].length} ny={mapData.data.length}>
            {mapData.data.map((arr, y) => {
              const ry = mapData.data.length - y - 1
              return mapData.data[ry].map((el, x) => {
                return (
                  <GridCell>
                    <Link
                      to={{
                        pathname: '/location',
                        state: [{ x: x + mapData.x0, y: ry + mapData.y0 }],
                      }}
                    >
                      <GridCellContent aria-haspopup="true">
                        <Text bold glowing>
                          {el.name}
                        </Text>
                        <Unexplored>{el.placeType === '' && 'Location Unexplored'}</Unexplored>
                        <Row>
                          {el.salvage > 0 && <GridIcon src={scrapLogo} alt="has salvage" />}
                          {el.hasRefinery === true && <GridIcon src={refineryLogo} alt="planet has refinery" />}
                          {el.hasShipyard === true && <GridIcon src={shipyardLogo} alt="planet has shipyard" />}
                          {el.availableMineral > 0 && <GridIcon src={mineralLogo} alt="planet has minerals" />}

                          {el.fleetCount > 0 && el.fleetCount < 11 && (
                            <GridIcon src={lowPlayers} alt="planet has few players" />
                          )}

                          {el.fleetCount > 10 && el.fleetCount < 51 && (
                            <GridIcon src={medPlayers} alt="planet has many players" />
                          )}

                          {el.fleetCount > 50 && <GridIcon src={highPlayers} alt="planet has more than 50 players" />}

                          {el.placeType === 'planet' && <GridCellImg src={planetLogo} alt="planet" />}
                          {el.placeType === 'star' && <GridCellImg src={starLogo} alt="star" />}
                          {el.placeType === 'empty' && <GridCellImg src={emptyLogo} alt="star" />}
                          {(x + mapData.x0).toString() === fleetLocation.X.toString() &&
                            (ry + mapData.y0).toString() === fleetLocation.Y.toString() && (
                              <IndicatorImg src={youLogo} alt="current location" />
                            )}
                        </Row>
                        <GridCellId>
                          ({x + mapData.x0} , {ry + mapData.y0})
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
              <CoordInput type="number" min="0" max="10" value={X} onChange={(e) => setX(parseFloat(e.target.value))} />
              ,
              <CoordInput type="number" min="0" max="10" value={Y} onChange={(e) => setY(parseFloat(e.target.value))} />
              )
            </InputControl>

            {/* <InputControl>
              <button type="button" onClick={handleSetGridSizeClick}>
                Set grid size (x, y)
              </button>
              <CoordInput
                type="number"
                min="1"
                max="16"
                value={XLen}
                onChange={(e) => setXLen(parseFloat(e.target.value))}
              />
              x
              <CoordInput
                type="number"
                min="1"
                max="16"
                value={YLen}
                onChange={(e) => setYLen(parseFloat(e.target.value))}
              />
            </InputControl> */}
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
