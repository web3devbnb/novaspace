import { useGetNameByAddress, useGetPlaceInfo } from 'hooks/useNovaria'
import React from 'react'
import styled from 'styled-components'
import { IShipyard } from 'views/Novaria/types'

const StatsContainer = styled.div`
  margin-top: 10px;
`

const StatsRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const StatsText = styled.div`
  font-weight: light;
  font-size: 15px;
  font-size: 0.65rem;
  color: #289794;
`

interface ShipyardStatsProps {
  shipyard: IShipyard
}

const ShipyardStats: React.FC<ShipyardStatsProps> = ({ shipyard }) => {
  const placeInfo = useGetPlaceInfo(shipyard.coordX, shipyard.coordY)
  const ownerName = useGetNameByAddress(shipyard.owner)

  const stats = [
    { label: 'LOCATION', value: `${placeInfo.name} (${shipyard.coordX}, ${shipyard.coordY})` },
    { label: 'OWNER', value: ownerName },
    { label: 'BUILD FEE', value: `${shipyard.feePercent}%` },
  ]

  return (
    <StatsContainer>
      {stats.map((stat) => (
        <StatsRow>
          <StatsText>{stat.label}</StatsText>
          <StatsText>{stat.value}</StatsText>
        </StatsRow>
      ))}
    </StatsContainer>
  )
}

export default ShipyardStats
