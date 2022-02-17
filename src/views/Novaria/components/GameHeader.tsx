import React from 'react'
import styled from 'styled-components'
import { Text, useWalletModal } from '@pancakeswap-libs/uikit'
import { getWeb3 } from 'utils/web3'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { usePriceNovaBusd } from 'state/hooks'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getNovaAddress } from '../../../utils/addressHelpers'
import { getBalanceNumber } from '../../../utils/formatBalance'
import smallLogo from '../assets/novariaSmallLogo.png'

const Hero = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  // height: 75px;
  width: 100%;
  // margin-right: 10px;
  // margin-left: 10px;
  margin-top: 0px;
  padding-top: 10px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
`

const InfoBlock = styled.div`
  margin-right: 15px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`

const Logo = styled.img`
  object-position: left;
  // margin-top: -70px;
  // margin-bottom: 60px;
  margin-top: 10px;
  // background-color: #000a17;
`

const ConnectButton = styled.button`
  cursor: pointer;
  border: 1px solid #5affff;
  color: #5affff;
  background: transparent;
  padding: 5px 10px;
  text-overflow: ellipsis;
  width: 125px;
`

const GameHeader = ({ location, playerMineral, exp }) => {
  const { account, connect, reset, status } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)
  const novaBalance = getBalanceNumber(useTokenBalance(getNovaAddress()))
  const novaPrice = Number(usePriceNovaBusd()).toFixed(3)
  const web3 = getWeb3()

  const connected = status === 'connected'
  // eslint-disable-next-line prefer-template
  const accountAddress = connected ? account.toString().slice(0, 5) + '...' + account.toString().slice(37, 40) : ''

  return (
    <Hero>
      <a href="/legend-of-novaria">
        <Logo src={smallLogo} alt="Novaria Logo" />
      </a>
      <InfoBlock>
        <ConnectButton onClick={onPresentConnectModal}>{connected ? accountAddress : 'Connect Wallet'}</ConnectButton>
        <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <img src="https://shibanova.io/logo.png" alt="nova logo" style={{ height: 30, margin: 5 }} />
          <Text glowing>{novaPrice}</Text>
        </div>
        <Text glowing>
          NOVA Balance: <span style={{ color: 'gold' }}>{novaBalance.toFixed(2)}</span>
        </Text>
        <Text glowing>
          MINERAL: <span style={{ color: 'gold' }}>{(playerMineral/10**18).toFixed(3)}</span>
        </Text>
        <Text glowing>
          EXP: <span style={{ color: 'gold' }}>{exp}</span>
        </Text>
        <Text glowing>
          Current Location: ({location.X}, {location.Y})
        </Text>
      </InfoBlock>
    </Hero>
  )
}
export default GameHeader
