import React from 'react'
import styled from 'styled-components'

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

const EmptyShipyardStats = () => {
  const stats = [
    { label: 'LOCATION', value: '-' },
    { label: 'OWNER', value: '-' },
    { label: 'BUILD FEE', value: '-' },
  ]

  return (
    <StatsContainer>
      {stats.map((stat) => (
        <StatsRow key={stat.label}>
          <StatsText>{stat.label}</StatsText>
          <StatsText>{stat.value}</StatsText>
        </StatsRow>
      ))}
    </StatsContainer>
  )
}

export default EmptyShipyardStats
