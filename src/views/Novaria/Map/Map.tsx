import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useGetFleetLocation, useGetPlaceInfo, useGetFleetsAtLocation } from 'hooks/useNovaria'
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
  console.log('map data', data)
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
  flex-direction: row;
  flex-wrap: no-wrap;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: -75px;
  }
`

const Body = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px 10px;
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
  position: relative;
  aspect-ratio: 17/8;
  z-index: 0;
`

const GridCellImg = styled.img`
  // position: absolute;
  left: 50%;
  right: 50%;
  align-items: center;
  align-self: center;
  height: 50%;
  // z-index: 0;
`

const IndicatorImg = styled.img`
  // width: 30px;
  // height: auto;
  align-self: center;
  position: absolute;
  right: 5px;
  // z-axis: 1;
`

const GridIcon = styled.img`
  width: 20px;
  height: auto;
`

const GridCellContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;

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

const CoordInput = styled.input`
  width: 4em;
  background: transparent;
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
  justify-content: space-evenly;
  border: 1px solid gray;
  margin: 5px 10px;;
  padding: 5px;
  align-items: center;
`

const NX = (window.innerWidth < 1050 ? 5 : 7)
const NY = (window.innerWidth < 1050 ? 5 : 7)

const Map: React.FC = () => {
  const mapContract = useMap()

  const [mapData, setMapData] = useState({ x0: 0, y0: 0, data: Array(NY).fill(Array(NX).fill({})) })

  const [X, setX] = useState(0)
  const [Y, setY] = useState(0)

  const [XLen, setXLen] = useState(NX)
  const [YLen, setYLen] = useState(NY)

  const { account } = useWallet()
  const fleetLocation = useGetFleetLocation(account)

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

  const HasRefinery = (x, y) => {
    return useGetPlaceInfo(x, y).refinery
  }

  const HasShipyard = (x, y) => {
    return useGetPlaceInfo(x, y).shipyard
  }

  const HasMineral = (x, y) => {
    return useGetPlaceInfo(x, y).mineral
  }

  const HasFleets = (x, y) => {
    const fleets = useGetFleetsAtLocation(x, y)
    return fleets.length
  }
  
  console.log('fleets', useGetFleetsAtLocation(0, 0))

  if (!mapData) {
    return null
  }

  return (
    <Page>
      
      <GameMenu pageName="starmap" />
      <Body>
        <Grid nx={mapData.data[0].length} ny={mapData.data.length}>
          {mapData.data.map((arr, i) => {
            const ri = mapData.data.length - i - 1
            return mapData.data[ri].map((el, j) => {
              return (
                <GridCell>
                <GridCellContent aria-haspopup="true">
                <Link
                  to={{
                    pathname: '/location',
                    state: [{ x: ri + mapData.x0, y: j + mapData.y0 }],
                  }}
                >
                  {/* {el.name && ( */}
                        <Text bold glowing>
                          {el.name}
                        </Text>
                        <Unexplored>
                          {el.placeType === '' ? 'Location Unexplored' : ''}
                        </Unexplored>

                        {el.salvage > 0 ? <GridIcon src={scrapLogo} alt="has salvage" /> : ''}
                        {HasRefinery(ri + mapData.x0, j + mapData.y0) === true ? (
                          <GridIcon src={refineryLogo} alt="planet has refinery" />
                        ) : (
                          ''
                        )}
                        {HasShipyard(ri + mapData.x0, j + mapData.y0) === true ? (
                          <GridIcon src={shipyardLogo} alt="planet has shipyard" />
                        ) : (
                          ''
                        )}
                        {HasMineral(ri + mapData.x0, j + mapData.y0) > 0 ? (
                          <GridIcon src={mineralLogo} alt="planet has minerals" />
                        ) : (
                          ''
                        )}

                        {HasFleets(ri + mapData.x0, j + mapData.y0) > 0 && HasFleets(ri + mapData.x0, j + mapData.y0) < 11 
                          ? <GridIcon src={lowPlayers} alt="planet has few players" /> : '' }
                          {HasFleets(ri + mapData.x0, j + mapData.y0) > 10 && HasFleets(ri + mapData.x0, j + mapData.y0) < 51 
                            ? <GridIcon src={medPlayers} alt="planet has many players" /> : '' }
                            {HasFleets(ri + mapData.x0, j + mapData.y0) > 50  
                              ? <GridIcon src={highPlayers} alt="planet has more than 50 players" /> : '' }
                 
                        {el.placeType === 'planet' ? <GridCellImg src={planetLogo} alt="planet" /> : ''}
                        {el.placeType === 'star' ? <GridCellImg src={starLogo} alt="star" /> : ''}
                        {el.placeType === 'empty' ? <GridCellImg src={emptyLogo} alt="star" /> : ''}
                        {(ri + mapData.x0).toString() === fleetLocation.X.toString() &&
                        (j + mapData.y0).toString() === fleetLocation.Y.toString() ? (
                          <IndicatorImg src={youLogo} alt="current location" />
                        ) : (
                          ''
                        )}

                        <GridCellId>
                          ({ri + mapData.x0} , {j + mapData.y0})
                        </GridCellId>
                  </Link>
                    </GridCellContent>
                </GridCell>
              )
            })
          })}
        </Grid>

        <GridControls>
          <InputControl>
            <button type="button" onClick={handleFindLocationClick}>
              Find location (x, y)
            </button>
            (
            <CoordInput type="number" min="0" max="10" value={X} onChange={(e) => setX(parseFloat(e.target.value))} />
            ,
            <CoordInput type="number" min="0" max="10"  value={Y} onChange={(e) => setY(parseFloat(e.target.value))} />)
          </InputControl>

          <InputControl>
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
          </InputControl>
        </GridControls>
        <Legend>
          <span><GridIcon src={mineralLogo} alt="planet has minerals" /> - Mining Planet</span>
          <span><GridIcon src={shipyardLogo} alt="planet has shipyard" /> - Shipyard</span>
          <span><GridIcon src={refineryLogo} alt="planet has refinery" /> - Refinery (DMZ)</span>
          <span><GridIcon src={youLogo} alt="your location" /> - Current Location</span>
          <span><GridIcon src={lowPlayers} alt="planet has few players" /> - 1-10 players</span>
          <span><GridIcon src={medPlayers} alt="planet many players" /> - 11-50 players</span>
          <span><GridIcon src={highPlayers} alt="planet 50 plus players" /> - 51+ players</span>
        </Legend>
      </Body>
    </Page>
  )
}

export default Map
