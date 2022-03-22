import React, { useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useGetAllowance, useApprove, useInsertCoinHere, useGetPlayerExists, useGetCostMod } from 'hooks/useNovaria'
import { getFleetAddress, getMapAddress, getTreasuryAddress } from 'utils/addressHelpers'
import ReactGA from 'react-ga'
import ReactPixel from 'react-facebook-pixel'
import { useHistory } from 'react-router-dom'
import { usePriceNovaBusd } from 'state/hooks'

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
    
  &:disabled {
      color: gray;
      border-color: gray;
      cursor: not-allowed;
      box-shadow: none;
  }
`

const Body = styled.div`
  // background: #5c5c5c50;
  // border-top: 1px solid gray;
  // border-bottom: 1px solid gray;
  padding: 10px 0;
  font-size: 1.1rem;
`

const StartMenu = () => {
  ReactGA.initialize('UA-206876567-1',{gaOptions: {siteSpeedSampleRate: 100}})
  const { account } = useWallet()
  const accountAddress = account === null ? '' : account
  const [pending, setPendingTx] = useState(false)
  const [pendingApprove, setPendingApproveTx] = useState(false)
  const [name, setName] = useState('')

  const fleetContract = getFleetAddress()
  const treasuryContract = getTreasuryAddress()
  const allowanceFleet = useGetAllowance(fleetContract)
  const allowanceTreasury = useGetAllowance(treasuryContract)
  const isAllowed = allowanceTreasury > 0 && allowanceFleet > 0
  const playerExists = useGetPlayerExists(accountAddress)
  const startCost = 100 / useGetCostMod()
  const startCostBUSD = Number(usePriceNovaBusd()) * startCost

  const history = useHistory()

  const { onClick } = useApprove()
  const { onCoin } = useInsertCoinHere()

  const sendInsertCoinTx = async () => {
    ReactGA.event({
      category: 'Legend of Novaria',
      action: 'Purchase Game',
      label: 'button'
    })
    ReactPixel.trackSingle('964799387574791', 'Purchase', {value: 0.00, currency: 'USD'})
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
    setPendingApproveTx(true)
    try {
      await onClick(contract)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingApproveTx(false)
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
    ReactGA.event({
      category: 'Legend of Novaria',
      action: 'start game',
      label: 'button'
    })
    ReactPixel.trackSingle('964799387574791', 'Lead')
    history.push('/overview')
  }

  return (
    <Body>
      {!isAllowed && 'Step 1 - Approve game contracts'}<br />
      {allowanceFleet <= 0 ? <Button onClick={handleFleetApprove}>{!pendingApprove ? 'Approve Fleet Contract' : 'pending approval...'}</Button> : ''}
      {allowanceTreasury <= 0 ? <Button onClick={handleTreasuryApprove}>{!pendingApprove ? 'Approve Treasury Contract' : 'pending approval...'}</Button> : ''}

      {/*  Eventually this needs to have a confirm popup to make sure name set correctly  */}
      {!playerExists ?
        <div style={{marginTop:10}}>
          Step 2 - Set your player name <br />
          <input type="text" required maxLength={12} onChange={(e) => setName(e.target.value)} style={{marginTop:5}} />
          <Button onClick={sendInsertCoinTx} disabled={!isAllowed || pending} >{!pending ? 'Set Player Name' : 'pending...'}</Button>
          <br />(costs {startCost} NOVA ~${startCostBUSD.toFixed(2)}, includes 50 ships)
        </div> : ''}
      {playerExists ? <Button onClick={handleStartGameClick}>Start Game</Button> : ''}
    </Body>

  )
}

export default StartMenu
