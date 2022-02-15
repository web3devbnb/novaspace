import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Page from 'components/layout/Page'
import { Flex } from '@pancakeswap-libs/uikit'
import ModalVideo from 'react-modal-video'
import { useGetAllowance, useApprove, useInsertCoinHere, useGetPlayerExists } from 'hooks/useNovaria'
import { getFleetAddress, getMapAddress, getTreasuryAddress } from 'utils/addressHelpers'
import logo from './assets/novariaLogoMain.png'
import 'react-modal-video/scss/modal-video.scss'

const Page1 = styled(Page)`
  // background-image:url('/images/home/mainBackground-dark.jpg');
  // background-size:cover ;
  // background-position: center;
`

const Body = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Poppins', sans-serif;
`
const breatheAnimation = keyframes`
  // 0% { width: 99%; }
  // 50% {width: 49%; }
  // 100% {width: 0%; }
  // 0% { padding-top: 100px }
  // 50% {padding-top: 50px }
  // 100% {padding-top: 30px }
  0% { opacity: 0.7}
  40% { opacity: 1  }
  70% { opacity: 1  }
  100% { opacity: 0.7 }

`

const Logo = styled.img`
  max-width: 800px;
  padding-top: 80px;
  padding-left: 0px;
  width: 99%;
  animation-name: ${breatheAnimation};
  animation-duration: 5s;
  animation-iteration-count: infinite;
`

const Column = styled.div`
  flex-direction: column;
  flex-wrap: wrap;
  width: 99%;
  max-width: 700px;
`

const SubHeading = styled.div`
  padding-top: 50px;
  padding-right: 40px;
  padding-left: 20px;
  padding-bottom: 80px;
  color: white;
  max-width: 800px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 20px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 26px;
  }
`

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

const Novaria: React.FC = () => {
  const { account } = useWallet()
  const [isOpen, setOpen] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const [name, setName] = useState('')

  const fleetContract = getFleetAddress()
  const mapContract = getMapAddress()
  const treasuryContract = getTreasuryAddress()
  console.log('fleet:', fleetContract, 'map:', mapContract, 'treasury:', treasuryContract)
  const connected = account !== null
  const allowanceFleet = useGetAllowance(fleetContract)
  const allowanceMap = useGetAllowance(mapContract)
  const allowanceTreasury = useGetAllowance(treasuryContract)
  const isAllowed = connected && allowanceTreasury > 0 && allowanceFleet > 0 && allowanceMap > 0
  const playerExists = useGetPlayerExists(account)
  const { onClick } = useApprove()
  const { onCoin } = useInsertCoinHere()

  const sendInsertCoinTx = async () => {
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
  const handleMapApprove = () => {
    if (allowanceMap <= 0) {
      sendApproveTx(mapContract)
    }
  }
  const handleTreasuryApprove = () => {
    if (allowanceTreasury <= 0) {
      sendApproveTx(treasuryContract)
    }
  }

  return (
    <Page1>
      <Body>
        <Column>
          <Logo src={logo} alt="novaria logo" />
            <ModalVideo
            channel="youtube"
            isOpen={isOpen}
            videoId="VRH2LvKXKEQ"
            onClose={() => setOpen(false)}
          />
          <SubHeading>

          {allowanceFleet <= 0 ? <Button onClick={handleFleetApprove}>Approve Fleet Contract</Button> : ''}
          {allowanceTreasury <= 0 ? <Button onClick={handleTreasuryApprove}>Approve Treasury Contract</Button> : ''}
          {allowanceMap <= 0 ? <Button onClick={handleMapApprove}>Approve Map Contract</Button> : ''}

          {/* Eventually this needs to have a confirm popup to make sure name set correctly */}
          {isAllowed && !playerExists ? <div><input type="text" required maxLength={16} onChange={(e) => setName(e.target.value)} />
                      <Button onClick={sendInsertCoinTx}>Set Player Name</Button></div> : ''}
          {playerExists ? <a href='/overview'><Button>Start Game</Button></a> : ''}


          <br /><br />A 4x space strategy game built on the Binance Smart Chain.<br />

          <Button type="button" onClick={()=> {setOpen(true)}} >Trailer</Button>
          <a href='https://discord.gg/vQdxbGx9pV' rel='noopener noreferrer' target='blank'><Button type="button" >Official Discord</Button></a>
        
          </SubHeading></Column>
      </Body>
    </Page1>
  )
}

export default Novaria
