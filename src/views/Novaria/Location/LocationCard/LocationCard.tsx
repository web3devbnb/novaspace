import React, { useState } from 'react'
import styled from 'styled-components'
import {
  useTravel,
  useRefine,
  useCollect,
  useExplore,
  useGetTravelCooldown,
  useGetFleetTravelCost,
  useMine,
  useGetTimeModifier,
  useGetExploreCost,
  useShipyardTakeover,
  useGetShipyards,
} from 'hooks/useNovaria'
import { useWallet } from '@binance-chain/bsc-use-wallet'

const Body = styled.div`
  position: relative;
  margin: 15px;
  width: 300px;
  height: 450px;
`

const HavenImageCard = styled.div`
  background-image: url('/images/novaria/haven.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const ShipyardImageCard = styled.div`
  background-image: url('/images/novaria/shipyardCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const RefineryImageCard = styled.div`
  background-image: url('/images/novaria/refineryCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const ShipyardRefineryImageCard = styled.div`
  background-image: url('/images/novaria/shipyardRefineryCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const MiningImageCard = styled.div`
  background-image: url('/images/novaria/miningCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const EmptyImageCard = styled.div`
  background-image: url('/images/novaria/empty.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const HostileImageCard = styled.div`
  background-image: url('/images/novaria/hostileCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const AsteroidImageCard = styled.div`
  background-image: url('/images/novaria/asteroidCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const StarImageCard = styled.div`
  background-image: url('/images/novaria/starCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const UnexploredImageCard = styled.div`
  background-image: url('/images/novaria/unexplored.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const PlaceHeader = styled.div`
  position: absolute;
  top: 230px;
  left: 14px;
  width: 255px;
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: column;
`

const Name = styled.div`
  font-weight: bold;
  font-size: 18px;
`

const Location = styled.div`
  font-weight: bold;
  text-align: right;
`

const PlaceBody = styled.div`
  position: absolute;
  top: 330px;
  left: 10px;
  width: 260px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`

const Button = styled.button`
  cursor: pointer;
  border: 1px solid #5affff;
  background: transparent;
  color: #5affff;
  width: 110px;
  margin: 5px;
  &:hover {
    background-color: #5affff;
    color: black;
  }
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`

const LocationCard = ({
  placename,
  placetype,
  mineral,
  salvage,
  shipyard,
  refinery,
  placeX,
  placeY,
  fleetLocation,
  isMining,
  canTravel,
}) => {
  const [, setPendingTx] = useState(false)

  const { account } = useWallet()
  const isCurrentLocation = fleetLocation.X === placeX.toString() && fleetLocation.Y === placeY.toString()
  const travelCost = useGetFleetTravelCost(account, placeX, placeY) / 10 ** 18
  const timeMod = useGetTimeModifier()
  const travelCooldown = useGetTravelCooldown(account, placeX, placeY) / 60 / timeMod
  const exploreCost = useGetExploreCost(placeX, placeY)
  const canExplore = (placetype === '0' && !canTravel)
  const isEmpty = (placetype === '0' && canTravel)
  // const shipyards = useGetShipyards()
  
  
  const { onTakeover } = useShipyardTakeover()
  const { onExplore } = useExplore()
  const { onMine } = useMine()
  const { onRefine } = useRefine()
  const { onCollect } = useCollect()
  const { onTravel } = useTravel()
  const sendTravelTx = async () => {
    setPendingTx(true)
    try {
      await onTravel(placeX, placeY)
      console.log('Traveling To:', placeX, placeY)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }
  const sendCollectTx = async () => {
    setPendingTx(true)
    try {
      await onCollect(placeX, placeY)
      console.log('Collecting Salvage')
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }
  const sendRefineTx = async () => {
    setPendingTx(true)
    try {
      await onRefine()
      console.log('Refining')
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }
  const sendMineTx = async () => {
    setPendingTx(true)
    try {
      await onMine()
      console.log('Mining Mineral')
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }
  const sendExploreTx = async () => {
    setPendingTx(true)
    try {
      await onExplore(placeX, placeY)
      console.log('Exploring')
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }
  const sendTakeoverTx = async () => {
    setPendingTx(true)
    try {
      await onTakeover(placeX, placeY)
      console.log('attempting shipyard takeover')
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  return (
    <Body>
      {placename === 'Haven' ? <HavenImageCard /> : ''}
      {isEmpty ? <EmptyImageCard /> : ''}
      {shipyard && !refinery && placename !== 'Haven' ? <ShipyardImageCard /> : ''}
      {refinery && !shipyard && placename !== 'Haven' ? <RefineryImageCard /> : ''}
      {refinery && shipyard && placename !== 'Haven' ? <ShipyardRefineryImageCard /> : ''}
      {placetype === '4' ? <AsteroidImageCard /> : ''}
      {placetype === '2' ? <StarImageCard /> : ''}
      {placetype === '1' ? <HostileImageCard /> : ''}
      {canExplore ? <UnexploredImageCard /> : ''}
      {isMining === true ? <MiningImageCard /> : ''}
      <PlaceHeader>
        <Row>
          <Name>
            {placename}
            {isEmpty ? 'EMPTY SPACE' : ''}
            {placetype === '1' ? 'HOSTILE SPACE' : ''}
          </Name>
          <Location>
            ({placeX},{placeY})
          </Location>
        </Row>
        <Row style={{ fontSize: 12, marginTop: 3 }}>
          <span>{shipyard === true ? 'SHIPYARD' : ''}</span>
          <span>{refinery === true ? 'REFINERY' : ''}</span>
          <span>
            {salvage > 0 ? (salvage / 10 ** 18).toFixed(3) : ''} {salvage > 0 ? 'SALVAGE' : ''}
          </span>
          <span>
            {mineral > 0 ? (mineral / 10 ** 18).toFixed(3) : ''} {mineral > 0 ? 'MINERAL' : ''}
          </span>
          <span>{canExplore ? 'UNEXPLORED' : ''}</span>
          <span>{placetype === '2' ? 'STAR' : ''}</span>
        </Row>
      </PlaceHeader>
      <PlaceBody>
        {mineral > 0 ? (
          <Button type="button" onClick={sendMineTx}>
            MINE
          </Button>
        ) : (
          ''
        )}
        {salvage > 0 ? (
          <Button type="button" onClick={sendCollectTx}>
            COLLECT
          </Button>
        ) : (
          ''
        )}
        {refinery ? (
          <Button type="button" onClick={sendRefineTx}>
            REFINE
          </Button>
        ) : (
          ''
        )}
        {placetype !== '2' && placetype !== '1' && !isCurrentLocation ? (
          <Button type="button" onClick={sendTravelTx}>
            TRAVEL
          </Button>
        ) : (
          ''
        )}
        {canExplore ? (
          <Button type="button" onClick={sendExploreTx}>
            EXPLORE
          </Button>
        ) : (
          ''
        )}
        {placetype === 'shipyard' && placetype !== 'refinery' && 
          <Button type='button' onClick={sendTakeoverTx} >Takeover Shipyard</Button> }
        <Row style={{ marginTop: 5, color: '#289794', fontSize: 11 }}>
          <span>Travel Cost (NOVA): {!isCurrentLocation ? travelCost : ''}</span>
          <span>Travel Cooldown: {!isCurrentLocation ? <span>{travelCooldown} minutes</span> : ''}</span>
          {placetype === '' && <span>Exlpore Cost (NOVA): {(exploreCost/10**18).toFixed(2)}</span>}
        </Row>
      </PlaceBody>
    </Body>
  )
}
export default LocationCard
