import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Text, useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useGetAllowance, useApprove, useInsertCoinHere, useGetPlayerExists, useGetCostMod } from 'hooks/useNovaria'
import { getFleetAddress, getMapAddress, getTreasuryAddress } from 'utils/addressHelpers'
import ReactGA from 'react-ga'
import { useHistory } from 'react-router-dom'

const Button = styled.button`
  cursor: pointer;
  margin: 10px;
  align-self: center;
  padding: 0.5rem 1.25rem;
  font-family: sans-serif;
  font-size: 1.25rem;
  text-decoration: none;
  text-shadow: -2px 4px 4px #091243, 0 0 10px #00d0ff, inset 1px 1px 1px white;
  color: #1fffff;
  border: 2px solid;
  border-radius: 5px;
  background-color: transparent;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.6), 2px 1px 4px rgba(0, 0, 0, 0.3), 2px 4px 3px rgba(3, 0, 128, 0.3),
    0 0 7px 2px rgba(0, 208, 255, 0.6), inset 0 1px 2px rgba(0, 0, 0, 0.6), inset 2px 1px 4px rgba(0, 0, 0, 0.3),
    inset 2px 4px 3px rgba(3, 0, 128, 0.3), inset 0 0 7px 2px rgba(0, 208, 255, 0.6);

`

const BetaWarning = styled.p`
  color: gold;
  margin-bottom: 10px;
`

const StartMenu = () => {
  const { account } = useWallet()
  const accountAddress = account === null ? '' : account
  const [isOpen, setOpen] = useState(false)
  const [pending, setPendingTx] = useState(false)
  const [name, setName] = useState('')

  const fleetContract = getFleetAddress()
  const mapContract = getMapAddress()
  const treasuryContract = getTreasuryAddress()
  console.log('fleet:', fleetContract, 'map:', mapContract, 'treasury:', treasuryContract)
  const connected = account !== null
  const allowanceFleet = useGetAllowance(fleetContract)
  const allowanceMap = useGetAllowance(mapContract)
  const allowanceTreasury = useGetAllowance(treasuryContract)
  const isAllowed = allowanceTreasury > 0 && allowanceFleet > 0
  const playerExists = useGetPlayerExists(accountAddress)
  const startCost = 100 / useGetCostMod()

  const history = useHistory()

  const { onClick } = useApprove()
  const { onCoin } = useInsertCoinHere()

  const sendInsertCoinTx = async () => {
    ReactGA.ga('event', 'conversion', { send_to: 'AW-978000460/r_S1CJHU06IDEMy0rNID' })
    setPendingTx(true)
    try {
      await onCoin(name)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  const sendApproveTx = async (contract) => {
    setPendingTx(true)
    try {
      await onClick(contract)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  const handleFleetApprove = () => {
    if (allowanceFleet <= 0) {
      sendApproveTx(fleetContract)
    }
  }
  const handleTreasuryApprove = () => {
    if (allowanceTreasury <= 0) {
      sendApproveTx(treasuryContract)
    }
  }

  const handleStartGameClick = () => {
    ReactGA.ga('event', 'conversion', { send_to: 'AW-978000460/DassCIH906IDEMy0rNID' })
    history.push('/overview')
  }

  return (
    <div>
      <BetaWarning>
        ***NOTICE - THIS GAME IS CURRENTLY IN BETA. Players can still earn NOVA and profit, but there is no guarantee. The game will be fully reset around March 14 (no refund provided).***
      </BetaWarning>
      {!isAllowed && 'Step 1 - approve Fleet and Treasury contracts for the game'}<br />
      {allowanceFleet <= 0 ? <Button onClick={handleFleetApprove}>{!pending ? 'Approve Fleet Contract' : 'pending...'}</Button> : ''}
      {allowanceTreasury <= 0 ? <Button onClick={handleTreasuryApprove}>{!pending ? 'Approve Treasury Contract' : 'pending...'}</Button> : ''}

      {/*  Eventually this needs to have a confirm popup to make sure name set correctly  */}
      {isAllowed && !playerExists ?
        <div>
          Step 2 - Set your player name <br />
          <input type="text" required maxLength={12} onChange={(e) => setName(e.target.value)} />
          <Button onClick={sendInsertCoinTx}>{!pending ? 'Set Player Name' : 'pending...'}</Button>
          <br />(costs {startCost} nova)
        </div> : ''}
      {playerExists ? <Button onClick={handleStartGameClick}>Start Game</Button> : ''}
    </div>

  )
}

export default StartMenu
