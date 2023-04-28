import React, { useContext } from 'react'
import styled from 'styled-components'
import { useModal } from '@pancakeswap-libs/uikit'
import ChatModal from './ChatModal'

const Button = styled.button`
  cursor: pointer;
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 25px;
  border: 1px solid #5affff;
  background: black;
  color: #5affff;
`

const ChatButton = ({ playerExists, playerName }) => {
  const [handleChatOpen] = useModal(<ChatModal playerExists={playerExists} playerName={playerName} />)
  return <Button onClick={handleChatOpen}>CHAT</Button>
}
export default ChatButton
