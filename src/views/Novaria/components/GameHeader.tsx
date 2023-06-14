import React from 'react'
import styled from 'styled-components'
import { Text, useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { usePriceNovaBusd } from 'state/hooks'
import { useGetPlayerBattleStatus, useGetPlayerExists } from 'hooks/useNovaria'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getNovaAddress } from '../../../utils/addressHelpers'
import { getBalanceNumber } from '../../../utils/formatBalance'
import smallLogo from '../assets/novariaSmallLogo.png'
import tokenLogo from '../assets/NOVA32.png'

export interface HeaderProps {
  battleStatus: boolean
}

const Hero = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 0px;
  padding-top: 10px;
  background: ${(props: HeaderProps) =>
    props.battleStatus === false
      ? 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)'
      : 'linear-gradient(180deg, rgba(255,0,0,1) 16%, rgba(255,0,0,0) 100%)'};
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
  margin-top: 10px;
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

const Button = styled.button`
  cursor: pointer;
  border: 2px solid #000000;
  color: #a075de;
  background: transparent;
  padding: 5px 10px;
  text-overflow: ellipsis;
  &:hover {
    background: ##a075de;
    color: black;
  }
`

const GameHeader = ({ location, playerMineral, playerMineralCapacity, exp, playerName }) => {
  const { account, connect, reset, status } = useWallet()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(connect, reset, account)
  const novaBalance = getBalanceNumber(useTokenBalance(getNovaAddress()))
  const novaPrice = Number(usePriceNovaBusd()).toFixed(3)
  const playerExists = useGetPlayerExists(account)

  const inBattle = useGetPlayerBattleStatus(account)
  const connected = status === 'connected'
  // eslint-disable-next-line prefer-template
  const accountAddress = connected ? account.toString().slice(0, 5) + '...' + account.toString().slice(38, 42) : ''

  return (
    <Hero battleStatus={inBattle}>
      <a href="/mission-novawars">
        <Logo src={smallLogo} alt="Novaria Logo" />
      </a>
      <InfoBlock>
        <Text glowing>
          {playerExists ? (
            <span style={{ color: 'gold' }}>{playerName}</span>
          ) : (
            <Button>
              <a href="/mission-novawars">Register Here</a>
            </Button>
          )}
        </Text>
        <Text glowing>
          {playerExists && (
            <span>
              EXP: <span style={{ color: 'gold' }}>{exp}</span>
            </span>
          )}
        </Text>
        <Text glowing>
          <a
            href="https://dex.novaspace.io/#/swap?outputCurrency=0xe91a8d2c584ca93c7405f15c22cdfe53c29896e3"
            target="_blank"
            rel="noreferrer noopener"
          >
            NOVA: <span style={{ color: 'gold' }}>{novaBalance.toFixed(2)} </span> (+)
          </a>
        </Text>
        <Text glowing>
          MINERAL:{' '}
          <span style={{ color: 'gold' }}>
            {(playerMineral / 10 ** 18).toFixed(2)} (
            {playerMineralCapacity > 0 ? ((playerMineral / playerMineralCapacity) * 100).toFixed(1) : '0.0'}%)
          </span>
        </Text>
        <Text glowing>
          LOCATION: ({location.X}, {location.Y})
        </Text>
        <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <a
            href="https://poocoin.app/tokens/0xe91a8d2c584ca93c7405f15c22cdfe53c29896e3"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={tokenLogo} alt="nova logo" style={{ height: 30, margin: 5 }} />
          </a>
          <a
            href="https://coinbrain.com/coins/0xe91a8d2c584ca93c7405f15c22cdfe53c29896e3"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Text glowing>{novaPrice}</Text>
          </a>
        </div>
        {!connected && <ConnectButton onClick={onPresentConnectModal}>Connect Wallet</ConnectButton>}
        {connected && <ConnectButton onClick={onPresentAccountModal}>{accountAddress}</ConnectButton>}
      </InfoBlock>
    </Hero>
  )
}
export default GameHeader
