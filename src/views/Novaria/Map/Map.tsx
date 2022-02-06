import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useGetFleetLocation, useGetPlaceInfo } from 'hooks/useNovaria'
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

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: -75px;
  }
`

const Body = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 10px 10px 0px 150px;
`

const Grid = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(${(props: GridProps) => props.ny}, 1fr);
  grid-template-rows: repeat(${(props: GridProps) => props.nx}, 1fr);
  grid-gap: 1px;
  margin: 10px 10px 10px;
  background-image: url('/images/novaria/border.png');
  background-size: cover;
  background-repeat: no-repeat;
  padding: 10px;
  aspect-ratio: 16/8;
`

const GridCell = styled.div`
  display: flex;
  color: white;
  position: relative;
  aspect-ratio: 17/8;
  z-index: 0;
`

const GridCellImg = styled.img`
  position: absolute;
  left: 50%;
  right: 50%;
  align-items: center;
  align-self: center;
  height: 50%;
  z-index: 0;
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
  padding: 10px;
  z-index: 1;
  opacity: 0;

  &:hover,
  &:focus,
  &:active {
    opacity: 1;
  }
`

const GridCellId = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 0.5rem;
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
  padding: 10px;
  color: white;
  gap: 5px;
  margin: 10px;
`

const NX = 7
const NY = 7

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

  if (!mapData) {
    return null
  }

  return (
    <Page>
      <GameHeader>MAP</GameHeader>
      <Body>
        <GameMenu pageName="starmap" />
        <Grid nx={mapData.data[0].length} ny={mapData.data.length}>
          {mapData.data.map((arr, i) => {
            const ri = mapData.data.length - i - 1
            return mapData.data[ri].map((el, j) => {
              return (
                <GridCell>
                  {/* {el.name && ( */}
                  <GridCellContent aria-haspopup="true">
                    <Link
                      to={{
                        pathname: '/location',
                        state: [{ x: ri + mapData.x0, y: j + mapData.y0 }],
                      }}
                    >
                      <Text bold glowing>
                        {el.name}
                      </Text>
                      <Text>{el.placeType === 'empty' ? 'move' : ''}</Text>

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

                      <GridCellId>
                        ({ri + mapData.x0} , {j + mapData.y0})
                      </GridCellId>
                    </Link>
                  </GridCellContent>
                  {/* )} */}
                  {el.placeType === 'planet' ? <GridCellImg src={planetLogo} alt="planet" /> : ''}
                  {el.placeType === 'star' ? <GridCellImg src={starLogo} alt="star" /> : ''}
                  {el.placeType === 'empty' ? <GridCellImg src={emptyLogo} alt="star" /> : ''}
                  {(ri + mapData.x0).toString() === fleetLocation.X.toString() &&
                  (j + mapData.y0).toString() === fleetLocation.Y.toString() ? (
                    <IndicatorImg src={youLogo} alt="current location" />
                  ) : (
                    ''
                  )}
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
            <CoordInput type="number" min="0" value={X} onChange={(e) => setX(parseFloat(e.target.value))} />
            ,
            <CoordInput type="number" min="0" value={Y} onChange={(e) => setY(parseFloat(e.target.value))} />)
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
      </Body>
    </Page>
  )
}

export default Map
