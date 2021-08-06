import React from 'react'
import { Card, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import CardValue from './CardValue'

const StyledStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  background: transparent;
  box-shadow: none;

  ${({ theme }) => theme.mediaQueries.xs} {
    padding: 10px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px;
  }
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 15px;
  }
`

interface Stat {
  label: string
  value: string | number
}

const Stats = ({ stats }: { stats: Stat[] }) => (
  <StyledStats>
    {stats.map(({ label, value }) => (
      <Row>
        <Text fontSize="inherit">{label}</Text>
        {typeof value === 'string' ? (
          <Text glowing bold fontSize="inherit">
            {value}
          </Text>
        ) : (
          <CardValue value={value} decimals={2} />
        )}
      </Row>
    ))}
  </StyledStats>
)

export default Stats
