import { useModal } from '@pancakeswap-libs/uikit'
import { useGetAttackPower, useGetFleetSize, useGetNameByAddress, useGetFleetMineral } from 'hooks/useNovaria'
import { getWeb3 } from 'utils/web3'
import React from 'react'
import styled from 'styled-components'
import PlayerModal from '../PlayerModal'

const Row = styled.div<{status: number}>`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  border: 1px solid #289794;
  padding: 3px;
  margin: 4px 0;
  // color:${props => props.status !== 0 ? 'gold' : '#5affff'};
  &:hover {
    background-color: #289794;
  }
`
const Cell = styled.div`
  // flex: 1;
  // width: 33%;
  // overflow-x: hidden;
  text-overflow: ellipsis;
  text-align: right;
`

const PlayersTableRow = ({ player, status, currentLocation }) => {
  const web3 = getWeb3()
  const fleetSize = useGetFleetSize(player)
  const fleetPower = useGetAttackPower(player)
  const name = useGetNameByAddress(player)
  const mineral = Number(useGetFleetMineral(player))
  const [handleClick] = useModal(<PlayerModal player={player} status={status} currentLocation={currentLocation} />)

  return (
    <Row status={player.battleStatus} onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex={0} >
      <Cell style={{textAlign:'left'}}>{name}</Cell>
      <Cell>{fleetSize}</Cell>
      <Cell>{fleetPower}</Cell>
      <Cell>{(mineral/10**18).toFixed(2)}</Cell>
    </Row>
  )
}

export default PlayersTableRow
